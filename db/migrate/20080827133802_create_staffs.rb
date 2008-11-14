class CreateStaffs < ActiveRecord::Migration
  def self.up
    create_table :staffs,:id=>false,:options => 'ENGINE=InnoDB DEFAULT CHARSET=utf8' do |t|
      t.string :id,:null=>false
      t.string :name,:null=>false
      t.string :danwei
      t.string :zhiwu
      t.string :hzhaoma
      t.date :hzfzriqi
      t.date :hzyxq
      t.date :hzghriqi
      t.string :pyname,:spyname
      t.string  :sync_state,:default=>'new'
      t.date :birthday
      t.integer :sex
      t.string :note

      t.timestamps
    end
    add_index :staffs,:id,:primary=>true,:unique=>true
  end

  def self.down
    drop_table :staffs
  end
end
