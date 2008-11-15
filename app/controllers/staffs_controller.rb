class StaffsController < ApplicationController
  # GET /staffs
  # GET /staffs.xml
  def index
    @staffs = Staff.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @staffs }
    end
  end

  # GET /staffs/1
  # GET /staffs/1.xml
  def show
    @staff = Staff.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @staff }
    end
  end

  # GET /staffs/new
  # GET /staffs/new.xml
  def new
    @staff = Staff.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @staff }
    end
  end

  # GET /staffs/1/edit
  def edit
    @staff = Staff.find(params[:id])
  end

  # POST /staffs
  # POST /staffs.xml
  def create
    @staff = Staff.new(params[:staff])

    respond_to do |format|
      if @staff.save
        flash[:notice] = 'Staff was successfully created.'
        format.html { redirect_to(@staff) }
        format.xml  { render :xml => @staff, :status => :created, :location => @staff }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @staff.errors, :status => :unprocessable_entity }
      end
    end
  end


  # POST /staffs
  # POST /staffs.xml
  def syncreate
    require 'json'
    sd_raw = request.raw_post
    sd = JSON.parse(sd_raw)
    item = sd["item"]
    item.delete("otype")
    debugger
      case item["sync_state"]
      when "new" 
        @staff = Staff.new(item)
        @staff.id = item["id"]
        @staff.sync_state = "synchronized"
        begin
          if @staff.save
            render :text=>sd_raw 
          else
            render :json=>{"item"=>"","msg"=>"保存失败"}
          end
        rescue
            render :json=>{"item"=>"","msg"=>"插入异常"}
        end
      else
        @staff = Staff.find_by_id(item["id"])
        if @staff
          item["sync_state"] = "synchronized"
          if @staff.update_attributes(item)
            render :text=>sd_raw 
          else
              render :json=>{"item"=>"","msg"=>"保存失败"}
          end
        else
          @staff = Staff.new(item)
          @staff.id = item["id"]
          @staff.sync_state = "synchronized"
          begin
            if @staff.save
              render :text=>sd_raw 
            else
              render :json=>{"item"=>"","msg"=>"保存失败"}
            end
          rescue
              render :json=>{"item"=>"","msg"=>"插入异常"}
          end
        end
      end
  end

  # PUT /staffs/1
  # PUT /staffs/1.xml
  def update
    @staff = Staff.find(params[:id])

    respond_to do |format|
      if @staff.update_attributes(params[:staff])
        flash[:notice] = 'Staff was successfully updated.'
        format.html { redirect_to(@staff) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @staff.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /staffs/1
  # DELETE /staffs/1.xml
  def destroy
    @staff = Staff.find(params[:id])
    @staff.destroy

    respond_to do |format|
      format.html { redirect_to(staffs_url) }
      format.xml  { head :ok }
    end
  end

  protected
  
  def mint2time(i)
    Time.at(i/1000,i%1000)
  end

end
