Ext.define("App.Reportes.View.PrincipalMovimiento", {
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

        me.grid = Ext.create("App.MateriasPrima.View.GridMateriasPrima", {
            width: '40%',
            height: 500,
            region : 'west',
        });

        me.gridDetalle = Ext.create('App.Reportes.View.GridMovimientoMateriales',{
         region : 'center',
        });





        this.items = [me.grid, me.gridDetalle];
        me.grid.on('cellclick', me.CargarDatos, this);
        this.callParent(arguments);
    },
    CargarDatos : function(grid, cell, col, record){
        var me = this;
        me.gridDetalle.CargarDatos(record);
    },
    
     Recargar: function () {
        var me = this;
        alert('cargando Store ');
        me.grid.getStore().load();
    } 
});