use anyhow::Result;
use std::{fs::DirEntry, path::PathBuf};

// TODO: supported extensions
fn should_ignore(entry: &DirEntry) -> bool {
  let os_str = entry.file_name();
  let name = os_str.to_string_lossy();

  if name.starts_with(".") || name.starts_with("_") {
    return true;
  }

  if name == "Music" {
    return true;
  }

  println!("{}", name);

  false
}

// this is just for testing, I want to see all the files in all subdirectories.
// Now that I got this working, I will prolly load directories to the UI, and then re-call
// a read_dir when a user clicks on a directory.
fn read_dir_recursive(path: &PathBuf) -> Result<Vec<DirEntry>> {
  let mut entries = Vec::new();

  for entry in std::fs::read_dir(path)? {
    if let Ok(entry) = entry {
      //   println!("{:?}", entry.metadata()?);
      if should_ignore(&entry) {
        continue;
      } else if entry.metadata()?.is_dir() {
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
