use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn custom_menu(name: &str) -> CustomMenuItem {
  let c = CustomMenuItem::new(name.to_string(), name);
  return c;
}

pub fn get_menu() -> Menu {
  Menu::new()
    .add_submenu(Submenu::new(
      "Tiny Tunes",
      Menu::new()
        .add_native_item(MenuItem::About("Tiny Tunes".to_string()))
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Hide)
        .add_native_item(MenuItem::HideOthers)
        .add_native_item(MenuItem::ShowAll)
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Quit),
    ))
    .add_submenu(Submenu::new("Edit", {
      Menu::new()
        .add_native_item(MenuItem::Undo)
        .add_native_item(MenuItem::Redo)
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Cut)
        .add_native_item(MenuItem::Copy)
        .add_native_item(MenuItem::Paste)
        .add_native_item(MenuItem::SelectAll)
        .add_native_item(MenuItem::Separator)
        .add_item(custom_menu("Edit Text").accelerator("enter"))
        .add_item(custom_menu("Cancel").accelerator("escape"))
      // .add_native_item(MenuItem::Separator)
      // .add_item(custom_menu("New Todo").accelerator("cmdOrControl+n"))
    }))
    .add_submenu(Submenu::new("View", Menu::new()))
    .add_submenu(Submenu::new(
      "Window",
      Menu::new()
        .add_native_item(MenuItem::Minimize)
        .add_native_item(MenuItem::Zoom),
    ))
    .add_submenu(Submenu::new(
      "Help",
      Menu::new().add_item(custom_menu("Learn More")),
    ))
    .add_native_item(MenuItem::Copy)
}
