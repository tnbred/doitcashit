class UsersController < ApplicationController
  before_filter :authenticate, :only => [:edit, :update]
  before_filter :correct_user, :only => [:edit, :update] 
  
  def new
    @users = User.all
    @user = User.new
    @title = "Sign up"
  end
  
  def index
    @title = "All users"
    @users = User.paginate(:page => params[:page])
  end
  
  def destroy
    User.find(params[:id]).destroy
    flash[:success] = "User destroyed."
    redirect_to users_path
  end
  
 
  def show
    @users = User.all
    @user = User.find(params[:id])
    @title = @user.name
    @what_to_display=params[:what_to_display] 
    if @what_to_display=="followed"
       @feed_items = @user.feed.paginate(:page => params[:page])  
    elsif @what_to_display=="proposed"
      @challenges=Challenge.find_all_by_visibility_and_proposer("t",@user).paginate(:page => params[:page])
    elsif @what_to_display=="taken"
          @challenges = @user.challenges.find_all_by_visibility("t").paginate(:page => params[:page])  
    elsif @what_to_display=="personal"
          @challenges = @user.challenges.find_all_by_visibility_and_personal_and_accepted("t","t","t").paginate(:page => params[:page]) 
        else
                  @challenges = @user.challenges.find_all_by_visibility_and_personal("t","t").paginate(:page => params[:page]) 
  
    end
  end
  
  def update
    @users = User.paginate(:page => params[:page])
    @title="Edit"
    if current_user.has_password?(params[:user][:password_old].to_s)
     if params[:user][:password] == '' && params[:user][:password_confirmation] == ''
       params[:user][:password] = params[:user][:password_old].to_s
       params[:user][:password_confirmation] = params[:user][:password_old].to_s     
     end
     if @user.update_attributes(params[:user]) 
       flash[:success] = "Profile updated."
       redirect_to @user
     else
       render 'edit'
     end
     else
       flash[:fail] = "Password incorrect."     
       render 'edit'
    end
   end
  
  def create
    @user = User.new(params[:user])
    @users =User.all
    if @user.save
      sign_in @user
      flash[:success] = "Welcome to Do It and Cash It !"
      redirect_to @user
    else
      @title = "Sign up"
      render 'new'
    end
  end
  
  def edit
    @title = "Edit user"
    @users = User.find(:all)
  end
  
  def search
    @users = User.search params[:search]
  end


    private
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_path) unless current_user?(@user)
    end
    


end
