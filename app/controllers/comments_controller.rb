class CommentsController < ApplicationController
  before_filter :authenticate, :only => [:create, :destroy]

  def create
    if params[:comment][:challenge_id] != nil
      challenge_id=params[:comment][:challenge_id].to_i
      @challenge= Challenge.find_by_id(challenge_id)
      if @challenge.nil?
        redirect_to root_path
      else
       @comment  = @challenge.comments.build(params[:comment])
        if @comment.save
          flash[:success] = "comment posted!"
          redirect_to challenge_path(@challenge)
        else
          redirect_to user_path(current_user)
        end
      end
    elsif params[:comment][:news_id] != nil
      news_id=params[:comment][:news_id].to_i
      @new= News.find_by_id(news_id)
      if @new.nil?
        redirect_to root_path
      else
       @comment  = @new.comments.build(params[:comment])
        if @comment.save
          flash[:success] = "comment posted!"
          redirect_to news_path(@new)
        else
          redirect_to user_path(current_user)
        end
      end
    else
      redirect_to root_path
    end
 end


  def destroy
  end
end
