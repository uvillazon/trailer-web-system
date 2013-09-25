Ext.define("App.Empresas.View.Principal", {
    extend: "Ext.panel.Panel",
    alias: "widget.PanelPrincipal",
    width: 950,
    resizable: true,
    height: 500,
    frame: true,
    layout: 'border',
    title : 'Adminsitracion de Proveedores',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        me.form_Empresa = Ext.create('App.Empresas.View.FormEmpresa', {
            width: '40%',
            height: '100%',
            region: 'center'
        });
        me.form_Empresa.Bloquear();
        me.grid = Ext.create("App.Empresas.View.GridEmpresas", {
            region: 'west',
            width: '50%',
            height: '100%',
            form: me.form_Empresa
        });
        me.grid_res = Ext.create("App.Empresas.View.GridResponsables");

        me.tabpanelEmpresa = Ext.create("App.Utils.TabPanel", {
            items: [me.form_Empresa, me.grid_res]
        })

        me.grid.on('cellclick', me.CargarDatos, this);
        this.items = [me.grid, me.tabpanelEmpresa];

        this.callParent(arguments);
    },
    CargarDatos: function (grid, cell, col, record) {
        var me = this;
        me.form_Empresa.Bloquear();
        me.form_Empresa.loadRecord(record);

    },
    Recargar: function () {
        var me = this;
        alert('cargando Store ');
        me.grid.getStore().load();
    }
});