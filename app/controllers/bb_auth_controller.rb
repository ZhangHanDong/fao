#users table need three columns:id,auth_type,email(backcompact)
require 'md5'
class BbAuthController < ApplicationController
  skip_before_filter :deny_access
  before_filter :deny_access,:except=>[:index,:validate,:bb_success]
  
  def index
    base = "/WSLogin/V1/wslogin?appid=%s&ts=%s" % [M3958::CONFIG['yahoo_auth']['application_id'],Time.now.to_i]
    hash = MD5.new(base+M3958::CONFIG['yahoo_auth']['shared_secret'])
    @bbauth_url = "https://api.login.yahoo.com%s&sig=%s&send_userhash=1" % [base,hash]
  end

  # make your endpoint_url (Web Application URL) on the Yahoo! signup point to this action (http://webapp/login/validate)
  def validate
    uri = request.request_uri.match(/\?/) ? request.request_uri : request.request_uri + "?" + request.query_string
    uri = uri.gsub(/&sig=#{params[:sig]}/, '') + M3958::CONFIG['yahoo_auth']['shared_secret']
    tsdelta = Time.now.to_i - params[:ts].to_i
    @valid = (MD5.new(uri) == params[:sig] and params[:appid].to_s == M3958::CONFIG['yahoo_auth']['application_id'] and tsdelta<600)
    if @valid
      user = BbAuthUser.create("userhash"=>params[:userhash]) 
      #,"sync_allow"=>true)
      session[:user]=user
#      session['curdir'] = CurDir.new(user)
#      redirect_to :controller=>'upload',:action=>'listdir'
      render :action=>"bb_success"
    else
      flash[:notice] = "Problem with login from Yahoo!. Please try again."
      redirect_to :action => "index"
    end
  end

  def bb_success
    if(!session[:user])
#      session[:user] = BbAuthUser.new("userhash"=>"hello");
      redirect_to "/"
    end
  end


  # make your endpoint_url (Web Application URL) on the Yahoo! signup point to this action (http://webapp/login/validate)
  def myyahoo
    uri = request.request_uri.match(/\?/) ? request.request_uri : request.request_uri + "?" + request.query_string
    uri = uri.gsub(/&sig=#{params[:sig]}/, '') + M3958::CONFIG['yahoo_auth']['shared_secret']
    @valid = MD5.new(uri) == params[:sig] and params[:appid].to_s == M3958::CONFIG['yahoo_auth']['application_id']
    if @valid
      user = Tempuser.new(params[:userhash],params[:userhash])
      session['user']=user
      session['curdir'] = CurDir.new(user)
#      redirect_to :action=>'listdir'
#      session[:token]     = params[:token]
#      session[:userhash]  = params[:userhash]

      # redirect to a meaningful action here
#      flash[:notice] = "You have been signed in."
      redirect_to :controller=>'upload',:action=>'listdir'
    else
      flash[:notice] = "Problem with login from Yahoo!. Please try again."
      redirect_to :action => "index"
    end
  end  

  def logout
    reset_session
    redirect_to home_url
  end
end

