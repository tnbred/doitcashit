class NewsController < ApplicationController

  def new
    @users = User.all
    @news = News.new
    @title = "Add a news"
  end
  
  def show
    @users = User.all
    @comment = Comment.new
    @new = News.find(params[:id])
    @title = @new.title
    @comments= @new.comments.paginate(:page => params[:page],:per_page => 10)

  end
  def create
    @news = current_user.news.build(params[:news])
    if @news.save
      flash[:success] = "News Created!"
      redirect_to root_path
    else
      @title = "Add a news"
      flash[:fail] = "News not saved"      
      render 'new'
    end
  end

end
