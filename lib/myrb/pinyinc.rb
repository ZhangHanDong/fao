require 'iconv'
require 'jcode'
$KCODE="UTF8"

def myputs(s)
  s1 = Iconv.iconv("cp936","utf-8",s)
  puts s1
end

char_hash = {}


#File.open("c:/pinyin_single.txt","w") do |outf|
  File.open("c:/pinyin.txt","r") do |f|
    f.each do |j|
      l = j.strip
      a = l.split(/[a-z]/)
      ch = a[0]
      if ch && ch.jsize == 1 && ch.mbchar?
        py = l[ch.size..-1]
        if char_hash.has_key?(ch)
          newpy = char_hash[ch] + " " + py
          char_hash[ch] = newpy.split.uniq.join(' ')
        else
          char_hash[ch] = py
        end
#        outf.write(%Q!"#{ch},#{py}",!)
      end
    end
  end
#end

puts char_hash.size


File.open("c:/pinyin_single.txt","w") do |outf|
  char_hash.each_pair do |key,value|
    outf.write(%Q!"#{key},#{value}",!)
  end
end
