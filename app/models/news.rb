class News < ActiveRecord::Base
   attr_accessible :title,:content, :user_id  
   belongs_to :user
   has_many :comments, :dependent => :destroy
   default_scope :order => 'news.created_at desc'
end
