# Dashboard section
class FinController < ApplicationController
  def expense_amount
  	@raw_data_summary = "test--test2"
  end

  def get_echart_data_expense_amount
  	puts "--> get_echart_data_expense_amount done." + CGI::unescape(params[:pa1])
  	# render json: CGI::unescape(params.to_json)
  	render json: CGI::unescape({
  		title: "实际费用金额", 
  		x_month: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月"], 
  		y_billing_data: [150, 178, 160, 152, 131, 143, 161, 180, 240, 200, 400]
  		}.to_json)
  end

end
