class CreateChallenges < ActiveRecord::Migration
  def self.up
    create_table :challenges do |t|
      t.string :content
      t.string :title
      t.integer :user_id , :default => 1
      t.integer :actions , :default => 0
      t.integer :actions_required , :default => 0
      t.boolean :accepted , :default => false
      t.boolean :visibility , :default => false
      t.boolean :ready , :default => false
      t.timestamps
    end
  end

  def self.down
    drop_table :challenges
  end
end
