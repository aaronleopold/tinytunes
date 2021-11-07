use std::path::PathBuf;

use anyhow::Result;
use sea_orm::{ConnectionTrait, Database, DatabaseBackend, DatabaseConnection, Statement};
use std::io::Read;

fn create_mm_folder() -> Result<PathBuf> {
  let home_dir = dirs::home_dir().ok_or(anyhow::anyhow!("Could not find home directory"))?;
  let db_dir = home_dir.join(".mm");
  std::fs::create_dir_all(&db_dir)?;
  Ok(db_dir)
}

fn create_db_file() -> Result<String> {
  let mm_folder = create_mm_folder()?;

  let db_file = format!(
    "sqlite:{}?mode=rwc",
    mm_folder.join("mm.db").to_str().unwrap()
  );

  Ok(db_file)
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

  connection
    .execute(Statement::from_string(
      DatabaseBackend::Sqlite,
      migration_up,
    ))
    .await?;

  Ok(connection)
}
