# Dashboard section
class DashboardController < ApplicationController
  def analytics
  	@raw_data_summary = "test--test2"
  end

  def get_chart_data
  	puts "--> get_chart_data done." + CGI::unescape(params[:pa1])
  	# render json: CGI::unescape(params.to_json)
  	render json: CGI::unescape({title:"雪高跟66", x_data:["衬衫7", "羊毛衫7", "雪纺衫7", "裤子7", "高跟鞋7", "袜子7"], y1_data:[125, 30, 46, 20, 30, 40]}.to_json)
  end

end
