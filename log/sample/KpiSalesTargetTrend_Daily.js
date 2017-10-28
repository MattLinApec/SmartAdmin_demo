Ext.define('WebApp.view.kpiReport.KpiSalesTargetTrend_Daily', {
    extend: 'Ext.container.Container',
    alias: ['widget.kpiReport.KpiSalesTargetTrend_Daily'],
    // controller: "kpiReport.KpiSalesTargetTrend_Daily",
    /*layout: "responsivecolumn",*/
    itemId: 'WebApp-view-kpiReport-KpiSalesTargetTrend_Daily',
    param: {
        PARENTUUID: undefined
    },
    myStore: {

    },
    layout: 'vbox',
    fn: {
        show: function() {
            for (var j = 0; j <= 3; j++) {
                var myChart_m = echarts.init(document.getElementById('echart_sales_target_trend_daily_m_' + j.toString()));
                myChart_m.showLoading();
            }
            Pp.KpiReportAction.loadSalesTargetTrendDailySummary(function(self, jo) {
                for (var i = 0; i <= 3; i++) {
                    var myChart_m = echarts.init(document.getElementById('echart_sales_target_trend_daily_m_' + i.toString()));
                    myChart_m.hideLoading();

                    option = {
                        title: {
                            text: jo.result.data[i].target_month
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow' // 默认为可选为：'line' | 'shadow'                                
                            },
                            formatter: function(params) {
                                var res = '<div>' + params[0].name + '</div>'

                                if (params.length == 4) {
                                    for (var i = 1; i < params.length; i++) {
                                        res += '' + params[i].seriesName + ': ' + params[i].data.toLocaleString('en') + '</br>'
                                    }
                                    res += '差異: ' + (parseInt(params[2].data) - parseInt(params[3].data)).toLocaleString('en') + '</br>';
                                } else {
                                    for (var i = 0; i < params.length; i++) {
                                        res += '' + params[i].seriesName + ': ' + params[i].data.toLocaleString('en') + '</br>'
                                    }
                                }
                                return res;
                            }
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark: { show: true },
                                dataView: { show: true, readOnly: false },
                                magicType: { show: true, type: ['line', 'bar'] },
                                restore: { show: true },
                                saveAsImage: { show: true }
                            }
                        },
                        calculable: true,
                        legend: {
                            data: ['BILLING', 'LRD', 'LSD'],
                            itemGap: 4
                        },
                        grid: {
                            top: '12%',
                            left: '1%',
                            right: '10%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            axisLabel: { 'interval': 0 },
                            //name: 'Month',
                            data: jo.result.data[0].x_day
                        }],
                        yAxis: [{
                            type: 'value',
                            name: 'Amount (TWD)',
                            axisLabel: {
                                formatter: function(a) {
                                    a = +a;
                                    return isFinite(a) ?
                                        echarts.format.addCommas(+a / 1000) + 'K' : '';
                                }
                            }
                        }],
                        dataZoom: [{
                                show: true,
                                start: 0,
                                end: 100
                            },
                            {
                                type: 'inside',
                                start: 0,
                                end: 100
                            },
                            {
                                show: true,
                                yAxisIndex: 0,
                                filterMode: 'empty',
                                width: 30,
                                height: '80%',
                                showDataShadow: false,
                                left: '93%'
                            }
                        ],
                        series: [{
                                name: 'BILLING',
                                type: 'bar',
                                stack: 'cat_lrd',
                                barGap: 0,
                                data: jo.result.data[i].v_lrd_billing
                            },
                            {
                                name: 'BILLING',
                                type: 'bar',
                                stack: 'cat_lsd',
                                data: jo.result.data[i].v_lsd_billing
                            }, {
                                name: 'LRD',
                                type: 'bar',
                                stack: 'cat_lrd',
                                data: jo.result.data[i].v_lrd
                            },
                            {
                                name: 'LSD',
                                type: 'bar',
                                stack: 'cat_lsd',
                                data: jo.result.data[i].v_lsd
                            }
                        ]
                    };

                    myChart_m.setOption(option);

                    myChart_m.on('click', function(params) {
                        if (params.seriesName == 'LSD' || params.seriesName == 'LRD') {
                            var subWin = Ext.create('WebApp.window.system.Kpi2DayDiff', { ym: params.name });
                            subWin.on('closeEvent', function(obj) {

                            });
                            subWin.param.yearmonth = params.name;
                            subWin.param.chart_type = params.seriesName;
                            subWin.param.target_month = this.getOption().title[0].text;
                            subWin.title = this.getOption().title[0].text + ' ' + params.seriesName + '最近兩日未結差異';
                            subWin.show();
                        }
                    });
                }

            })

        }
    },
    initComponent: function() {
        this.items = [{
                xtype: 'panel',
                title: 'LRD/LSD趨勢 M',
                //tools: [{ type: 'refresh' }, { type: 'help' }],
                //buttons: [{ text: 'Button 1' }],
                //resizable: true,
                //closable: true,
                collapsible: true,
                icon: './css/images/menu16x16.png',
                frame: true,
                layout: 'vbox',
                autoScroll: true,
                autoHeight: true,
                //height: 1200,
                autoWidth: true,
                items: [{
                    xtype: 'container',
                    layout: 'fit',

                    margin: 5,

                    items: [{
                        xtype: "panel",
                        flex: 1,
                        //width:'100%',
                        html: '<div id="echart_sales_target_trend_daily_m_0" style="height:500px;width:' + ((screen.width - 250) * .95) + 'px;">echart_sales_target_trend_daily M</div>',
                        listeners: {
                            afterrender: function(self, eOpts) {
                                //alert(999)
                            }
                        }
                    }]
                }]
            },
            {
                xtype: 'panel',
                title: 'LRD/LSD趨勢 M+1',
                //tools: [{ type: 'refresh' }, { type: 'help' }],
                //buttons: [{ text: 'Button 1' }],
                //resizable: true,
                //closable: true,
                collapsible: true,
                icon: './css/images/menu16x16.png',
                frame: true,
                layout: 'vbox',
                autoScroll: true,
                autoHeight: true,
                //height: 1200,
                autoWidth: true,
                items: [{
                    xtype: 'container',
                    layout: 'fit',

                    margin: 5,

                    items: [{
                        xtype: "panel",
                        flex: 1,
                        html: '<div id="echart_sales_target_trend_daily_m_1" style="height:500px;width:' + ((screen.width - 250) * .95) + 'px;">echart_sales_target_trend_daily M+1</div>',
                    }]
                }]
            },
            {
                xtype: 'panel',
                title: 'LRD/LSD趨勢 M+2',
                //tools: [{ type: 'refresh' }, { type: 'help' }],
                //buttons: [{ text: 'Button 1' }],
                //resizable: true,
                //closable: true,
                collapsible: true,
                icon: './css/images/menu16x16.png',
                frame: true,
                layout: 'vbox',
                autoScroll: true,
                autoHeight: true,
                //height: 1200,
                autoWidth: true,
                items: [{
                    xtype: 'container',
                    layout: 'fit',

                    margin: 5,

                    items: [{
                        xtype: "panel",
                        flex: 1,
                        html: '<div id="echart_sales_target_trend_daily_m_2" style="height:500px;width:' + ((screen.width - 250) * .95) + 'px;">echart_sales_target_trend_daily M+2</div>',
                    }]
                }]
            },
            {
                xtype: 'panel',
                title: 'LRD/LSD趨勢 M+3',
                //tools: [{ type: 'refresh' }, { type: 'help' }],
                //buttons: [{ text: 'Button 1' }],
                //resizable: true,
                //closable: true,
                collapsible: true,
                icon: './css/images/menu16x16.png',
                frame: true,
                layout: 'vbox',
                autoScroll: true,
                autoHeight: true,
                //height: 1200,
                autoWidth: true,
                items: [{
                    xtype: 'container',
                    layout: 'fit',

                    margin: 5,

                    items: [{
                        xtype: "panel",
                        flex: 1,
                        html: '<div id="echart_sales_target_trend_daily_m_3" style="height:500px;width:' + ((screen.width - 250) * .95) + 'px;">echart_sales_target_trend_daily M+3</div>',
                    }]
                }]
            }
        ];
        this.callParent(arguments);
    },
    listeners: {
        'show': function() {
            //this.fn.show();
        },
        'afterrender': function(obj, eOpts) {
            this.fn.show();
        }
    }
});