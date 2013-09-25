Ext.define("App.Clientes.View.Principal", {
    extend: "Ext.panel.Panel",
    alias: "widget.PanelPrincipal",
    width: 950,
    resizable: true,
    height: 500,
    frame: true,
    layout: 'border',
    title : "Adminsitracion de Clientes",
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        
        me.form = Ext.create('App.Utils.FormDerecha');
        me.form_Cliente = Ext.create('App.Clientes.View.FormCliente', {
            width: '40%',
            height: '100%',
            region: 'center',
        });
        me.grid = Ext.create("App.Clientes.View.GridClientes", {
            region: 'west',
            width: '50%',
            height: '100%',
            form : me.form_Cliente
        });
        me.form_Cliente.Bloquear();
        me.form.add(me.form_Cliente);
        me.grid.on('cellclick', me.CargarDatos,this);
        this.items = [me.grid, me.form];

        this.callParent(arguments);
    },
    CargarDatos : function(grid, cell, col, record){
        var me = this;
        me.form_Cliente.Bloquear();
        me.form_Cliente.loadRecord(record);

    },
     Recargar: function () {
        var me = this;
        alert('cargando Store ');
        me.grid.getStore().load();
    }   
});