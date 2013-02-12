class ChallengesController < ApplicationController
before_filter :authenticate, :only => [:edit, :update, :create, :new]
  
  def new
    ## Set the requiered instance variable
    @title="New Challenge!"
    @challenge=Challenge.new
    ## User_to is sent when you find a user via the search function
    if params[:user_to] != nil
      @user_to = User.find_by_name(params[:user_to]).name
    end
    @friendchall = params[:personal]
  end

  def show
    @users = User.all
    @comment = Comment.new
    @challenge = Challenge.find(params[:id])
    views = @challenge.views.to_i+1
    @challenge.update_attributes(:views => views )
    @title = @challenge.title
    @food_items = @challenge.food.paginate(:page => params[:page], :per_page => Page.pagination)
    @comments= @challenge.comments.paginate(:page => params[:page],:per_page => Page.pagination)
  end

  def index
    @title = "List of challenges"
    @users = User.find(:all)
    @visibility = params[:visibility]
    @challtype = params[:challtype]
    if @challtype=="personal"
      if @visibility=="admin" && current_user.admin?
        @challenges = Challenge.find_all_by_visibility_and_personal("f","t").paginate(:page => params[:page], :per_page => 5)
      elsif @visibility=="new"
        @challenges = Challenge.find_all_by_visibility_and_accepted_and_personal("t","f","t").paginate(:page => params[:page], :per_page => 5)
      elsif @visibility=="awaiting"
        @challenges = Challenge.find_all_by_visibility_and_accepted_and_ready_and_personal("t","t","f","t").paginate(:page => params[:page], :per_page => 5)
      elsif @visibility=="running"
        @challenges = Challenge.find_all_by_visibility_and_ready_and_personal("t","t","t").paginate(:page => params[:page], :per_page => 5)
      elsif @visibility=="completed"
        @challenges = Challenge.find_all_by_visibility_and_completed_and_personal("t","t","t").paginate(:page => params[:page], :per_page => 5)     
      else
        @challenges = Challenge.find_all_by_visibility_and_personal("t","t").paginate(:page => params[:page], :per_page => 5)             
      end
    elsif @challtype == "regular"
      if @visibility=="admin" && current_user.admin?
        @challenges = Challenge.find_all_by_visibility("f").paginate(:page => params[:page], :per_page => 5)
      elsif @visibility=="new"
        @challenges = Challenge.find_all_by_visibility_and_accepted_and_personal("t","f","f").paginate(:page => params[:page], :per_page => 5)
      elsif @visibility=="awaiting"
        @challenges = Challenge.find_all_by_visibility_and_accepted_and_ready_and_personal("t","t","f","f").paginate(:page => params[:page], :per_page => 5)
      elsif @visibility=="running"
        @challenges = Challenge.find_all_by_visibility_and_ready_and_personal("t","t","f").paginate(:page => params[:page], :per_page => 5)
      elsif @visibility=="completed"
        @challenges = Challenge.find_all_by_visibility_and_completed_and_personal("t","t","f").paginate(:page => params[:page], :per_page => 5)     
      else
        @challenges = Challenge.find_all_by_visibility_and_personal("t","f").paginate(:page => params[:page], :per_page => 5)             
      end
    else   
      if @visibility=="admin" && current_user.admin?
        @challenges = Challenge.find_all_by_visibility("f").paginate(:page => params[:page], :per_page => 5)
      elsif @visibility=="new"
        @challenges = Challenge.find_all_by_visibility_and_accepted_and_personal("t","f","f").paginate(:page => params[:page], :per_page => 5)
      elsif @visibility=="awaiting"
        @challenges = Challenge.find_all_by_visibility_and_accepted_and_ready("t","t","f").paginate(:page => params[:page], :per_page => 5)
      elsif @visibility=="running"
        @challenges = Challenge.find_all_by_visibility_and_ready("t","t").paginate(:page => params[:page], :per_page => 5)
      elsif @visibility=="completed"
        @challenges = Challenge.find_all_by_visibility_and_completed("t","t").paginate(:page => params[:page], :per_page => 5)     
      else
        @challenges = Challenge.find_all_by_visibility("t").paginate(:page => params[:page], :per_page => 5)             
      end   
    end         
  end

  def create
    @challenge  = Challenge.new(params[:challenge])
    if @challenge.save
      @challenge.update_attributes(:proposer=>current_user.id)
      if params[:challenge][:user_to] != nil 
        @challenge.update_attributes(:user_id=> User.find_by_name(params[:challenge][:user_to]).id, :personal => true, :actions_required => params[:challenge][:actions_required] )
      end
      flash[:success] = "Challenge created!"
      redirect_to root_path
    else
      @title="New Challenge!"     
      render 'new'
    end
  end
  
  def update
    @users = User.all
    @comment = Comment.new
    @challenge = Challenge.find(params[:id])
    @comments= @challenge.comments.paginate(:page => params[:page])
    @challengeinit = Challenge.find(params[:id])
    thechallenger = User.find_by_id(@challenge.proposer).name
    @title = "View Challenge"
    if params[:challenge] == "visible"   
      @challenge.toggle!(:visibility)
      notification(User.find_by_id(@challenge.proposer),"challenge validation","your challenge "+@challenge.title+"is now approved")
      notification(User.find_by_id(@challenge.user_id),"You've been challenged","You have been challenged by "+thechallenger +"to the challenge : "+@challenge.title)      
      flash[:success] = "Challenge visible."
    elsif params[:challenge] == "takenow"
      proposer = User.find(@challenge.proposer)
      newchallpts = proposer.challpts.to_i + (@challenge.actions_required/10).to_i
      proposer.update_attribute(:challpts,newchallpts)
      notification(User.find_by_id(@challenge.proposer),"challenge scheduled","your challenge "+@challenge.title+"has enough actions, it is now scheduled")    
      notification(User.find_by_id(@challenge.user_id),"challenge scheduled","your challenge "+@challenge.title+"has enough actions, it is now scheduled, you must complete it within 10 days")       
             @challenge.food.each do |followingchallenge|
                notification(User.find(followingchallenge.user_id),"Challenge scheduled","The following challenge :"+@challenge.title+" has now enough actions and is scheduled!")       
             end     
              @challenge.update_attributes(:actions_required=>@challenge.actions.to_i)
      @challenge.toggle!(:ready)
      flash[:success] = "Challenge taken."  
    elsif params[:challenge] == "takenowpersonal" 
             proposer = User.find(@challenge.proposer)
             newchallpts = proposer.challpts.to_i + (@challenge.actions_required/10).to_i
             proposer.update_attribute(:challpts,newchallpts)
             notification(User.find_by_id(@challenge.proposer),"challenge scheduled","your challenge "+@challenge.title+"has enough actions, it is now scheduled")    
             notification(User.find_by_id(@challenge.user_id),"challenge scheduled","your challenge "+@challenge.title+"has enough actions, it is now scheduled, you must complete it within 10 days")       
             @challenge.food.each do |followingchallenge|
                notification(User.find(followingchallenge.user_id),"Challenge scheduled","The following challenge :"+@challenge.title+" has now enough actions and is scheduled!")       
             end   
                @challenge.toggle!(:accepted)
      flash[:success] = "Challenge taken." 
    elsif params[:challenge][:actions]!=nil && current_user.has_password?(params[:user][:password].to_s)
       if current_user.actions.to_i >= params[:challenge][:actions].to_i
                   notification(User.find_by_id(@challenge.user_id),"challenge updated","your challenge "+@challenge.title+"has got new actions")            
          act = current_user.actions.to_i - params[:challenge][:actions].to_i
          challpts = current_user.challpts.to_i + params[:challenge][:actions].to_i
          current_user.update_attributes(:challpts => challpts,:actions => act, :password=>params[:user][:password],:password_confirmation=>params[:user][:password])
          actions_given=params[:challenge][:actions].to_i ################18h09 GMT		  
          params[:challenge][:actions] = params[:challenge][:actions].to_i + @challenge.actions.to_i
          if params[:challenge][:actions] == @challenge.actions_required 
             proposer = User.find(@challenge.proposer)
             newchallpts = proposer.challpts.to_i + (@challenge.actions_required/10).to_i
             proposer.update_attribute(:challpts,newchallpts)          
             notification(User.find_by_id(@challenge.proposer),"challenge scheduled","your challenge "+@challenge.title+"has enough actions, it is now scheduled")    
             notification(User.find_by_id(@challenge.user_id),"challenge scheduled","your challenge "+@challenge.title+"has enough actions, it is now scheduled, you must complete it within 10 days")       
             @challenge.food.each do |user|
                notification(user,"Challenge scheduled","The following challenge :"+@challenge.title+" has now enough actions and is scheduled!")       
             end
            params[:challenge][:ready] = true
          end
          @challenge.update_attributes(params[:challenge]) 
       if !current_user.following?(@challenge)###
         current_user.follow!(@challenge,0)######18h09 GMT
       end 
         @following=current_user.followingchallenges.find_by_challenge_id(@challenge.id)#####
         actions_given=actions_given+@following.actions.to_i############18h10 GMT
         @following.update_attributes(:actions=>actions_given)#######################	   
        else
           flash[:fail] = "You do not have enough actions !"
         end
    elsif params[:challenge][:actions_required]!=nil
      if params[:challenge][:actions_required].to_i == @challenge.actions.to_i   
        params[:challenge][:ready] = true
      end  
      notification(User.find_by_id(@challenge.proposer),"challenge taken","your challenge "+@challenge.title+"has a challenger")    
      notification(User.find_by_id(@challenge.user_id),"You have a new challenge","You are now the challenger for the following challenge : "+@challenge.title)       
        
         @challenge.food.each do |followingchallenge|
            notification(User.find(followingchallenge.user_id),"Challenge taken","The following challenge :"+@challenge.title+" has now a challenger")       
         end

 
      proposer = User.find(@challenge.proposer)
      newchallpts = proposer.challpts.to_i + 5.to_i
      proposer.update_attribute(:challpts,newchallpts)
      @challenge.update_attributes(params[:challenge])  
    elsif params[:challenge][:completed]!=nil && current_user.has_password?(params[:user][:password].to_s)
        @challenge.update_attributes(params[:challenge])
        notification(User.find_by_id(@challenge.proposer),"challenge completed","your challenge"+@challenge.title+"is completed")     
        newchallpts = current_user.challpts + @challenge.actions_required*2
        current_user.update_attributes(:challpts=>newchallpts,:password=>params[:user][:password].to_s,:password_confirmation=>params[:user][:password].to_s) 
    else
    flash[:fail] = "The password you entered is incorrect !"
    end
    if @challenge.save
       @challengeinit = nil
       if flash[:fail] == nil
        flash[:success] = "Challenge updated !" 
        end
    end
    
    
     @user=current_user
     @food_items = @challenge.food.paginate(:page => params[:page])    
      
     render 'show'
  end
  
  
  def edit
    @users = User.all
    @challenge=Challenge.find(params[:id])
    render 'edit'
  end
  
  def destroy
    notification(User.find_by_id(@challenge.proposer),"challenge validation","your challenge "+@challenge.title+"has not been approved and have been deleted.")
    Challenge.find(params[:id]).destroy
    flash[:success] = "Challenge destroyed."
    redirect_to root_path
  end
  
  def search
    @challenges = Challenge.search params[:search]
  end


end
