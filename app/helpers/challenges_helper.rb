module ChallengesHelper
  
    def create_follow
      @user=current_user
      @user.follow!(@challenge)
    end
   
   
   def givemethechallenge(feed,count)
     Challenge.find_by_id(feed.followingchallenges[count].challenge_id)
   end
end

