use crate::db::{self, entities::preferences, entities::yt_item};
use anyhow::Result;
use once_cell::sync::OnceCell;
use sea_orm::{DatabaseConnection, EntityTrait, Order, QueryOrder};
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

#[tauri::command(async)]
pub async fn test_connection() -> Result<(), String> {
  match db_instance().await {
    Ok(_) => Ok(()),
    Err(e) => Err(e.to_string()),
  }
}

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

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct HydrateReturn {
  items: Vec<yt_item::Model>,
  preferences: preferences::Model,
}

#[tauri::command(async)]
pub async fn hydrate() -> Result<HydrateReturn, String> {
  let db = db_instance().await.map_err(|e| e.to_string())?;

  let items = yt_item::Entity::find()
    .order_by(yt_item::Column::IsStream, Order::Asc)
    .all(db)
    .await
    .map_err(|e| e.to_string())?;

  let preferences = preferences::Entity::find()
    .one(db)
    .await
    .map_err(|e| e.to_string())?
    // this else should never happen, however JUST in case...
    .unwrap_or_else(|| preferences::Model {
      id: 0,
      height: 500,
      width: 400,
    });

  Ok(HydrateReturn { items, preferences })
}
