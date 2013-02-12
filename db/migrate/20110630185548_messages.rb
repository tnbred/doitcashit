class Messages < ActiveRecord::Migration
  def self.up
    create_table :messages do |t|
      t.string :content
      t.string :title
      t.string :user_name_to
      t.integer :user_id_from 
      t.boolean :read , :default => false
      t.timestamps   
      end 
  end

  def self.down
  end
end
