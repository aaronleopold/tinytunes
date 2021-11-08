use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

// storing user preferences this simplistic in a db seems rather silly,
// but I just really want to use rust as much as I can lol

// TODO: make theme configurable
#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "user_preferences")]
pub struct Model {
  #[sea_orm(primary_key)]
  pub id: i32,
  pub height: i32,
  pub width: i32,
  pub dark_theme: bool,
  pub download_directory: Option<String>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}
