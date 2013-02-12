class AddCompletedAndVideolinkToChallenge < ActiveRecord::Migration
  def self.up
    add_column :challenges, :completed, :boolean, :default => false
    add_column :challenges, :videolink, :string, :default => "http://www.youtube.com/embed/yw6ZEgR2KMI?modestbranding=1"
  end

  def self.down
    remove_column :challenges, :videolink
    remove_column :challenges, :completed
  end
end
