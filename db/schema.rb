# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110706143644) do

  create_table "challenges", :force => true do |t|
    t.string   "content"
    t.string   "title"
    t.integer  "user_id",          :default => 1
    t.integer  "actions",          :default => 0
    t.integer  "actions_required", :default => 0
    t.boolean  "accepted",         :default => false
    t.boolean  "visibility",       :default => false
    t.boolean  "ready",            :default => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "completed",        :default => false
    t.string   "videolink",        :default => "http://www.youtube.com/embed/yw6ZEgR2KMI?modestbranding=1"
    t.integer  "proposer"
    t.integer  "views"
    t.boolean  "personal",         :default => false
  end

  create_table "comments", :force => true do |t|
    t.text     "content"
    t.integer  "user_id"
    t.integer  "challenge_id"
    t.integer  "news_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["created_at"], :name => "index_comments_on_created_at"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

  create_table "followingchallenges", :force => true do |t|
    t.integer  "user_id"
    t.integer  "challenge_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "actions"
  end

  add_index "followingchallenges", ["challenge_id"], :name => "index_followingchallenges_on_challenge_id"
  add_index "followingchallenges", ["user_id", "challenge_id"], :name => "index_followingchallenges_on_user_id_and_challenge_id", :unique => true
  add_index "followingchallenges", ["user_id"], :name => "index_followingchallenges_on_user_id"

  create_table "messages", :force => true do |t|
    t.string   "content"
    t.string   "title"
    t.string   "user_name_to"
    t.integer  "user_id_from"
    t.boolean  "read",         :default => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "news", :force => true do |t|
    t.text     "content"
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "users", :force => true do |t|
    t.string   "salt"
    t.string   "encrypted_passwd"
    t.string   "email"
    t.string   "name"
    t.integer  "actions",          :default => 0
    t.integer  "challpts",         :default => 0
    t.boolean  "admin",            :default => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true

end
