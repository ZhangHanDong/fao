class CreateStaffds < ActiveRecord::Migration
  def self.up
    create_table :staffds,:id=>false,:options => 'ENGINE=InnoDB DEFAULT CHARSET=utf8'  do |t|
      t.string :id,:null=>false
      t.string :staff_id,:null=>false
      t.string :activity_id,:null=>false
      t.string :danwei
      t.string :zhiwu
      t.string :hzhaoma
      t.date :hzghriqi
      t.text :note
      t.string :sync_state, :default => 'new'
      t.timestamps
    end
    add_index :staffds,:id,:primary=>true,:unique=>true
    add_index :staffds,[:staff_id,:activity_id],:unique=>true
  end

  def self.down
    drop_table :staffds
  end
end
