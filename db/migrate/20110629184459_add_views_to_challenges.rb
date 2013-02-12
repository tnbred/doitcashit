class AddViewsToChallenges < ActiveRecord::Migration
  def self.up
    add_column :challenges, :views, :integer, :defaut => 0
  end

  def self.down
    remove_column :challenges, :views
  end
end
