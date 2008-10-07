class CreateBpRequests < ActiveRecord::Migration
  def self.up
    create_table :bp_requests do |t|
      t.text :envs
      t.text :params
      t.text :cookies
      t.text :sessions

      t.timestamps
    end
  end

  def self.down
    drop_table :bp_requests
  end
end
