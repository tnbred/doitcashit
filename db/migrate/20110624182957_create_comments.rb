class CreateComments < ActiveRecord::Migration
  def self.up
    create_table :comments do |t|
      t.text :content
      t.integer :user_id
      t.integer :challenge_id
      t.integer :news_id
      t.timestamps
    end
    
    
    
    add_index :comments, :user_id
    add_index :comments, :created_at

  end

  def self.down
    drop_table :comments
  end
end
