class Followingchallenge < ActiveRecord::Base
  attr_accessible :challenge_id, :actions
  attr_accessible :user_id
  
  belongs_to :user_follower, :class_name => "User"
  belongs_to :challenge_followed, :class_name => "Challenge"
  
  validates :user_id, :presence => true
  validates :challenge_id, :presence => true
  
  def followers?(user_follower)
    followingchallenges.find_by_user_id(user_follower)
  end
 
end
