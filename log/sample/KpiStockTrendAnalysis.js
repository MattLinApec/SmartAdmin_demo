Ext.define('WebApp.view.kpiReport.KpiStockTrendAnalysis', {
    extend: 'Ext.container.Container',
    alias: ['widget.kpiReport.KpiStockTrendAnalysis'],
    // controller: "kpiReport.KpiStockTrendAnalysis",
    /*layout: "responsivecolumn",*/
    itemId: 'WebApp-view-kpiReport-KpiStockTrendAnalysis',
    param: {
        PARENTUUID: undefined
    },
    myStore: {

    },
    layout: 'vbox',
    fn: {
        show: function() {
            var myChart = echarts.init(document.getElementById('echart_stock_trend_analysis_summary'));
            myChart.showLoading();
            Pp.KpiReportAction.loadStockTrendAnalysis(function(self, jo) {
                var myChart = echarts.init(document.getElementById('echart_stock_trend_analysis_summary'));
                myChart.hideLoading();

                option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow', // 默认为可选为：'line' | 'shadow'
                            label: {
                                show: true
                            }
                        },
                        formatter: function(params) {
                            var res = '<div>' + params[0].name + '</div>'
                            if (params.length == 6) {
                                res += '' + params[0].seriesName + ': ' + params[0].data.toLocaleString('en') + '</br>';
                                res += '<div style="background-color:blue;">';
                                res += '' + params[1].seriesName + ': ' + params[1].data.toLocaleString('en') + '</br>';
                                res += '</div>';
                                res += '<div style="background-color:green;">';
                                res += '' + params[2].seriesName + ': ' + params[2].data.toLocaleString('en') + '</br>';
                                res += '' + params[3].seriesName + ': ' + params[3].data.toLocaleString('en') + '</br>';
                                res += '總庫存量: ' + (parseInt(params[2].data) + parseInt(params[3].data)).toLocaleString('en') + '</br>';
                                res += '</div>';
                                res += '<div style="background-color:red;">';
                                res += '' + params[4].seriesName + ': ' + params[4].data.toLocaleString('en') + '</br>';
                                res += '' + params[5].seriesName + ': ' + params[5].data.toLocaleString('en') + '</br>';
                                res += '總呆滯量: ' + (parseInt(params[4].data) + parseInt(params[5].data)).toLocaleString('en') + '</br>';
                                res += '</div>';
                            } else {
                                for (var i = 0; i < params.length; i++) {
                                    res += '' + params[i].seriesName + ': ' + params[i].data.toLocaleString('en') + '</br>';
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
                        data: ['總需求', '欠量', '庫存量', 'WIP量', '庫存呆滯量', 'WIP呆滯量'],
                        itemGap: 6
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
                        data: jo.result.data[0].x_month
                    }],
                    yAxis: [{
                        type: 'value',
                        name: 'PKG QTY',
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
                            start: 88,
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
                            name: '總需求',
                            type: 'line',
                            barGap: 0,
                            data: jo.result.data[0].v_requirement
                        },
                        {
                            name: '欠量',
                            type: 'line',
                            data: jo.result.data[0].v_stock_not_enought
                        },
                        {
                            name: '庫存量',
                            type: 'bar',
                            stack: 'cat_stock',
                            data: jo.result.data[0].v_stock_qty
                        },
                        {
                            name: 'WIP量',
                            type: 'bar',
                            stack: 'cat_stock',
                            data: jo.result.data[0].v_wip_qty
                        },
                        {
                            name: '庫存呆滯量',
                            type: 'bar',
                            stack: 'cat_slow_moving',
                            data: jo.result.data[0].v_slow_moving_stock
                        },
                        {
                            name: 'WIP呆滯量',
                            type: 'bar',
                            stack: 'cat_slow_moving',
                            data: jo.result.data[0].v_slow_moving_wip
                        }
                    ]
                };

                myChart.setOption(option);
            })

            myChart.on('click', function(params) {
                // 控制台打印数据的名称
                // console.log(params.name);                
                if (params.seriesName == '欠量' || params.seriesName == '庫存呆滯量' || params.seriesName == 'WIP呆滯量') {
                    var subWin = Ext.create('WebApp.window.system.KpiStockTrendDetail', { ym: params.name });
                    subWin.on('closeEvent', function(obj) {

                    });
                    subWin.param.data_ver = params.name;
                    subWin.param.data_cat = params.seriesName;
                    subWin.show();
                }
            });

        },
        show_wafer: function() {
            var myChart = echarts.init(document.getElementById('echart_wf_stock_trend_analysis_summary'));
            myChart.showLoading();
            Pp.KpiReportAction.loadWFStockTrendAnalysis(function(self, jo) {
                var myChart = echarts.init(document.getElementById('echart_wf_stock_trend_analysis_summary'));
                myChart.hideLoading();

                option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow', // 默认为可选为：'line' | 'shadow'
                            label: {
                                show: true
                            }
                        },
                        formatter: function(params) {
                            var res = '<div>' + params[0].name + '</div>'
                            if (params.length == 6) {
                                res += '' + params[0].seriesName + ': ' + params[0].data.toLocaleString('en') + '</br>';
                                res += '<div style="background-color:blue;">';
                                res += '' + params[1].seriesName + ': ' + params[1].data.toLocaleString('en') + '</br>';
                                res += '</div>';
                                res += '<div style="background-color:green;">';
                                res += '' + params[2].seriesName + ': ' + params[2].data.toLocaleString('en') + '</br>';
                                res += '' + params[3].seriesName + ': ' + params[3].data.toLocaleString('en') + '</br>';
                                res += '總庫存量: ' + (parseInt(params[2].data) + parseInt(params[3].data)).toLocaleString('en') + '</br>';
                                res += '</div>';
                                res += '<div style="background-color:red;">';
                                res += '' + params[4].seriesName + ': ' + params[4].data.toLocaleString('en') + '</br>';
                                res += '' + params[5].seriesName + ': ' + params[5].data.toLocaleString('en') + '</br>';
                                res += '總呆滯量: ' + (parseInt(params[4].data) + parseInt(params[5].data)).toLocaleString('en') + '</br>';
                                res += '</div>';
                            } else {
                                for (var i = 0; i < params.length; i++) {
                                    res += '' + params[i].seriesName + ': ' + params[i].data.toLocaleString('en') + '</br>';
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
                        data: ['總需求', '欠量', '庫存量', 'WIP量', '庫存呆滯量', 'WIP呆滯量'],
                        itemGap: 6
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
                        data: jo.result.data[0].x_month
                    }],
                    yAxis: [{
                        type: 'value',
                        name: 'Wafer QTY',
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
                            start: 88,
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
                            name: '總需求',
                            type: 'line',
                            barGap: 0,
                            data: jo.result.data[0].v_requirement
                        },
                        {
                            name: '欠量',
                            type: 'line',
                            data: jo.result.data[0].v_stock_not_enought
                        },
                        {
                            name: '庫存量',
                            type: 'bar',
                            stack: 'cat_stock',
                            data: jo.result.data[0].v_stock_qty
                        },
                        {
                            name: 'WIP量',
                            type: 'bar',
                            stack: 'cat_stock',
                            data: jo.result.data[0].v_wip_qty
                        },
                        {
                            name: '庫存呆滯量',
                            type: 'bar',
                            stack: 'cat_slow_moving',
                            data: jo.result.data[0].v_slow_moving_stock
                        },
                        {
                            name: 'WIP呆滯量',
                            type: 'bar',
                            stack: 'cat_slow_moving',
                            data: jo.result.data[0].v_slow_moving_wip
                        }
                    ]
                };

                myChart.setOption(option);
            })

            myChart.on('click', function(params) {
                // 控制台打印数据的名称
                // console.log(params.name);                
                if (params.seriesName == '欠量' || params.seriesName == '庫存呆滯量' || params.seriesName == 'WIP呆滯量') {
                    var subWin = Ext.create('WebApp.window.system.KpiWaferStockTrendDetail', { ym: params.name });
                    subWin.on('closeEvent', function(obj) {

                    });
                    subWin.param.data_ver = params.name;
                    subWin.param.data_cat = params.seriesName;
                    subWin.show();
                }
            });

        },
        show_epi: function() {
            var myChart = echarts.init(document.getElementById('echart_epi_stock_trend_analysis_summary'));
            myChart.showLoading();
            Pp.KpiReportAction.loadEPIStockTrendAnalysis(function(self, jo) {
                var myChart = echarts.init(document.getElementById('echart_epi_stock_trend_analysis_summary'));
                myChart.hideLoading();

                option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow', // 默认为可选为：'line' | 'shadow'
                            label: {
                                show: true
                            }
                        },
                        formatter: function(params) {
                            var res = '<div>' + params[0].name + '</div>'
                            if (params.length == 6) {
                                res += '' + params[0].seriesName + ': ' + params[0].data.toLocaleString('en') + '</br>';
                                res += '<div style="background-color:blue;">';
                                res += '' + params[1].seriesName + ': ' + params[1].data.toLocaleString('en') + '</br>';
                                res += '</div>';
                                res += '<div style="background-color:green;">';
                                res += '' + params[2].seriesName + ': ' + params[2].data.toLocaleString('en') + '</br>';
                                res += '' + params[3].seriesName + ': ' + params[3].data.toLocaleString('en') + '</br>';
                                res += '總庫存量: ' + (parseInt(params[2].data) + parseInt(params[3].data)).toLocaleString('en') + '</br>';
                                res += '</div>';
                                res += '<div style="background-color:red;">';
                                res += '' + params[4].seriesName + ': ' + params[4].data.toLocaleString('en') + '</br>';
                                res += '' + params[5].seriesName + ': ' + params[5].data.toLocaleString('en') + '</br>';
                                res += '總呆滯量: ' + (parseInt(params[4].data) + parseInt(params[5].data)).toLocaleString('en') + '</br>';
                                res += '</div>';
                            } else {
                                for (var i = 0; i < params.length; i++) {
                                    res += '' + params[i].seriesName + ': ' + params[i].data.toLocaleString('en') + '</br>';
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
                        data: ['總需求', '欠量', '庫存量', 'WIP量', '庫存呆滯量', 'WIP呆滯量'],
                        itemGap: 6
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
                        data: jo.result.data[0].x_month
                    }],
                    yAxis: [{
                        type: 'value',
                        name: 'EPI QTY',
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
                            start: 88,
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
                            name: '總需求',
                            type: 'line',
                            barGap: 0,
                            data: jo.result.data[0].v_requirement
                        },
                        {
                            name: '欠量',
                            type: 'line',
                            data: jo.result.data[0].v_stock_not_enought
                        },
                        {
                            name: '庫存量',
                            type: 'bar',
                            stack: 'cat_stock',
                            data: jo.result.data[0].v_stock_qty
                        },
                        {
                            name: 'WIP量',
                            type: 'bar',
                            stack: 'cat_stock',
                            data: jo.result.data[0].v_wip_qty
                        },
                        {
                            name: '庫存呆滯量',
                            type: 'bar',
                            stack: 'cat_slow_moving',
                            data: jo.result.data[0].v_slow_moving_stock
                        },
                        {
                            name: 'WIP呆滯量',
                            type: 'bar',
                            stack: 'cat_slow_moving',
                            data: jo.result.data[0].v_slow_moving_wip
                        }
                    ]
                };

                myChart.setOption(option);
            })

            myChart.on('click', function(params) {
                // 控制台打印数据的名称
                // console.log(params.name);                
                if (params.seriesName == '欠量' || params.seriesName == '庫存呆滯量' || params.seriesName == 'WIP呆滯量') {
                    var subWin = Ext.create('WebApp.window.system.KpiEPIStockTrendDetail', { ym: params.name });
                    subWin.on('closeEvent', function(obj) {

                    });
                    subWin.param.data_ver = params.name;
                    subWin.param.data_cat = params.seriesName;
                    subWin.show();
                }
            });

        }
    },
    initComponent: function() {
        this.items = [{
            xtype: 'panel',
            title: '成品庫存呆滯量趨勢變化 (總需求/欠量/呆滯量)(不含LD庫存)',
            //tools: [{ type: 'refresh' }, { type: 'help' }],
            //buttons: [{ text: 'Button 1' }],
            resizable: true,
            closable: true,
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
                    html: '<div id="echart_stock_trend_analysis_summary" style="height:530px;width:' + ((screen.width - 250) * .95) + 'px;">echart_stock_trend_analysis_summary</div>',
                    listeners: {
                        afterrender: function(self, eOpts) {
                            //alert(999)
                        }
                    }
                }]
            }]
        }, {
            xtype: 'panel',
            title: 'Wafer庫存呆滯量趨勢變化 (總需求/欠量/呆滯量)',
            //tools: [{ type: 'refresh' }, { type: 'help' }],
            //buttons: [{ text: 'Button 1' }],
            resizable: true,
            closable: true,
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
                    html: '<div id="echart_wf_stock_trend_analysis_summary" style="height:530px;width:' + ((screen.width - 250) * .95) + 'px;">echart_wf_stock_trend_analysis_summary</div>',
                    listeners: {
                        afterrender: function(self, eOpts) {
                            //alert(999)
                        }
                    }
                }]
            }]
        }, {
            xtype: 'panel',
            title: 'EPI庫存呆滯量趨勢變化 (總需求/欠量/呆滯量)',
            //tools: [{ type: 'refresh' }, { type: 'help' }],
            //buttons: [{ text: 'Button 1' }],
            resizable: true,
            closable: true,
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
                    html: '<div id="echart_epi_stock_trend_analysis_summary" style="height:530px;width:' + ((screen.width - 250) * .95) + 'px;">echart_epi_stock_trend_analysis_summary</div>',
                    listeners: {
                        afterrender: function(self, eOpts) {
                            //alert(999)
                        }
                    }
                }]
            }]
        }];
        this.callParent(arguments);
    },
    fnQuery: function(obj) {
        /*obj要是主體*/
        //alert(obj.down('#cmbApplication').getValue());
        Kpi.MenuAction.loadTreeRoot(obj.down('#cmbApplication').getValue(), function(data) {
            if (data.UUID != undefined) {
                var store = this.myStore.tree,
                    proxy = store.getProxy();
                proxy.setExtraParam('UUID', data.UUID);
                this.myStore.tree.load({
                    params: {
                        'UUID': data.UUID
                    },
                    callback: function() {
                        this.down('#AppMenuTree').expandAll();
                        WebApp.ux.util.tooltip.do();
                    },
                    scope: this
                });
            };
        }, obj);
    },
    listeners: {
        'show': function() {
            //this.fn.show();
        },
        'afterrender': function(obj, eOpts) {
            this.fn.show();
            this.fn.show_wafer();
            this.fn.show_epi();
        }
    }
});