# Tiny Tunes

Tunes in a tiny package! Play your favorite YouTube playlists and videos straight from your menubar.

TODO: DEMO HERE

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
- [ ] allow user to download playlists/videos (using youtube-dl, ffmpeg, etc)
  - [ ] implement in rust? that could be fun
    - [ ] shell execute true?? tauri.conf.json
  - [x] add download location to preferences entity
    - [x] add default on up migration (kinda done, not in migration file tho)

## Available Keybinds

_key actions marked with \* are currently NOT implemented_

#### Home

| Key                       | Action                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| <kbd>⌘</kbd> <kbd>n</kbd> | Add a new YouTube playlist/video                                                                            |
| <kbd>⌘</kbd> <kbd>s</kbd> | Sort the list view of playlists/videos                                                                      |
| <kbd>⌘</kbd> <kbd>d</kbd> | Download the playlist/video to configured download location (default `~/Music/<playlist_or_video_name>`) \* |
| <kbd>up</kbd>             | Traverse up the list of playlists/videos                                                                    |
| <kbd>down</kbd>           | Traverse down the list of playlists/videos                                                                  |
| <kbd>enter</kbd>          | Play selected item in list, persist an edit / change currently in progress                                  |

#### Playing

| Key              | Action                                                         |
| ---------------- | -------------------------------------------------------------- |
| <kbd>left</kbd>  | Seek backwards to beginning, or play previous song in playlist |
| <kbd>right</kbd> | Play next song in playlist                                     |
| <kbd>space</kbd> | Toggle playing                                                 |

## Bugs / Issues

Some of these are current limitations of Tauri, which are either current bugs of Tauri or features not yet available in Tauri. If you find a bug or would like to contribute, please open an issue to address it.

- [ ] Hide window on click away
- [ ] Hide app handle (I can get this functional, however it introduces a weird amount of bugs. [Potential fix](https://github.com/tauri-apps/tauri/pull/2825))
- [ ] Right click tray icon for menu (Creating a native menu overrides the event handling, causing the tray icon to not respond to left clicks)
