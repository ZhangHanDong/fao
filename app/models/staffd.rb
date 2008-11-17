class Staffd < ActiveRecord::Base
  has_and_belongs_to_many :activities,:uniq=>true
  
#  def before_create
#    tmp_staffd = Staffd.find_by_sql("select UUID()")
#    self.id = tmp_staffd[0]["UUID()"].gsub("-","")
#  end
end
