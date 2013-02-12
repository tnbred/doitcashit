class CreateFollowingchallenges < ActiveRecord::Migration
  def self.up
    create_table :followingchallenges do |t|
      t.integer :user_id
      t.integer :challenge_id

      t.timestamps
    end
    
    add_index :followingchallenges, :user_id
    add_index :followingchallenges, :challenge_id
    add_index :followingchallenges, [:user_id,:challenge_id], :unique => true

  end

  def self.down
    drop_table :followingchallenges
  end
end
