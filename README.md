# Tiny Tunes

Tunes in a tiny package! Play your favorite YouTube playlists and videos straight from your menubar.

## To-do

- [x] new a name for the project (tiny tunes!?)
- [ ] get basic ui designed
  - [ ] make light/dark theme togglable (not just prefers-media dependent)
- [ ] figure out disabled states for navigation buttons
- [ ] sortable list
  - [ ] persist sort order
- [ ] play video/playlist on double click (like, yknow, the main feature)
  - [ ] add relevant keybinds (see [list of keybinds](#available-keybinds))
- [ ] allow user to download playlists/videos (using youtube-dl, ffmpeg, etc)
  - [ ] implement in rust? that could be fun
  - [ ] add download location to preferences entity
    - [ ] add default on up migration

## Available Keybinds

_key actions marked with \* are currently NOT implemented_

| Key                       | Action                                                                                                                |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| <kbd>⌘</kbd> <kbd>n</kbd> | Add a new YouTube playlist/video                                                                                      |
| <kbd>⌘</kbd> <kbd>s</kbd> | Sort the list view of playlists/videos                                                                                |
| <kbd>up</kbd>             | Traverse up the list of playlists/videos                                                                              |
| <kbd>down</kbd>           | Traverse down the list of playlists/videos                                                                            |
| <kbd>enter</kbd>          | Play selected item in list, persist an edit / change currently in progress                                            |
| <kbd>left</kbd>           | Seek backwards, double click to play previous song in playlist \*                                                     |
| <kbd>right</kbd>          | Seek forwards, double click to play next song in playlist \*                                                          |
| <kbd>space</kbd>          | Pause playing \*                                                                                                      |
| <kbd>⌘</kbd> <kbd>n</kbd> | Add a new YouTube playlist/video                                                                                      |
| <kbd>⌘</kbd> <kbd>d</kbd> | Download the playlist/video to configured download location (default `~/Music/tinytunes/<playlist_or_video_name>`) \* |
