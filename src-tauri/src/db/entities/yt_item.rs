use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "yt_items")]
pub struct Model {
  #[sea_orm(primary_key)]
  pub id: i32,
  pub name: String,  // defaults to New Playlist or New Stream (frontend)
  pub yt_id: String, // correlates to playlistId or videoId params on YouTube.com
  pub is_stream: bool,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}
