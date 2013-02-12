class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.string :salt
      t.string :encrypted_passwd
      t.string :email
      t.string :name
      t.integer :actions ,:default => 0
      t.integer :challpts , :default => 0
      t.boolean :admin ,  :default => false
      t.timestamps
    end
    add_index :users, :email, :unique => true
  end

  def self.down
    drop_table :users
  end
end
