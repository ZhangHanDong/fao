class CreateSettings < ActiveRecord::Migration
  def self.up
    create_table :settings,:options => 'ENGINE=InnoDB DEFAULT CHARSET=utf8' do |t|
      t.string :mykey,:myvalue
      t.timestamps
    end
  end

  def self.down
    drop_table :settings
  end
end
