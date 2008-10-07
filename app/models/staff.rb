class Staff < ActiveRecord::Base
  has_many :staffds
  has_many :activities,:through=>:staffds
  def before_create
    tmp_staff = Staff.find_by_sql("select UUID()")
    self.id = tmp_staff[0]["UUID()"].gsub("-","")
  end
end
