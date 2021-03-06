﻿Ext.define("App.Recibos.View.Principal", {
    extend: "Ext.panel.Panel",
    alias: "widget.PanelPrincipal",
    width: 950,
    resizable: true,
    height: 550,
    frame: true,
    layout: 'border',
//    title: 'Adminsitracion Cortes',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        
       
        me.grid = Ext.create("App.Recibos.View.GridRecibos", {
            region: 'center',
            width: '100%',
            height: '100%'
        });
        this.items = [me.grid];
        this.callParent(arguments);
    }
});