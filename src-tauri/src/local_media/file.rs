use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::{fs::DirEntry, path::PathBuf};

pub trait Extension {
  fn get_extension(&self) -> String;
  fn is_audio(&self) -> bool;
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Entry {
  pub path: String,
  pub name: String,
  pub is_dir: bool,
}

impl Extension for DirEntry {
  fn get_extension(&self) -> String {
    self
      .path()
      .extension()
      .unwrap_or_default()
      .to_str()
      .unwrap_or_default()
      .to_string()
  }

  fn is_audio(&self) -> bool {
    self.get_extension().starts_with("mp3")
  }
}

// TODO: supported extensions
fn should_ignore(entry: &DirEntry, is_dir: bool) -> bool {
  let os_str = entry.file_name();
  let name = os_str.to_string_lossy();

  if name.starts_with(".") || name.starts_with("_") {
    return true;
  }

  if name == "Music" {
    return true;
  }

  if !entry.is_audio() && !is_dir {
    return true;
  }

  println!("{}", name);

  false
}

// this function is used to get the list of files and folders in a directory.
pub fn read_dir(path: &PathBuf) -> Result<Vec<Entry>> {
  let mut entries: Vec<Entry> = Vec::new();

  for entry in std::fs::read_dir(path)? {
    if let Ok(dir_entry) = entry {
      let metadata = dir_entry.metadata()?;

      if should_ignore(&dir_entry, metadata.is_dir()) {
        continue;
      }

      entries.push(Entry {
        path: dir_entry.path().to_string_lossy().to_string(),
        name: dir_entry.file_name().to_string_lossy().to_string(),
        is_dir: metadata.is_dir(),
      })
    }
  }

  Ok(entries)
}

// this is just for testing, I want to see all the files in all subdirectories.
// Now that I got this working, I will prolly load directories to the UI, and then re-call
// a read_dir when a user clicks on a directory.
fn read_dir_recursive(path: &PathBuf) -> Result<Vec<DirEntry>> {
  let mut entries = Vec::new();

  for entry in std::fs::read_dir(path)? {
    if let Ok(entry) = entry {
      let metadata = entry.metadata()?;

      if should_ignore(&entry, metadata.is_dir()) {
        continue;
      } else if metadata.is_dir() {
        entries.append(&mut read_dir_recursive(&entry.path())?);
      } else {
        entries.push(entry);
      }
    }
  }

  Ok(entries)
}

// this function will read all of the music files in the directory `media_dir`
pub fn get_local_music(media_dir: String) {
  let start_path = PathBuf::from(&media_dir);
  let mut entries = read_dir_recursive(&start_path).unwrap();

  println!("{:?}", entries);
}
