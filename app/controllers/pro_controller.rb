# Dashboard section
class ProController < ApplicationController
  def income_ratio
  	@raw_data_summary = "test--test2"
  end

  def get_echart_data_income_ratio
  	puts "--> get_echart_data_income_ratio done." + CGI::unescape(params[:pa1])
  	# render json: CGI::unescape(params.to_json)
  	render json: CGI::unescape({
  		title: "进料合格率", 
  		x_month: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], 
  		y_billing_data: [95, 91, 99, 92, 88, 93, 95, 97, 98, 99, 98, 96]
  		}.to_json)
  end

  def outsourcing_ratio
  end

  def get_echart_data_outsourcing_ratio
    puts "--> get_echart_data_outsourcing_ratio done." + CGI::unescape(params[:pa1])
    # render json: CGI::unescape(params.to_json)
    render json: CGI::unescape({
      title: "外协加工符期率", 
      x_month: ["1月", "2月", "3月", "4月", "5月", "6月","7月", "8月", "9月", "10月", "11月", "12月"], 
      y_billing_data: [87, 91, 95, 89, 94, 93, 92, 95, 88, 93, 97, 99]
      }.to_json)
  end

end
