index_file = File.join(File.dirname(__FILE__),"../public/index.html")
index_file_bak = File.join(File.dirname(__FILE__),"../public/index.html.bakk")
before_test_block,test_block,after_test_block = "","","" 
open(index_file,"r") do |f|
  s = f.read
  before_test_block,test_block,after_test_block = s.split("---yuiTestBlock---")
  open(index_file_bak,"w") do |ff|
    ff.write(s)
  end
end

open(index_file,"w") do |f|
  f.write(before_test_block)
  f.write(after_test_block)
end

