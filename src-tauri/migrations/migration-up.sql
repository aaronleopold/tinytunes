CREATE TABLE IF NOT EXISTS `yt_items` (
  `id` integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  `name` text NOT NULL,
  `yt_id` text NOT NULL UNIQUE,
  `is_stream` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `user_preferences` (
  `id` integer NOT NULL PRIMARY KEY CHECK (id = 0),
  `height` integer  NOT NULL DEFAULT 500,
  `width` integer NOT NULL DEFAULT 400,
  `dark_theme` integer NOT NULL DEFAULT 1,
  `download_directory` text 
);

INSERT INTO `user_preferences` (`id`)
SELECT 0
WHERE NOT EXISTS (SELECT * FROM `user_preferences`);
