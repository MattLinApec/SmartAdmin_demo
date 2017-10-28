# Dashboard section
class MfgController < ApplicationController
  def plan_completed_ratio
  	@raw_data_summary = "test--test2"
  end

  def get_echart_data_plan_completed_ratio
  	puts "--> get_echart_data_plan_completed_ratio done." + CGI::unescape(params[:pa1])
  	# render json: CGI::unescape(params.to_json)
  	render json: CGI::unescape({
  		title: "生产计划完成率", 
  		x_month: ["7月", "8月", "9月", "10月", "11月", "12月"], 
  		y_billing_data: [89, 63, 95, 97, 95, 92]
  		}.to_json)
  end

end
