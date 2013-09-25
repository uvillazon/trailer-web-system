Ext.define("App.PagosCredito.View.Principal", {
    extend: "Ext.panel.Panel",
    alias: "widget.PanelPrincipal",
    width: 950,
    resizable: true,
    height: 500,
    frame: true,
    layout: 'border',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        
        me.form = Ext.create('App.Utils.FormDerecha');
        me.form_Emp = Ext.create('App.Bordados.View.FormBordado', {
            width: '40%',
            height: '100%',
            region: 'center',
        });
        me.grid = Ext.create("App.Bordados.View.GridBordados", {
            region: 'west',
            width: '50%',
            height: '100%',
            form : me.form_Emp
        });
        me.form_Emp.Bloquear();
        me.form.add(me.form_Emp);
        me.grid.on('cellclick', me.CargarDatos,this);
        this.items = [me.grid, me.form];

        this.callParent(arguments);
    },
    CargarDatos : function(grid, cell, col, record){
        var me = this;
        me.form_Emp.Bloquear();
        me.form_Emp.loadRecord(record);

    },
     Recargar: function () {
        var me = this;
        alert('cargando Store ');
        me.grid.getStore().load();
    }   
});