class Activity < ActiveRecord::Base
  has_many :staffds
  has_many :staffs,:through=>:staffds
  
  def before_create
    tmp_activity = Activity.find_by_sql("select UUID()")
    self.id = tmp_activity[0]["UUID()"].gsub("-","")
  end
end
