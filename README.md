# Tiny Tunes

Tunes in a tiny package! Play your favorite YouTube playlists and videos straight from your menubar.

<h1 align="center">
  <img style="width:30%;" alt='Demo' src="https://github.com/aaronleopold/tinytunes/blob/main/misc/early-demo.gif" />
</h1>

## Installation

If you plan on using the downloading feature, you will need to have both `youtube-dl` and `ffmpeg` installed. Otherwise, simply select appropriate installer file for your operating system and enjoy!

## Available Keybinds

_key actions marked with \* are currently NOT implemented_

#### Home

| Key                       | Action                                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| <kbd>⌘</kbd> <kbd>n</kbd> | Add a new YouTube playlist/video                                                                         |
| <kbd>⌘</kbd> <kbd>e</kbd> | Edit currently selected item                                                                             |
| <kbd>⌘</kbd> <kbd>s</kbd> | Sort the list view of playlists/videos \*                                                                |
| <kbd>⌘</kbd> <kbd>d</kbd> | Download the playlist/video to configured download location (default `~/Music/<playlist_or_video_name>`) |
| <kbd>up</kbd>             | Traverse up the list of playlists/videos                                                                 |
| <kbd>down</kbd>           | Traverse down the list of playlists/videos                                                               |
| <kbd>enter</kbd>          | Play selected item in list, persist an edit / change currently in progress                               |

#### Playing

| Key              | Action                                                         |
| ---------------- | -------------------------------------------------------------- |
| <kbd>left</kbd>  | Seek backwards to beginning, or play previous song in playlist |
| <kbd>right</kbd> | Play next song in playlist                                     |
| <kbd>up</kbd>    | Increase volume                                                |
| <kbd>down</kbd>  | Decrease Volume                                                |
| <kbd>m</kbd>     | Mute/Unmute Volume                                             |
| <kbd>space</kbd> | Toggle playing                                                 |

## Contributing

Contributions are encouraged and welcome! Please open an issue prior to working on a bug or feature to let me know you're interested. Please be sure to refer to the [CONTRIBUTING.md](https://github.com/aaronleopold/tinytunes/blob/main//CONTRIBUTING.md) file for more information. Thanks!

## Bugs / Issues

Some of these are current limitations of Tauri, which are either current bugs of Tauri or features not yet available in Tauri. If you find a bug or would like to contribute, please open an issue to address it. See all bugs [here](https://github.com/aaronleopold/tinytunes/issues?q=is%3Aissue+is%3Aopen+label%3Abug).

- [ ] Fix positioning issues on Windows [See here](https://github.com/aaronleopold/tinytunes/issues/2)
- [ ] Hide window on click away
- [ ] Hide app handle (I can get this functional, however it introduces a weird amount of bugs. [Potential fix](https://github.com/tauri-apps/tauri/pull/2825))
  - I can hide this in dev currently
- [ ] Right click tray icon for menu (Creating a native menu overrides the event handling, causing the tray icon to not respond to left clicks)
- [ ] Some videos completely break the app, not sure what causes it though. [See here](https://github.com/aaronleopold/tinytunes/issues/1)

## To-do

- [ ] Figure out weirdly large bundle size?? It's by no means \~big\~ but for a tauri app it's rather large
- [ ] allow user to download playlists/videos (using youtube-dl, ffmpeg, etc)
  - [x] basic downloading
  - [ ] prevent doubly downloading (i.e. if I am downloading something, I probably don't want the user to be able to download another??)
    - this probably requires me to add some state on the tauri side of things
  - [x] capture thread close event?
  - [ ] actually do something with the emitted events from tauri (maybe a toolbar or something that has percentage downloaded??)
- [ ] allow media controls? (e.g. double click headset play to skip)
