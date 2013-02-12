class ApplicationController < ActionController::Base
  protect_from_forgery  
  include SessionsHelper, ApplicationHelper
  Page.pagination = 10
end
