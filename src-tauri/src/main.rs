#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod commands;
mod db;

use std::io::Read;

use futures::executor::block_on;
use tauri::api::path::{resolve_path, BaseDirectory};
use tauri::{
  CustomMenuItem, LogicalSize, PhysicalPosition, Position, SystemTray, SystemTrayMenu,
  SystemTrayMenuItem,
};
use tauri::{Manager, SystemTrayEvent};

fn main() {
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
      // FIXME: this causes some bugs
      // app.set_activation_policy(tauri::ActivationPolicy::Accessory);

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

        // logical position was not working
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
        }
      }
      SystemTrayEvent::RightClick {
        position: _,
        size: _,
        ..
      } => {
        println!("system tray received a right click");
      }
      _ => {
        println!("Some other event happend??");
      }
    })
    .invoke_handler(tauri::generate_handler![
      commands::resize_window,
      commands::test_connection,
      commands::hydrate,
      commands::get_yt_items
    ])
    .run(context)
    .expect("error while running tauri application");
}
