use std::path::PathBuf;

use anyhow::Result;
use sea_orm::{
  sea_query::Expr, ColumnTrait, ConnectionTrait, Database, DatabaseBackend, DatabaseConnection,
  EntityTrait, QueryFilter, Statement,
};
use std::io::Read;

use super::entities::preferences;

fn create_app_folder() -> Result<PathBuf> {
  let home_dir = dirs::home_dir().ok_or(anyhow::anyhow!("Could not find home directory"))?;
  let db_dir = home_dir.join(".tinytunes");
  std::fs::create_dir_all(&db_dir)?;
  Ok(db_dir)
}

fn create_db_file() -> Result<String> {
  let app_folder = create_app_folder()?;

  let db_file = format!(
    "sqlite:{}?mode=rwc",
    app_folder.join("tinytunes.db").to_str().unwrap()
  );

  Ok(db_file)
}

async fn set_default_download_dir(db: &DatabaseConnection) -> Result<(), String> {
  let default_download_dir = dirs::audio_dir();

  if default_download_dir.is_some() {
    preferences::Entity::update_many()
      .col_expr(
        preferences::Column::DownloadDirectory,
        Expr::value(default_download_dir.unwrap().to_str().unwrap().to_owned()),
      )
      .filter(preferences::Column::Id.eq(0))
      .exec(db)
      .await
      .map_err(|e| e.to_string())?;
  } else {
    Err("Could not find default download directory".to_string()).map_err(|e| e.to_string())?;
  }

  Ok(())
}

pub fn read_migration_up(migrations_folder: PathBuf) -> Result<String> {
  let migration_file = migrations_folder
    .join("migration-up.sql")
    .to_string_lossy()
    .to_string();

  let mut file = std::fs::File::open(migration_file)?;
  let mut contents = String::new();
  file.read_to_string(&mut contents)?;
  Ok(contents)
}

pub async fn get_connection() -> Result<DatabaseConnection> {
  let db_file = create_db_file()?;

  Ok(Database::connect(db_file).await?)
}

pub async fn create_db(migrations_folder: PathBuf) -> Result<DatabaseConnection> {
  let db_file = create_db_file()?;

  let connection = Database::connect(db_file).await?;

  let migration_up = read_migration_up(migrations_folder)?;

  let result = connection
    .execute(Statement::from_string(
      DatabaseBackend::Sqlite,
      migration_up,
    ))
    .await?;

  if result.rows_affected() != 0 {
    // TODO: error handling here
    set_default_download_dir(&connection).await;
  }

  Ok(connection)
}
