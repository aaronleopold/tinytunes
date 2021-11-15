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
| <kbd>m</kbd>     | Mute Volume \*                                                 |
| <kbd>space</kbd> | Toggle playing                                                 |

## To-do

- [x] new a name for the project (tiny tunes!?)
- [x] get basic ui designed (p much set at this point)
- [ ] make light/dark theme togglable (not just prefers-media dependent)
  - [x] persist in db (default dark 🤷‍♂️)
- [ ] figure out disabled states for navigation buttons
  - [ ] i.e. track navigation history manually :/
- [ ] sortable list
  - [ ] persist sort order
- [x] play video/playlist on double click (like, yknow, the main feature)
  - [x] add relevant keybinds (see [list of keybinds](#available-keybinds))
  - [x] add progress bar
    - [x] make progress bar seekable (click to seek)
- [x] volume control
- [ ] allow user to download playlists/videos (using youtube-dl, ffmpeg, etc)
  - [x] basic downloading
  - [ ] prevent doubly downloading (i.e. if I am downloading something, I probably don't want the user to be able to download another??)
    - this probably requires me to add some state on the tauri side of things
  - [ ] capture thread close event?git
  - [ ] actually do something with the emitted events from tauri (maybe a toolbar or something that has percentage downloaded??)
- [x] add download location to preferences entity
  - [x] add default on up migration (kinda done, not in migration file tho)

## Bugs / Issues

Some of these are current limitations of Tauri, which are either current bugs of Tauri or features not yet available in Tauri. If you find a bug or would like to contribute, please open an issue to address it.

- [ ] Fix positioning issues on Windows
- [ ] Hide window on click away
- [x] Hide app handle (I can get this functional, however it introduces a weird amount of bugs. [Potential fix](https://github.com/tauri-apps/tauri/pull/2825))
- [ ] Right click tray icon for menu (Creating a native menu overrides the event handling, causing the tray icon to not respond to left clicks)
- [ ] Some videos completely break the app, not sure what causes it though. Compiling it with --debug flag, or running it in dev, removes the error completely, which makes it extremely hard to debug. I suspect it's something on YouTube's end not liking that I am accessing particular videos through their api without a key?
  - related: if a video becomes unavailable, it will produce the same error. Unhiding the iframe will show the message 'This video/live stream recording is not available.'
