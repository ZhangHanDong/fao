class StaffsController < ApplicationController
  before_filter :i_own_it,:only=>[:sync_downstream]
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

  #get synget
  def synget
    omap = {"staffs"=>Staff,"staffds"=>Staffd,"activities"=>Activity}
    records = omap[params[:table]].find_all_by_userhash(params[:userhash],:order=>params[:orderby],:limit=>params[:limit],:offset=>params[:offset])
    items = []
    records.each do |record|
      rh = record.attributes
      rh.delete("update_at")
      rh.delete("create_at")
      rh.each do |key,value|
        if value.class == Date
          rh[key] = value.year.to_s + "-" + value.month.to_s + "-" + value.mday.to_s
        end
      end
      items << rh
    end
    count = omap[params[:table]].count_by_sql("select count(*) from #{params[:table]} where userhash = '#{params[:userhash]}'");
    render :json=>{"items"=>items,"total"=>count,"msg"=>items.to_json}
  end

  # POST /syncreate
  def syncreate
    require 'json'
    sd_raw = request.raw_post
    sd = JSON.parse(sd_raw)
    item = sd["item"]
    table = item.delete("otype")
    case table
    when "staffs"
      case item["sync_state"]
      when "deleted"
        @staff = Staff.find_by_id(item["id"]);
        @staff.destroy if @staff
        render :text=>sd_raw
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
    when "activities"
      case item["sync_state"]
      when "deleted"
        @activity = Activity.find_by_id(item["id"]);
        @activity.destroy if @activity
        render :text=>sd_raw
      else
        @activity = Activity.find_by_id(item["id"])
        if @activity
          item["sync_state"] = "synchronized"
          if @activity.update_attributes(item)
            render :text=>sd_raw 
          else
              render :json=>{"item"=>"","msg"=>"保存失败"}
          end
        else
          @activity = Activity.new(item)
          @activity.id = item["id"]
          @activity.sync_state = "synchronized"
          begin
            if @activity.save
              render :text=>sd_raw 
            else
              render :json=>{"item"=>"","msg"=>"保存失败"}
            end
          rescue
              render :json=>{"item"=>"","msg"=>"插入异常"}
          end
        end
      end
    when "staffds"
      case item["sync_state"]
      when "deleted"
        @staffd = Staffd.find_by_id(item["id"]);
        @staffd.destroy if @staffd
        render :text=>sd_raw
      else
        @staffd = Staffd.find_by_id(item["id"])
        if @staffd
          item["sync_state"] = "synchronized"
          if @staffd.update_attributes(item)
            render :text=>sd_raw 
          else
              render :json=>{"item"=>"","msg"=>"保存失败"}
          end
        else
          @staffd = Staffd.new(item)
          @staffd.id = item["id"]
          @staffd.sync_state = "synchronized"
          begin
            if @staffd.save
              render :text=>sd_raw 
            else
              render :json=>{"item"=>"","msg"=>"保存失败"}
            end
          rescue
              render :json=>{"item"=>"","msg"=>"插入异常"}
          end
        end
      end
    else
      render :json=>{"item"=>"","msg"=>"尝试插入未知对象错误！"}
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
