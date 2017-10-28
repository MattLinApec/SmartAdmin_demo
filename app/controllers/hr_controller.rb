# Dashboard section
class HrController < ApplicationController
  def hire_ratio
  	@raw_data_summary = "test--test2"
  end

  def get_echart_data_hire_ratio
  	puts "--> get_echart_data_hire_ratio done." + CGI::unescape(params[:pa1])
  	# render json: CGI::unescape(params.to_json)
  	render json: CGI::unescape({
  		title: "招聘及时率", 
  		x_month: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月"], 
  		y_billing_data: [68, 61, 73, 69, 78, 81, 85, 79, 88, 91, 92]
  		}.to_json)
  end

end
