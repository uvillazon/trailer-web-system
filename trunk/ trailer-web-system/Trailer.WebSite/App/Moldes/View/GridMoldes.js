Ext.define("App.Moldes.View.GridMoldes", {
    extend: "App.Utils.GridPrincipal",
    title: 'Moldes Registrados',
    criterios: true,
    equipo: 'Moldes',
    stateId: 'GridMoldes',
    textBusqueda: 'Molde',
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.Moldes.Store.Moldes");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Imagen<br>Molde", width: 80, sortable: false, dataIndex: "ID_IMAGEN", renderer: me.renderImagen },
            { header: "Numero<br>Molde", width: 60, sortable: true, dataIndex: "NRO_MOLDE" },
            { header: "Categoria", width: 70, sortable: true, dataIndex: "CATEGORIA" },
            { header: "Empresa", width: 70, sortable: true, dataIndex: "EMPRESA" },
            { header: "Modelo", width: 70, sortable: true, dataIndex: "MODELO" },
            { header: "Detalle", width: 70, sortable: true, dataIndex: "DETALLE" },
            { header: "Talla", width: 70, sortable: true, dataIndex: "TALLA" },
            ];
        this.callParent(arguments);
    }
});

