Ext.define("App.Listas.View.Principal", {
    extend: "Ext.panel.Panel",
    alias: "widget.PanelPrincipal",
    width: 950,
    resizable: true,
    height: 500,
    frame: true,
    layout: 'border',
    title : 'Administracion de Listas',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        me.grid = Ext.create("App.Listas.View.GridLista", {
            region: 'west',
            width: '50%',
            height: '100%'
        });
        me.grid_rel = Ext.create('App.Listas.View.GridListaRel', {
            width: '45%',
            height: '100%',
            region: 'center',
        });
        me.grid.on('cellclick', me.CargarDatos,this);
        this.items = [me.grid, me.grid_rel];

        this.callParent(arguments);
    },
    CargarDatos : function(grid, cell, col, record){
        var me = this;
        me.grid_rel.CargarDatos(record);

    }  ,
     Recargar: function () {
        var me = this;
        me.grid.getStore().load();
    } 
});