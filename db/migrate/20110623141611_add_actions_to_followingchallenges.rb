class AddActionsToFollowingchallenges < ActiveRecord::Migration
  def self.up
    add_column :followingchallenges, :actions, :integer
  end

  def self.down
    remove_column :followingchallenges, :actions
  end
end
