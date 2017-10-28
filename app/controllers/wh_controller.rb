# Dashboard section
class WhController < ApplicationController
  def details_compare_ratio
  	@raw_data_summary = "test--test2"
  end

  def get_echart_data_details_compare_ratio
  	puts "--> get_echart_data_details_compare_ratio done." + CGI::unescape(params[:pa1])
  	# render json: CGI::unescape(params.to_json)
  	render json: CGI::unescape({
  		title: "帐料相符率", 
  		x_month: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月"], 
  		y_billing_data: [89, 63, 95, 97, 95, 92, 88, 75, 91, 82, 90]
  		}.to_json)
  end

end
