use std::path::PathBuf;

use crate::local_media::file;

#[tauri::command(async)]
pub async fn get_local_media(base_dir: String) -> Result<Vec<file::Entry>, String> {
  let path = PathBuf::from(&base_dir);
  let entries = file::read_dir(&path).map_err(|e| e.to_string())?;

  Ok(entries)
}
