use sea_orm::EntityTrait;

use self::connection::db_instance;

pub mod connection;
pub mod entities;

pub async fn get_user_preferences() -> Result<entities::preferences::Model, String> {
  let db = db_instance().await.map_err(|e| e.to_string())?;

  let user_preferences = entities::preferences::Entity::find()
    .one(db)
    .await
    .map_err(|e| e.to_string())?;

  // I create this before I call this function, so I am comfortable unwrapping here
  Ok(user_preferences.unwrap())
}
