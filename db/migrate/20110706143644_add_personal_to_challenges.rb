class AddPersonalToChallenges < ActiveRecord::Migration
  def self.up
    add_column :challenges, :personal, :boolean, :default => false
  end

  def self.down
    remove_column :challenges, :personal
  end
end
