# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20080908124316) do

  create_table "activities", :force => true do |t|
    t.date     "sqriqi"
    t.string   "dguojia"
    t.string   "dgjpy"
    t.string   "dgjspy"
    t.text     "renwu"
    t.date     "cfshijian"
    t.integer  "tltianshu",  :limit => 11
    t.string   "ztdanwei"
    t.string   "yqdanwei"
    t.string   "rwpihao"
    t.text     "note"
    t.string   "sync_state",               :default => "new"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "activities", ["id"], :name => "index_activities_on_id", :unique => true

  create_table "bp_requests", :force => true do |t|
    t.text     "envs"
    t.text     "params"
    t.text     "cookies"
    t.text     "sessions"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "staffds", :force => true do |t|
    t.string   "staff_id",                                     :null => false
    t.string   "activity_id",                                  :null => false
    t.string   "danwei"
    t.string   "zhiwu"
    t.integer  "isreturned",  :limit => 11
    t.string   "hzhaoma"
    t.date     "hzghriqi"
    t.text     "note"
    t.string   "sync_state",                :default => "new"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "staffds", ["id"], :name => "index_staffds_on_id", :unique => true
  add_index "staffds", ["staff_id", "activity_id"], :name => "index_staffds_on_staff_id_and_activity_id", :unique => true

  create_table "staffs", :force => true do |t|
    t.string   "name",                                        :null => false
    t.string   "danwei"
    t.string   "zhiwu"
    t.string   "hzhaoma"
    t.date     "hzghriqi"
    t.string   "pyname"
    t.string   "spyname"
    t.string   "sync_state",               :default => "new"
    t.date     "birthday"
    t.integer  "sex",        :limit => 11
    t.string   "note"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "staffs", ["id"], :name => "index_staffs_on_id", :unique => true

end
