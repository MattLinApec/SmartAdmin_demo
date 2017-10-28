Ext.define('WebApp.view.kpiReport.KpiSalesTarget', {
    extend: 'Ext.container.Container',
    alias: ['widget.kpiReport.KpiSalesTarget'],
    // controller: "kpiReport.KpiSalesTarget",
    /*layout: "responsivecolumn",*/
    itemId: 'WebApp-view-kpiReport-KpiSalesTarget',
    param: {
        PARENTUUID: undefined
    },
    myStore: {

    },
    layout: 'vbox',
    fn: {
        show: function() {
            var myChart = echarts.init(document.getElementById('echart_sales_target'));
            myChart.showLoading();
            Pp.KpiReportAction.loadSalesTarget(function(self, jo) {
                var myChart = echarts.init(document.getElementById('echart_sales_target'));
                myChart.hideLoading();

                option = {
                    title: {
                        text: '2017'
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
                        data: ['BP董事會', 'BP業務', 'BILLING', 'LRD', 'LSD'],
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
                        data: jo.result.data[0].x_month
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
                            data: jo.result.data[0].v_lrd_billing
                        },
                        {
                            name: 'BILLING',
                            type: 'bar',
                            stack: 'cat_lsd',
                            data: jo.result.data[0].v_lsd_billing
                        }, {
                            name: 'LRD',
                            type: 'bar',
                            stack: 'cat_lrd',
                            data: jo.result.data[0].v_lrd
                        },
                        {
                            name: 'LSD',
                            type: 'bar',
                            stack: 'cat_lsd',
                            data: jo.result.data[0].v_lsd
                        },
                        {
                            name: 'BP董事會',
                            type: 'line',
                            data: jo.result.data[0].v_bp_bod
                        },
                        {
                            name: 'BP業務',
                            type: 'line',
                            data: jo.result.data[0].v_bp_sales
                        }
                    ]
                };

                myChart.setOption(option);
            })

            myChart.on('click', function(params) {
                // 控制台打印数据的名称
                // console.log(params.name);
                if (params.seriesName == 'LSD') {
                    var subWin = Ext.create('WebApp.window.system.KpiLSDBottleNeck', { ym: params.name });
                    subWin.on('closeEvent', function(obj) {

                    });
                    subWin.param.yearmonth = params.name;
                    subWin.show();
                    // Pp.KpiReportAction.loadBottleNeck_by_yyyymm(params.name, function(self, jo) {
                    //     var pie_Chart = echarts.init(document.getElementById('echart_lsd_by_click'));
                    //     option = {
                    //         title: {
                    //             text: 'LSD BOTTLE NECK',
                    //             subtext: params.name,
                    //             x: 'center'
                    //         },
                    //         tooltip: {
                    //             trigger: 'item',
                    //             formatter: "{b} : {c} ({d}%)"
                    //         },
                    //         legend: {
                    //             orient: 'vertical',
                    //             left: 'left',
                    //             data: jo.result.data[0].data_cat
                    //         },
                    //         series: [{
                    //             name: 'lsd_bottle_neck',
                    //             type: 'pie',
                    //             radius: '70%',
                    //             center: ['50%', '60%'],
                    //             data: jo.result.data[0].data_list,
                    //             itemStyle: {
                    //                 emphasis: {
                    //                     shadowBlur: 10,
                    //                     shadowOffsetX: 0,
                    //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                    //                 }
                    //             }
                    //         }]
                    //     };

                    //     pie_Chart.setOption(option);
                    // })

                } else if (params.seriesName == 'LRD') {

                }
            });

        }
    },
    initComponent: function() {
        this.items = [{
            xtype: 'panel',
            title: '業績達成率',
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
                        html: '<div id="echart_sales_target" style="height:500px;width:' + ((screen.width - 250) * .95) + 'px;">echart_sales_target</div>',
                        listeners: {
                            afterrender: function(self, eOpts) {
                                //alert(999)
                            }
                        }
                    }
                    // , {
                    //     xtype: "panel",
                    //     flex: 1,
                    //     html: [
                    //         '<div id="echart_lsd_by_click1" style="height:500px;width:' + ((screen.width - 250) * .95) + 'px;">echart_lsd_by_click</div>',
                    //     ].join(' ')

                    // }
                ]
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
        }
    }
});