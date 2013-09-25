Ext.define("App.Designaciones.View.GridDesignaciones", {
    extend: "App.Utils.GridPrincipal",
    title: 'Designaciones Registrados',
    criterios: true,
    equipo: 'Designaciones',
    width: "100%",
    stateId: 'GridDesignaciones',
    textBusqueda: 'Buscar',
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.Designaciones.Store.Designaciones");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
             { header: "Fecha<br>Entrega", width: 70, sortable: true, dataIndex: "FECHA_ENTREGA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Nro<br>Orden", width: 70, sortable: true, dataIndex: "NRO_ORDEN" },
            { header: "Detalle", width:150, sortable: true, dataIndex: "DETALLE_ITEM" },
            { header: "Talla", width: 50, sortable: true, dataIndex: "TALLA" },
            { header: "Operario", width: 70, sortable: true, dataIndex: "OPERARIO" },
            { header: "Responsable", width: 70, sortable: true, dataIndex: "RESPONSABLE" },
            { header: "Observacion", width: 100, sortable: true, dataIndex: "OBSERVACION" },
            { header: "Cantidad", width: 70, sortable: true, dataIndex: "CANTIDAD" },
            { header: "Cantidad<br>Entregada", width: 70, sortable: true, dataIndex: "CANTIDAD_ENTREGADA" },
            { header: "Cantidad<br>Faltante", width: 70, sortable: true, dataIndex: "CANTIDAD_FALTANTE" },
            { header: "Sastre", width: 70, sortable: true, dataIndex: "SASTRE" },
            { header: "Hilo", width: 70, sortable: true, dataIndex: "HILO" },
            { header: "Total", width: 70, sortable: true, dataIndex: "TOTAL" },
            { header: "Total<br>Cancelado", width: 70, sortable: true, dataIndex: "TOTAL_CANCELADO" },
            { header: "Total<br>Faltante", width: 70, sortable: true, dataIndex: "TOTAL_FALTANTE" },
           
            ];
        this.callParent(arguments);
    }
});

