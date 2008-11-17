class BbAuthUsersController < ApplicationController
  # GET /bb_auth_users
  # GET /bb_auth_users.xml
  def index
    @bb_auth_users = BbAuthUser.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @bb_auth_users }
    end
  end

  # GET /bb_auth_users/1
  # GET /bb_auth_users/1.xml
  def show
    @bb_auth_user = BbAuthUser.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @bb_auth_user }
    end
  end

  # GET /bb_auth_users/new
  # GET /bb_auth_users/new.xml
  def new
    @bb_auth_user = BbAuthUser.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @bb_auth_user }
    end
  end

  # GET /bb_auth_users/1/edit
  def edit
    @bb_auth_user = BbAuthUser.find(params[:id])
  end

  # POST /bb_auth_users
  # POST /bb_auth_users.xml
  def create
    @bb_auth_user = BbAuthUser.new(params[:bb_auth_user])

    respond_to do |format|
      if @bb_auth_user.save
        flash[:notice] = 'BbAuthUser was successfully created.'
        format.html { redirect_to(@bb_auth_user) }
        format.xml  { render :xml => @bb_auth_user, :status => :created, :location => @bb_auth_user }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @bb_auth_user.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /bb_auth_users/1
  # PUT /bb_auth_users/1.xml
  def update
    @bb_auth_user = BbAuthUser.find(params[:id])

    respond_to do |format|
      if @bb_auth_user.update_attributes(params[:bb_auth_user])
        flash[:notice] = 'BbAuthUser was successfully updated.'
        format.html { redirect_to(@bb_auth_user) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @bb_auth_user.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /bb_auth_users/1
  # DELETE /bb_auth_users/1.xml
  def destroy
    @bb_auth_user = BbAuthUser.find(params[:id])
    @bb_auth_user.destroy

    respond_to do |format|
      format.html { redirect_to(bb_auth_users_url) }
      format.xml  { head :ok }
    end
  end
end
