Ext.define("App.Proveedores.View.Principal", {
    extend: "Ext.panel.Panel",
    alias: "widget.PanelPrincipal",
    width: 950,
    resizable: true,
    height: 500,
    frame: true,
    layout: 'border',
    title: 'Adminsitracion Proveedores',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        
        me.form = Ext.create('App.Utils.FormDerecha');
        me.form_Prov = Ext.create('App.Proveedores.View.FormProveedor', {
            width: '40%',
            height: '100%',
            region: 'center',
        });
        me.grid = Ext.create("App.Proveedores.View.GridProveedores", {
            region: 'west',
            width: '50%',
            height: '100%',
            form : me.form_Prov
        });
        me.form_Prov.Bloquear();
        me.form.add(me.form_Prov);
        me.grid.on('cellclick', me.CargarDatos,this);
        this.items = [me.grid, me.form];
        this.callParent(arguments);
    },
    CargarDatos : function(grid, cell, col, record){
        var me = this;
        me.form_Prov.Bloquear();
        me.form_Prov.loadRecord(record);

    },
     Recargar: function () {
        var me = this;
        alert('cargando Store ');
        me.grid.getStore().load();
    }
});