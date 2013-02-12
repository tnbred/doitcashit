class Comment < ActiveRecord::Base
  attr_accessible :content, :user_id, :challenge_id, :news_id

  belongs_to :challenge
  belongs_to :new
  
  validates :content, :presence => true
  validates :user_id, :presence => true


  
  default_scope :order => 'comments.created_at DESC'

end
