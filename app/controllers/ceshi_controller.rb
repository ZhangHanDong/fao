class CeshiController < ApplicationController
  #unicode asci 00-7F
  def testchar
    s = " 你好吗abc "
    a = s.split(/[a-z]/)
    l = s.chars.size
    ch = s.strip.split(/[a-zA-Z0-9]/)[0]
    chsize = ch.chars.size
    en = s.strip[ch.size..-1]
    re = /\w/i
    upack = s.chars.u_unpack.inspect
    render :text=>%Q!"你好吗"的长度是：#{l},unpack:#{upack},第一位：#{s[0]},#{s[1]},#{a.inspect},中文：#{ch},#{chsize}拼音：#{en}!
  end

  def formauthenticitytoken
    debugger
    render :text=>form_authenticity_token
  end

  def testpost
    r = params
    render :text=>request.raw_post
  end

  def testdb
    debugger
    offset = params[:offset]
    render :text=>"it's #{offset}"
  end


  def make_manifest
    d = File.expand_path(File.join(File.dirname(__FILE__),"../../public"))
#    dd = File.dirname(File.expand_path(File.join(File.dirname(__FILE__),"../../public")))
    a = []
    require 'find'
    Find.find(d) do |f|
      Find.prune if  f =~ /\/\./
      Find.prune if f.empty?
#      a << f
      b = f.split(d,2)[1]
      if(File.ftype(f) == "file" &&
            !(b =~ /^\/samples\//) &&
            !(b =~ /\/README$|\.cgi$/i))
        a << b 
      end
    end
#    a = a.select {|x|File.ftype(x) == "file"}
    File.open(File.join(d,"faomanifest.json"),"w") do |f|
      v = "1.0"
      f.write("{")
      f.write("\n")
      f.write(%Q!  "betaManifestVersion": 1,!)
      f.write("\n")
      f.write(%Q!  "version": "version #{v}",!)
      f.write("\n")
      f.write(%Q!  "entries": [!)
      f.write("\n")
      a.each do |fn|
          if fn == a.last
            f.write(%Q!      { "url": "#{fn}"}!)
          else
            f.write(%Q!      { "url": "#{fn}"},!)
          end
          f.write("\n")
      end
      f.write(%Q!    ]!)
      f.write("\n")
      f.write("}")
    end
    render :text=>a.inspect
  end

  def version_succ
    d = File.expand_path(File.join(File.dirname(__FILE__),"../../public"))
    f = File.join(d,"faomanifest.json")
    s1 = ""
    File.open(f,"r") do |inf|
      s = inf.read()
      s1 = s.sub(/(\d+\.\d{6})/) do |v|
        v.succ
      end
    end
    File.open(f,"w") do |ouf|
      ouf.write(s1)
    end
   render :text=>s1
  end

end
