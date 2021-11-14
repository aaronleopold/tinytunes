use anyhow::Result;

use tauri::api::process::Command;

use lazy_static::lazy_static;
use regex::Regex;

fn should_emit_playlist_update(text: &str) -> bool {
  lazy_static! {
      // Downloading video (?P<current>\d+) of (?P<total>\d+)
      static ref PLAYLIST_REGEX: Regex = Regex::new(r"Downloading video \d+ of \d+").unwrap();
  }

  PLAYLIST_REGEX.is_match(text)
}

pub struct YoutubeDl {
  out_dir: String,
  name: Option<String>,
  id: String,
  is_playlist: bool,
}

impl YoutubeDl {
  pub fn new(out_dir: String, name: Option<String>, id: String, is_playlist: bool) -> YoutubeDl {
    YoutubeDl {
      out_dir,
      name,
      id,
      is_playlist,
    }
  }

  pub fn check_installations(&self) -> Result<String> {
    std::process::Command::new("youtube-dl")
      .arg("--version")
      .output()
      .map_err(|e| anyhow::anyhow!("youtube-dl not installed: {}", e))?;

    std::process::Command::new("ffmpeg")
      .arg("-version")
      .output()
      .map_err(|e| anyhow::anyhow!("ffmpeg not installed: {}", e))?;

    Ok("youtube-dl and ffmpeg installed".to_string())
  }

  fn get_playlist_command(&self) -> Command {
    Command::new("youtube-dl").args(vec![
      "--extract-audio",
      "--audio-format",
      "mp3",
      "-o",
      format!(
        "{}/{}/%(title)s.%(ext)s",
        self.out_dir.clone(),
        self.name.to_owned().unwrap()
      )
      .as_str(),
      format!("https://www.youtube.com/playlist?list={}", self.id).as_str(),
    ])
  }

  fn get_video_command(&self) -> Command {
    Command::new("youtube-dl").args(vec![
      "--extract-audio",
      "--audio-format",
      "mp3",
      "-o",
      format!("{}/%(title)s.%(ext)s", self.out_dir.clone()).as_str(),
      format!("https://www.youtube.com/watch?v={}", self.id).as_str(),
    ])
  }

  pub fn get_command(&self) -> Command {
    if self.is_playlist {
      return self.get_playlist_command();
    } else {
      return self.get_video_command();
    }
  }

  pub fn should_emit_output(&self, line: &str) -> bool {
    // playlists target line: 'Downloading video N of N'
    if self.is_playlist && should_emit_playlist_update(line) {
      return true;
    }

    false

    // video: [download]   2.5% of 84.94MiB at 75.74KiB/s ETA 18:39
    // video downloads don't seem to push new lines to stdout on progress updates,
    // which is really unfortunate. Not sure how I will track progress for downloading videos
    // becaues of this.
  }
}
