use crate::db::{self, entities::preferences, entities::yt_item};
use anyhow::Result;
use once_cell::sync::OnceCell;
use sea_orm::{
  sea_query::Expr, ColumnTrait, DatabaseConnection, EntityTrait, Order, QueryFilter, QueryOrder,
  Set,
};
use tauri::LogicalSize;

pub static DB_INSTANCE: OnceCell<DatabaseConnection> = OnceCell::new();

async fn db_instance() -> Result<&'static DatabaseConnection> {
  if DB_INSTANCE.get().is_none() {
    let db = db::connection::get_connection().await?;
    DB_INSTANCE.set(db).unwrap_or_default();
    Ok(DB_INSTANCE.get().unwrap())
  } else {
    Ok(DB_INSTANCE.get().unwrap())
  }
}

// #[tauri::command(async)]
// pub async fn test_connection() -> Result<(), String> {
//   match db_instance().await {
//     Ok(_) => Ok(()),
//     Err(e) => Err(e.to_string()),
//   }
// }

#[tauri::command]
pub fn resize_window(window: tauri::Window, width: f64, height: f64) {
  let new_size = LogicalSize { width, height };

  window.set_size(tauri::Size::Logical(new_size)).unwrap();
}

#[tauri::command(async)]
pub async fn get_yt_items() -> Result<Vec<yt_item::Model>, String> {
  let db = db_instance().await.map_err(|e| e.to_string())?;

  let items = yt_item::Entity::find()
    .order_by(yt_item::Column::IsStream, Order::Asc)
    .all(db)
    .await
    .map_err(|e| e.to_string())?;

  Ok(items)
}

// TODO: once seaorm allows me to get a model from an insert, not an active model,
// return that instead of the id.
#[tauri::command(async)]
pub async fn insert_yt_item(name: String, yt_id: String, is_stream: bool) -> Result<i32, String> {
  let db = db_instance().await.map_err(|e| e.to_string())?;

  let item = yt_item::ActiveModel {
    name: Set(name),
    yt_id: Set(yt_id),
    is_stream: Set(is_stream),
    ..Default::default()
  };

  let insert_result = yt_item::Entity::insert(item)
    .exec(db)
    .await
    .map_err(|e| e.to_string())?;

  Ok(insert_result.last_insert_id)
}

#[tauri::command(async)]
pub async fn delete_yt_item(id: i32) -> Result<(), String> {
  let db = db_instance().await.map_err(|e| e.to_string())?;

  yt_item::Entity::delete_many()
    .filter(yt_item::Column::Id.eq(id))
    .exec(db)
    .await
    .map_err(|e| e.to_string())?;

  Ok(())
}

#[tauri::command(async)]
pub async fn set_dark_theme(dark_theme: bool) -> Result<(), String> {
  let db = db_instance().await.map_err(|e| e.to_string())?;

  preferences::Entity::update_many()
    .col_expr(preferences::Column::DarkTheme, Expr::value(dark_theme))
    .exec(db)
    .await
    .map_err(|e| e.to_string())?;

  Ok(())
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct HydrateReturn {
  items: Vec<yt_item::Model>,
  userPreferences: preferences::Model,
}

#[tauri::command(async)]
pub async fn hydrate() -> Result<HydrateReturn, String> {
  let db = db_instance().await.map_err(|e| e.to_string())?;

  let items = yt_item::Entity::find()
    .order_by(yt_item::Column::IsStream, Order::Asc)
    .all(db)
    .await
    .map_err(|e| e.to_string())?;

  let userPreferences = preferences::Entity::find()
    .one(db)
    .await
    .map_err(|e| e.to_string())?
    // this else should never happen, however JUST in case...
    .unwrap_or_else(|| preferences::Model {
      id: 0,
      height: 500,
      width: 400,
      dark_theme: true,
      download_directory: None,
    });

  Ok(HydrateReturn {
    items,
    userPreferences,
  })
}

#[tauri::command]
pub fn get_user_audiodir() -> Result<String, String> {
  match dirs::audio_dir() {
    Some(audio_dir) => Ok(audio_dir.to_str().unwrap().to_string()),
    None => Err("Could not find audio directory".to_owned()),
  }
}
