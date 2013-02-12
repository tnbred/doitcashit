class MessagesController < ApplicationController

  def create

    @message = Message.new(params[:message])
    if @message.save
      flash[:success] = "Message sent!"
      redirect_to root_path
    else
      @title="Send a message"     
      render 'new'
    end    
  end
  
  def show
    @users = User.all
    @message= Message.find(params[:id])
    @message.update_attributes(:read => true)
    @title = @message.title 
  end
  
  def new
    @users = User.all
    @message = Message.new
    @title = "Send a message"
    @user_to = params[:user_to]
    @answer_title = Message.find_by_id(params[:answer_title])
  end
    
  def destroy
    Message.find(params[:id]).destroy
    flash[:success] = "Message destroyed."
    redirect_to messages_path
  end
  
  def index
    @users = User.all
    @title="Inbox"
    if !params[:commit].nil?
            for i in 0..Page.pagination do 
              if !params["#{i}"].nil?
                 Message.find(params["#{i}"]).destroy
               end
            end
    end
    if params[:choice]=="received" || params[:choice].nil?
      @messages = Message.find_all_by_user_name_to(current_user.name).paginate(:page => params[:page], :per_page => 10)
    else
      @messages = Message.find_all_by_user_id_from(current_user.id).paginate(:page => params[:page], :per_page => 10)
    end
  end
  
  def search
    @users = User.search params[:search]
  end


end
