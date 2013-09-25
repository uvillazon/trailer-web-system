Ext.define("App.Designaciones.View.GridDetallesDesignacion", {
    extend: "Ext.grid.Panel",
    title: 'Detalles de Designacion de Operario',
    width: 770,
    height: 300,
    margins: '0 2 0 0',
    // region: 'west',
    loadMask: true,
    collapsible: false,
//    selType: 'cellmodel',
//    plugins: [
//        Ext.create('Ext.grid.plugin.CellEditing', {
//            clicksToEdit: 2
//        })
//    ],
    form: null,
    txt_total: null,
    initComponent: function () {
        var me = this;
        this.store = Ext.create('App.Designaciones.Store.Designaciones');
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
             { header: "Fecha<br>Entrega", width: 70, sortable: true, dataIndex: "FECHA_ENTREGA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Nro<br>Orden", width: 70, sortable: true, dataIndex: "NRO_ORDEN" },
            { header: "Detalle", width: 150, sortable: true, dataIndex: "DETALLE_ITEM" },
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
        me.Crear = Ext.create('Ext.Button', {
            text: 'Crear',
            iconCls: 'add',
            cls: 'botones',
            scope: this

        });
        me.Editar = Ext.create('Ext.Button', {
            text: 'Editar',
            iconCls: 'application_form_edit',
            cls: 'botones',
            scope: this

        });
        me.Eliminar = Ext.create('Ext.Button', {
            text: 'Eliminar',
            iconCls: 'delete',
            cls: 'botones',
            scope: this

        });
        me.Material = Ext.create('Ext.Button', {
            text: 'Asignar Materiales',
            iconCls: 'add',
            cls: 'botones',
            scope: this

        });
        me.dockedItems = {
            xtype: 'toolbar',
            items: [
            me.Crear,me.Editar, me.Eliminar , me.Material
            ]
        };
        //botones para el pie del grid en este caso vamos a colocar un paginador
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} de {2}',
            emptyMsg: "No existen Detalles de Corte Registrados."

        });
        me.bar = this.bbar;

        this.callParent(arguments);
    }
    ////////////////////////// 
});
