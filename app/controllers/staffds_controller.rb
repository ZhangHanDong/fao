class StaffdsController < ApplicationController
  # GET /staffds
  # GET /staffds.xml
  def index
    if params[:activity_id]
      @activity = Activity.find(params[:activity_id])
      @staffds = @activity.staffds
    else
      @staffds = Staffd.find(:all)
    end
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @staffds }
    end
  end

  #GET /staffds/abouttoparticipate
  def abouttoparticipate
    @staffds = Staffd.all
    @activity = Activity.find(params[:activity_id])
  end

  #PUT /staffd/1/parcitipate
  def participate
    @activity = Activity.find(params[:activity_id])
    @staffd = Staffd.find(params[:id])
    @activity.staffds << @staffd
  end

  # GET /staffds/1
  # GET /staffds/1.xml
  def show
    @staffd = Staffd.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @staffd }
    end
  end

  # GET /staffds/new
  # GET /staffds/new.xml
  def new
    @staffd = Staffd.new
    @staffd.staff_id = params[:staff_id]
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @staffd }
    end
  end

  # GET /staffds/1/edit
  def edit
    @staffd = Staffd.find(params[:id])
  end

  # POST /staffds
  # POST /staffds.xml
  def create
    @staffd = Staffd.new(params[:staffd])

    respond_to do |format|
      if @staffd.save
        flash[:notice] = 'Staffd was successfully created.'
        format.html { redirect_to(@staffd) }
        format.xml  { render :xml => @staffd, :status => :created, :location => @staffd }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @staffd.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /staffds/1
  # PUT /staffds/1.xml
  def update
    @staffd = Staffd.find(params[:id])

    respond_to do |format|
      if @staffd.update_attributes(params[:staffd])
        flash[:notice] = 'Staffd was successfully updated.'
        format.html { redirect_to(@staffd) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @staffd.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /staffds/1
  # DELETE /staffds/1.xml
  def destroy
    @staffd = Staffd.find(params[:id])
    @staffd.destroy

    respond_to do |format|
      format.html { redirect_to(staffds_url) }
      format.xml  { head :ok }
    end
  end
end
