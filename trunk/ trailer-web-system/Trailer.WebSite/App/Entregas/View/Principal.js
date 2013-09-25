Ext.define("App.Entregas.View.Principal", {
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
            width: '40%',
            height: 500
        });
        me.gridEntrega = Ext.create("App.Entregas.View.GridEntregas");
        me.FormEntrega = Ext.create("App.Entregas.View.FormEntrega",{height: 500});
        me.FormEntrega.Bloquear();
        me.gridDetalleEntrega = Ext.create("App.Entregas.View.GridDetalle",{colspan :2,height: 250,width:450 , opcion : 'DetalleOp'});
        me.FormEntrega.add(me.gridDetalleEntrega);
        
        
        me.gridDetalle = Ext.create("App.OrdenesProduccion.View.GridDetalle", {
            gridDetalleEntrega: me.gridDetalleEntrega,
            mostrarBotones : true,
            opcion: 'DetalleOp'

        });

        me.tabgridDetalle = Ext.create("App.Utils.TabPanel", {
            width: 450,
            height: 450,
            region : 'west',
            items: [me.grid, me.gridDetalle]
        })
        
        me.tabpanelIngreso = Ext.create("App.Utils.TabPanel", {
            width: 500,
            height: 500,
            region : 'center',
            items: [me.gridEntrega, me.FormEntrega]
        })
    

        this.items = [me.tabgridDetalle,me.tabpanelIngreso];
        me.grid.on('cellclick', me.CargarDatos, this);
        me.gridEntrega.on('cellclick', me.CargarDatosEntrega, this);
        this.callParent(arguments);
    },
    CargarDatos : function(grid, cell, col, record){
        var me = this;
//        me.gridDetalle.loadRecord(record);
        me.gridEntrega.CargarDatos(record);
        me.gridDetalle.CargarDatos(record);
       

    },
    CargarDatosEntrega : function(grid, cell, col, record){
        var me = this;
//        me.gridDetalle.loadRecord(record);
        me.FormEntrega.loadRecord(record);
        me.gridDetalleEntrega.CargarDatos(record);
       

    },
     Recargar: function () {
        var me = this;
        alert('cargando Store ');
        me.grid.getStore().load();
    }   
});