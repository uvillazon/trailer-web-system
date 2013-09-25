Ext.define("App.OrdenesProduccion.View.Principal", {
    extend: "Ext.panel.Panel",
    alias: "widget.PanelPrincipal",
    width: 950,
    resizable: true,
    height: 550,
    frame: true,
    layout: 'border',
    
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;

        me.grid = Ext.create("App.OrdenesProduccion.View.GridOrdenesProduccion", {
            width: 450,
            height: 450,
            region : 'west',
        });
        me.FormOrden = Ext.create("App.OrdenesProduccion.View.FormOrdenProduccion",{height: 500});
        me.FormOrden.Bloquear();

        me.gridDetalle = Ext.create("App.OrdenesProduccion.View.GridDetalle");
        //me.detalle = Ext.create('App.OrdenesProduccion.View.PanelDetalle');
       // me.gridDetalle.add(me.detalle);
      
        me.tabpanelIngreso = Ext.create("App.Utils.TabPanel", {
            width: 500,
            height: 500,
            region : 'center',
            items: [me.FormOrden, me.gridDetalle]
        })


        this.items = [me.grid, me.tabpanelIngreso];
        me.grid.on('cellclick', me.CargarDatos, this);
        this.callParent(arguments);
    },
    CargarDatos : function(grid, cell, col, record){
        var me = this;
        me.FormOrden.loadRecord(record);
        me.gridDetalle.CargarDatos(record);
       

    },
     Recargar: function () {
        var me = this;
        alert('cargando Store ');
        me.grid.getStore().load();
    }   
});