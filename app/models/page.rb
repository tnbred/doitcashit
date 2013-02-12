class Page < ActiveRecord::Base

  def self.pagination=(x)
    @pagination = x
  end

  def self.pagination
    @pagination
  end

end
