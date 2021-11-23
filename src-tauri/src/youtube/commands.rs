use crate::{
  db::{
    connection::db_instance,
    entities::{preferences, yt_item},
  },
  youtube::ytdl,
};
use anyhow::Result;
use sea_orm::{sea_query::Expr, ColumnTrait, EntityTrait, Order, QueryFilter, QueryOrder, Set};

use tauri::{api::process::CommandEvent, LogicalSize, Manager};

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
pub async fn update_yt_item(
  id: i32,
  name: String,
  yt_id: String,
  is_stream: bool,
) -> Result<(), String> {
  let db = db_instance().await.map_err(|e| e.to_string())?;

  yt_item::Entity::update_many()
    .filter(yt_item::Column::Id.eq(id))
    .col_expr(yt_item::Column::Name, Expr::value(name))
    .col_expr(yt_item::Column::YtId, Expr::value(yt_id))
    .col_expr(yt_item::Column::IsStream, Expr::value(is_stream))
    .exec(db)
    .await
    .map_err(|e| e.to_string())?;

  Ok(())
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

#[tauri::command(async)]
pub async fn set_download_directory(dir: String) -> Result<(), String> {
  let db = db_instance().await.map_err(|e| e.to_string())?;

  preferences::Entity::update_many()
    .col_expr(preferences::Column::DownloadDirectory, Expr::value(dir))
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

#[tauri::command(async)]
pub fn download_yt_item(
  app_handle: tauri::AppHandle,
  out_dir: String,
  name: Option<String>,
  id: String,
  is_playlist: bool,
) -> Result<String, String> {
  let ytdl = ytdl::YoutubeDl::new(out_dir, name, id, is_playlist);

  ytdl.check_installations().map_err(|e| e.to_string())?;

  let command = ytdl.get_command();

  let window = app_handle.get_window("main").unwrap();

  tauri::async_runtime::spawn(async move {
    let (mut rx, mut _child) = command.spawn().expect("Failed to spawn command");

    while let Some(event) = rx.recv().await {
      if let CommandEvent::Stdout(line) = event {
        // FIXME: can I merge the two if statements?
        println!("{}", line);
        if ytdl.should_emit_output(&line) {
          window
            .emit_all("ytdl_output", &line)
            .expect("failed to emit event");
        }
      } else if let CommandEvent::Terminated(status) = event {
        println!("Command terminated with status: {:?}", status);
        window
          .emit_all("ytdl_done", &status)
          .expect("failed to emit event");
      }
    }
  });

  Ok("Ok".to_owned())
}
