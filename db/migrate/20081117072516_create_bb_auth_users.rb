class CreateBbAuthUsers < ActiveRecord::Migration
  def self.up
    create_table :bb_auth_users ,:options => 'ENGINE=InnoDB DEFAULT CHARSET=utf8' do |t|
      t.string :email
      t.string :displayname
      t.string :userhash

      t.timestamps
    end
  end

  def self.down
    drop_table :bb_auth_users
  end
end
