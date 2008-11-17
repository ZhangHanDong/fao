class BbAuthUser < ActiveRecord::Base
  has_many :staffs,:foreign_key=>:userhash
  has_many :staffds,:foreign_key=>:userhash
  has_many :activities,:foreign_key=>:userhash

end
