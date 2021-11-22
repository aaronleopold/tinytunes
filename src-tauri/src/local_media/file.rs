use anyhow::Result;
use std::{
  fs::DirEntry,
  path::{Path, PathBuf},
};

fn read_dir(path: &PathBuf) -> Result<Vec<DirEntry>> {
  let mut entries = Vec::new();
  for entry in std::fs::read_dir(path)? {
    entries.push(entry?);
  }
  Ok(entries)
}

// this function will read all of the music files in the directory `media_dir`
pub fn get_local_music(media_dir: String) {
  let start_path = PathBuf::from(&media_dir);
  let mut all_entries = read_dir(&start_path).unwrap();

  println!("{:?}", all_entries);
  //   for entry in entries.iter_mut() {
  //     let path = entry.path();
  //     if path.is_dir() {
  //       println!("{}", path.display());
  //       entries.append(&mut read_dir(&path).unwrap());
  //     } else {
  //       println!("{}", path.display());
  //     }
  //   }
}
