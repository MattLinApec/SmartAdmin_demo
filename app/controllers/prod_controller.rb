# Dashboard section
class ProdController < ApplicationController
  def order_demand_ratio
  	@raw_data_summary = "test--test2"
  end

  def get_echart_data_order_demand_ratio
  	puts "--> get_echart_data_order_demand_ratio done." + CGI::unescape(params[:pa1])
  	# render json: CGI::unescape(params.to_json)
  	render json: CGI::unescape({
  		title: "订单达交率", 
  		x_month: ["7月", "8月", "9月", "10月", "11月", "12月"], 
  		y_billing_data: [80, 95, 69, 75, 94, 98]
  		}.to_json)
  end

  def order_delay
  end

  def get_echart_data_order_delay_ratio
    puts "--> get_echart_data_order_delay done." + CGI::unescape(params[:pa1])
    # render json: CGI::unescape(params.to_json)
    render json: CGI::unescape({
      title: "超期工单未结率", 
      x_month: ["7月", "8月", "9月", "10月", "11月", "12月"], 
      y_billing_data: [18, 12, 3, 11, 5, 13]
      }.to_json)
  end

end
