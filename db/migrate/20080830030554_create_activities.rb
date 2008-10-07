class CreateActivities < ActiveRecord::Migration
  def self.up
    create_table :activities,:id=>false,:options => 'ENGINE=InnoDB DEFAULT CHARSET=utf8'  do |t|
      t.string :id,:null=>false
      t.date :sriqi
      t.string :dguojia
      t.text :renwu
      t.date :cfshijian
      t.integer :tltianshu
      t.string :ztdanwei
      t.string :yqdanwei
      t.string :rwpihao
      t.string :hzhaoma
      t.date :hzghriqi
      t.text :note
      t.string :sync_state,:default=>'new'

      t.timestamps
    end
    add_index :activities,:id,:primary=>true,:unique=>true
  end

  def self.down
    drop_table :activities
  end
end
