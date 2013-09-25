Ext.define("App.Ingresos.View.Principal", {
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

        me.grid = Ext.create("App.Ingresos.View.GridIngresos", {
            width: '40%',
            height: 500
        });
        me.gridCentral = Ext.create("App.Ingresos.View.GridCompra");
        me.FormIngreso = Ext.create("App.Ingresos.View.FormIngreso",{height: 500});
        me.FormIngreso.Bloquear();
        
        
        me.panelGrid = Ext.create("App.MateriasPrima.View.GridMateriasPrima", {
            gridIngreso: me.gridCentral,
            mostrarBotones : true,

        });

        me.tabpanelGrid = Ext.create("App.Utils.TabPanel", {
            width: 450,
            height: 450,
            region : 'west',
            items: [me.grid, me.panelGrid]
        })
        
        me.tabpanelIngreso = Ext.create("App.Utils.TabPanel", {
            width: 500,
            height: 500,
            region : 'center',
            items: [me.FormIngreso, me.gridCentral]
        })
    

        this.items = [me.tabpanelGrid,me.tabpanelIngreso];
        me.grid.on('cellclick', me.CargarDatos, this);
        this.callParent(arguments);
    },
    CargarDatos : function(grid, cell, col, record){
        var me = this;
        me.FormIngreso.loadRecord(record);
        me.gridCentral.CargarDatos(record);
       

    },
     Recargar: function () {
        var me = this;
        alert('cargando Store ');
        me.grid.getStore().load();
    }   
});