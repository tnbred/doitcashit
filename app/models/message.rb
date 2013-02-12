class Message < ActiveRecord::Base
  
  attr_accessible :content, :user_name_to, :user_id_from, :title, :read

  
  validates :content, :presence => true
  validates :user_id_from, :presence => true


  
  default_scope :order => 'messages.created_at DESC'
  
  def search(search)
    User.find(:all, :conditions => ['name LIKE ?', "%#{search}%"])
  end
  
  
end
