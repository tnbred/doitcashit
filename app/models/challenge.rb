class Challenge < ActiveRecord::Base
  attr_accessible :content, :title , :actions, :actions_required, :accepted, :user_id, :ready, :completed, :videolink, :proposer, :views, :personal
  belongs_to :user
  has_many :comments, :dependent => :destroy
  has_many :followingchallenges, :foreign_key => "challenge_id",
                           :class_name => "Followingchallenge",
                           :dependent => :destroy

  validates :content,:title, :presence => true
  validate :actions_must_be_smaller_than, :if => :accepted?

  default_scope :order => 'challenges.actions_required desc'
  
  def accepted?
    return self.accepted
  end
  
  def actions_must_be_smaller_than
    
    if actions <= actions_required
      return true
    else 
      errors.add(:actions, "can't be bigger than required actions")
      return false
    end
  end
  
  def following?(user)
    followingchallenges.find_by_user_id(user)
  end
  
  def food
    followingchallenges
  end
  
  def self.search(search)
    find_all_by_visibility("t",:conditions => ['content LIKE ? OR title LIKE ?', "%#{search}%","%#{search}%"])
  end


end

