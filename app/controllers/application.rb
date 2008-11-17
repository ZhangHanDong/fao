# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
#  before_filter :i_own_it

  # See ActionController::RequestForgeryProtection for details
  # Uncomment the :secret if you're not using the cookie session store
  protect_from_forgery # :secret => 'ab232d05c2f5e6044880f7a89df34472'
  
  # See ActionController::Base for details 
  # Uncomment this to filter the contents of submitted sensitive data parameters
  # from your application log (in this case, all fields with names like "password"). 
  # filter_parameter_logging :password
  protected

  def i_own_it
    if session[:user] and session[:user].userhash == params[:userhash]
      return true
    else
      render :json=>{"item"=>"","msg"=>"没有同步授权，请首先登录系统！"}
    end
  end
end
