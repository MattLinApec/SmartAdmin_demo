/*columns 使用default*/
Ext.define('WebApp.window.system.KpiLSDBottleNeck', {
    extend: 'Ext.window.Window',
    title: 'LSD Bottle Neck View Page',
    //closeAction: 'destroy',
    icon: SYSTEM_URL_ROOT + '/css/custImages/box_add_16px_583299_easyicon.net.png',
    //requires: ['ApecWMS.direct.System'],
    closable: true,
    param: {
        yearmonth: undefined
    },
    width: 700,
    height: 600,
    resizable: false,
    draggable: true,
    layout: 'fit',
    myStore: {},
    fn: {
        show: function(scope) {
            var pie_Chart = echarts.init(document.getElementById('echart_lsd_by_click'));
            pie_Chart.showLoading();
            var lsd_yyyymm = scope.param.yearmonth;
            Pp.KpiReportAction.loadBottleNeck_by_yyyymm(lsd_yyyymm, function(self, jo, a, b) {
                var pie_Chart = echarts.init(document.getElementById('echart_lsd_by_click'));
                pie_Chart.hideLoading();
                option = {
                    title: {
                        text: 'LSD BOTTLE NECK',
                        subtext: lsd_yyyymm,
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        //formatter: "{b} : {c} ({d}%)"
                        formatter: function(params) {
                            var res = ''
                            res += params.name + ' : ' + params.value.toLocaleString('en') + ' ( ' + params.percent + ' %)'
                            return res;
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: jo.result.data[0].data_cat
                    },
                    series: [{
                        name: 'lsd_bottle_neck',
                        type: 'pie',
                        radius: '70%',
                        center: ['50%', '60%'],
                        data: jo.result.data[0].data_list,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                };

                pie_Chart.setOption(option);
            });
        }
    },
    initComponent: function() {
        this.items = [{
            xtype: 'panel',
            //icon: './css/images/menu16x16.png',
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
                    html: [
                        '<div id="echart_lsd_by_click" style="height:500px;width:' + ((700) * .95) + 'px;">echart_lsd_by_click</div>',
                    ].join(' ')

                }]
            }]
        }];
        this.callParent(arguments);
    },
    closeEvent: function() {
        this.fireEvent('closeEvent', this);
    },
    listeners: {
        'show': function() {
            //this.fn.show(this);
        },
        'afterrender': function(obj, eOpts) {
            this.fn.show(this);
            Ext.getBody().mask();
        },
        'close': function() {
            this.closeEvent();
            Ext.getBody().unmask();
        }
    }
});