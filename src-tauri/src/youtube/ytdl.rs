use std::process::Command;

pub struct YoutubeDl {
  out_dir: String,
  name: String,
  id: String,
  is_playlist: bool,
}

impl YoutubeDl {
  pub fn new(out_dir: String, name: String, id: String, is_playlist: bool) -> YoutubeDl {
    YoutubeDl {
      out_dir,
      name,
      id,
      is_playlist,
    }
  }

  pub fn run(&self) {
    if self.is_playlist {
      self.download_playlist();
    } else {
      self.download_video();
    }
  }

  fn download_playlist(&self) {
    let mut child = Command::new("youtube-dl")
      .arg("-f")
      .arg("bestaudio")
      .arg("-o")
      .arg(format!("{}/%(title)s.%(ext)s", self.out_dir))
      .arg("--yes-playlist");

    todo!("I am not implemented");
  }

  fn download_video(&self) {
    todo!("I am not implemented")
  }
}
