class PagesController < ApplicationController
  def home
    @title="Home"
    @users = User.all[0..4]
    @challenges = Challenge.find_all_by_completed("t")[0..4]
    @news = News.paginate(:page => params[:page], :per_page => 5)
  end

  def contact
    @users = User.all
    @title="Contact"
  end

  def help
    @users = User.all
    @title="Help"
  end

  def about
    @users = User.all
    @title="About"
  end

end
