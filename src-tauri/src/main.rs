#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod app;
mod commands;
mod db;
mod youtube;

use app::menu;

use futures::executor::block_on;
use tauri::api::path::{resolve_path, BaseDirectory};
use tauri::{
  CustomMenuItem, LogicalSize, Manager, PhysicalPosition, Position, SystemTray, SystemTrayEvent,
  SystemTrayMenu, SystemTrayMenuItem,
};

// TODO: https://github.com/JonasKruckenberg/tauri-plugin-positioner
fn main() {
  env_logger::builder()
    .filter_level(log::LevelFilter::Debug)
    .is_test(true)
    .init();

  let context = tauri::generate_context!();

  let migrations_folder = resolve_path(
    context.config(),
    context.package_info(),
    "migrations",
    Some(BaseDirectory::Resource),
  )
  .unwrap();

  println!("Creating the database...");
  // create the database (if it doesn't exist)
  block_on(db::connection::create_db(migrations_folder)).unwrap();

  println!("Fetching the preferences...");
  let preferences = block_on(db::get_user_preferences()).unwrap();

  // FIXME: this overrides the tray left click for some reason
  // let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  // let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  // let tray_menu = SystemTrayMenu::new()
  //   .add_item(quit)
  //   .add_native_item(SystemTrayMenuItem::Separator)
  //   .add_item(hide);

  let system_tray = SystemTray::new();
  // .with_menu(tray_menu);

  tauri::Builder::default()
    .setup(move |app| {
      app.set_activation_policy(tauri::ActivationPolicy::Accessory);

      let window_size = LogicalSize {
        width: preferences.width as f64,
        height: preferences.height as f64,
      };

      let window = app.get_window("main").unwrap();

      window.hide().unwrap();
      window.set_size(tauri::Size::Logical(window_size)).unwrap();

      Ok(())
    })
    .system_tray(system_tray)
    .on_system_tray_event(|app, event| match event {
      SystemTrayEvent::LeftClick {
        position, size: _, ..
      } => {
        println!("system tray received a left click");

        let window = app.get_window("main").unwrap();

        // TODO: this is wrong on windows and other OS's that have
        // taskbars on the bottom of the screen
        let tray_pos = PhysicalPosition {
          x: position.x as i32,
          y: position.y as i32,
        };

        println!("setting window to tray position: {:?}", tray_pos);

        window.set_position(Position::Physical(tray_pos)).unwrap();

        // FIXME: this will not show on workspaces other than the initial one
        if window.is_visible().unwrap() {
          println!("hiding window");
          window.hide().unwrap();
        } else {
          println!("showing window");
          window.show().unwrap();
          window.set_focus().unwrap();
        }
      }
      SystemTrayEvent::RightClick {
        position: _,
        size: _,
        ..
      } => {
        println!("system tray received a right click");
        println!("Going to exit since the menu is not working properly :weary:");

        app.get_window("main").unwrap().close().unwrap();
      }
      _ => {
        println!("Some other event happend??");
      }
    })
    .invoke_handler(tauri::generate_handler![
      commands::get_user_audiodir,
      commands::resize_window,
      commands::set_dark_theme,
      commands::set_download_directory,
      commands::hydrate,
      commands::get_yt_items,
      commands::insert_yt_item,
      commands::update_yt_item,
      commands::delete_yt_item,
      commands::download_yt_item
    ])
    .menu(menu::get_menu())
    .run(context)
    .expect("error while running tauri application");
}
