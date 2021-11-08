export interface YouTubeItem {
  id: number;
  name: string;
  yt_id: string;
  is_stream: boolean;
}

export interface UserPreferences {
  height: number;
  width: number;
  dark_theme: boolean;
  download_directory?: string;
}

export interface HydrateReturn {
  items: YouTubeItem[];
  userPreferences: UserPreferences;
}
