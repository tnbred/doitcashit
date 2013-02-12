class AddProposerToChallenges < ActiveRecord::Migration
  def self.up
    add_column :challenges, :proposer, :integer
  end

  def self.down
    remove_column :challenges, :proposer
  end
end
