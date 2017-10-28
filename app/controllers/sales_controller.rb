# Dashboard section
class SalesController < ApplicationController
  def billing
  	@raw_data_summary = "test--test2"
  end

  def get_echart_data_billing
  	puts "--> get_billing_data_echart done." + CGI::unescape(params[:pa1])
  	# render json: CGI::unescape(params.to_json)
  	render json: CGI::unescape({
  		title: "实际营业金额", 
  		x_month: ["7月", "8月", "9月", "10月", "11月", "12月"], 
  		y_billing_data: [780, 1250, 1100, 330, 670, 990]
  		}.to_json)
  end

end
