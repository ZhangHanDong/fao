class CreateActivitiesStaffds < ActiveRecord::Migration
  def self.up
    create_table :activities_staffds,:id=>false,:options => 'ENGINE=InnoDB DEFAULT CHARSET=utf8'  do |t|
      t.string :activity_id,:staffd_id
      t.string :sync_state,:default=>'new'
    end
    add_index :activities_staffds,[:activity_id,:staffd_id],:unique=>true
  end

  def self.down
    drop_table :activities_staffds
  end
end
