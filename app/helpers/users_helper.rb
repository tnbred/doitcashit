module UsersHelper
  
    def gravatar_for(user, n,options = { :size => n })
    gravatar_image_tag(user.email.downcase, :alt => user.name,
                                            :class => 'gravatar',
                                            :gravatar => options)
    end
    

    def rank_user(user)
      @users=User.find(:all,:order=>"challpts")
      i=0
      while @users[i].name != user.name
        i=i+1
      end
      return(i+1)
    end
    
    def count_users
      User.find(:all).count
    end
end
