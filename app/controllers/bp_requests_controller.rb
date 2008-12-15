class BpRequestsController < ApplicationController
  # GET /bp_requests
  # GET /bp_requests.xml
  def index
    @bp_requests = BpRequest.find(:all)
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @bp_requests }
    end
  end

  # GET /bp_requests/1
  # GET /bp_requests/1.xml
  def show
    @bp_request = BpRequest.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @bp_request }
    end
  end

  # GET /bp_requests/new
  # GET /bp_requests/new.xml
  def new
    @bp_request = BpRequest.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @bp_request }
    end
  end

  # GET /bp_requests/1/edit
  def edit
    @bp_request = BpRequest.find(params[:id])
  end

  # POST /bp_requests
  # POST /bp_requests.xml
  def create
    @bp_request = BpRequest.new(params[:bp_request])

    respond_to do |format|
      if @bp_request.save
        flash[:notice] = 'BpRequest was successfully created.'
        format.html { redirect_to(@bp_request) }
        format.xml  { render :xml => @bp_request, :status => :created, :location => @bp_request }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @bp_request.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /bp_requests/1
  # PUT /bp_requests/1.xml
  def update
    @bp_request = BpRequest.find(params[:id])

    respond_to do |format|
      if @bp_request.update_attributes(params[:bp_request])
        flash[:notice] = 'BpRequest was successfully updated.'
        format.html { redirect_to(@bp_request) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @bp_request.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /bp_requests/1
  # DELETE /bp_requests/1.xml
  def destroy
    @bp_request = BpRequest.find(params[:id])
    @bp_request.destroy

    respond_to do |format|
      format.html { redirect_to(bp_requests_url) }
      format.xml  { head :ok }
    end
  end

  def log_env
    bpr = BpRequest.first
    if bpr
      bpr.update_attributes(:envs=>request.env.to_json,
                            :params=>params.to_json,
                            :cookies=>cookies.to_json)
    else
      bpr = BpRequest.create(:envs=>request.env.to_json,
                            :params=>params.to_json,
                            :cookies=>cookies.to_json)
    end
    redirect_to(:action=>:show_log_env,:id=>1)
  end

  def show_log_env
    bpr = BpRequest.first
    require 'json'
    @bp_envs = ActiveSupport::JSON.parse(bpr.envs)
    @bp_params = ActiveSupport::JSON.parse(bpr.params)
    @bp_cookies = ActiveSupport::JSON.parse(bpr.cookies)
  end

end
