class AddUserIdToNews < ActiveRecord::Migration
  def self.up
    add_column :news, :user_id, :integer
  end

  def self.down
    remove_column :news, :user_id
  end
end
