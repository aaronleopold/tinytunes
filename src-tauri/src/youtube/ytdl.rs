use anyhow::Result;
use std::{
  io::{BufRead, BufReader},
  process::{Command, Stdio},
};

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
    Command::new("youtube-dl")
      .arg("--version")
      .output()
      .map_err(|e| anyhow::anyhow!("youtube-dl not installed: {}", e))?;

    Command::new("ffmpeg")
      .arg("-version")
      .output()
      .map_err(|e| anyhow::anyhow!("ffmpeg not installed: {}", e))?;

    Ok("youtube-dl and ffmpeg installed".to_string())
  }

  pub fn run(&self) -> Result<String> {
    self.download()?;
    Ok("Finished".to_owned())
  }

  pub fn get_child(&self) -> Command {
    let mut child = Command::new("youtube-dl");

    child
      .arg("--extract-audio")
      .arg("--audio-format")
      .arg("mp3")
      .arg("-o");

    if self.is_playlist {
      child
        .arg(format!(
          "{}/{}/%(title)s.%(ext)s",
          self.out_dir,
          self.name.to_owned().unwrap()
        ))
        .arg(format!("https://www.youtube.com/playlist?list={}", self.id));
    } else {
      child
        .arg(format!("{}/%(title)s.%(ext)s", self.out_dir))
        .arg(format!("https://www.youtube.com/watch?v={}", self.id));
    }

    child
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

  pub fn download(&self) -> Result<()> {
    self.check_installations()?;

    let mut child = self.get_child();

    let stdout = child
      .stdout(Stdio::piped())
      .spawn()?
      .stdout
      .ok_or_else(|| anyhow::anyhow!("youtube-dl failed"))?;

    let reader = BufReader::new(stdout);

    reader.lines().for_each(|line| {
      let text = line.unwrap();
      println!("{}", text);
      if self.should_emit_output(&text) {
        println!("{}", text);
      }
    });

    Ok(())
  }
}

#[cfg(test)]
mod tests {
  #[test]
  fn test_playlist() {
    let ydl = super::YoutubeDl::new(
      "/Users/aaronleopold/Music/testing_tunes".to_string(),
      Some("Chill Lofi".to_string()),
      "PLm5pKYShxnXB1g2LixFdKxjAvl3P2O4Hm".to_string(),
      true,
    );

    ydl.run().unwrap();
  }

  #[test]
  fn test_video() {
    let ydl = super::YoutubeDl::new(
      "/Users/aaronleopold/Music/testing_tunes".to_string(),
      None,
      "_ITiwPMUzho".to_string(),
      false,
    );

    ydl.run().unwrap();
  }
}
