use sea_orm::EntityTrait;

use crate::db::{connection::db_instance, entities::preferences};

use super::file::get_local_music;

#[tauri::command(async)]
pub async fn get_local_media() -> Result<i32, String> {
  let db = db_instance().await.map_err(|e| e.to_string())?;

  let preferences = preferences::Entity::find()
    .one(db)
    .await
    .map_err(|e| e.to_string())?
    .unwrap();

  let dir = preferences.download_directory;

  if let Some(dir) = dir {
    let local_music = get_local_music(dir);
  } else {
    return Err("Could not find default download directory".to_owned());
  }

  Ok(0)
}
