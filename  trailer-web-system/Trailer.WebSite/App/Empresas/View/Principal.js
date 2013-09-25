Ext.define("App.Empresas.View.Principal", {
    extend: "Ext.panel.Panel",
    alias: "widget.PanelPrincipal",
    width: 950,
    resizable: true,
    height: 500,
    frame: true,
    layout: 'border',
    title: 'Adminsitracion de Empresas',
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
        me.grid_res = Ext.create("App.Responsables.View.GridResponsables");
        me.grid_bordados = Ext.create("App.Bordados.View.GridBordados", { empresa: 'empresa', botones: true, height: 450 });
        me.tabpanelEmpresa = Ext.create("App.Utils.TabPanel", {
            items: [me.form_Empresa, me.grid_res, me.grid_bordados]
        })

        me.grid.on('cellclick', me.CargarDatos, this);
        this.items = [me.grid, me.tabpanelEmpresa];

        this.callParent(arguments);
    },
    CargarDatos: function (grid, cell, col, record) {
        var me = this;
        me.form_Empresa.Bloquear();
        me.form_Empresa.loadRecord(record);
        me.grid_res.CargarDatos(record);
        me.grid_bordados.store.setExtraParam('codigo', 'EMPRESA');
        me.grid_bordados.store.setExtraParam('condicion', record.get('NOMBRE'));
        me.grid_bordados.store.load();

    },
    Recargar: function () {
        var me = this;
        me.grid.getStore().load();
    }
});