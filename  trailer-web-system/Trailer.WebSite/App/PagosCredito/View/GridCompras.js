Ext.define("App.PagosCredito.View.GridCompras", {
    extend: "Ext.grid.Panel",
    title: 'Formulario de Pago de Creditos',
    width: 770,
    height: 300,
    margins: '0 2 0 0',
    // region: 'west',
    loadMask: true,
    collapsible: false,
    selType: 'cellmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2
        })
    ],
    txt_total: null,
    initComponent: function () {
        var me = this;
        this.store = Ext.create('App.Ingresos.Store.Ingresos');
        me.store.proxy.extraParams['codigo'] = 'COMPRASPROVEEDORDEUDA';
        //        me.store = Ext.create("App.Extjs.Store.Contactos");
        //        me.store.load();
        //this.columns = columns;
        me.columns = [
        { xtype: 'rownumberer', width: 30, sortable: false },
        { header: "Nª Compra", width: 70, sortable: true, dataIndex: 'NRO_INGRESO' },
        { header: "Fecha<br>Compra", width: 90, sortable: true, dataIndex: 'FECHA_INGRESO', renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        { header: "Responsable<br>Compra", width: 90, sortable: true, dataIndex: 'RESPONSABLE' },
        { header: "Total<br>Cancelado", width: 70, sortable: true, dataIndex: 'TOTAL_CANCELADO' },
        { header: "Total<br>Adeudado", width: 80, sortable: true, dataIndex: 'TOTAL_ADEUDADO' },
        { header: "Total<br>Compra", width: 80, sortable: true, dataIndex: 'TOTAL' },
        { header: "Importe<br>a Pagar", width: 80, sortable: true, dataIndex: 'IMPORTE_TOTAL',
            editor: {
                xtype: 'NumberFieldBase',
                allowBlank: false,
                minValue: 0,
                maxValue: 9999999.99,
                maxLength: 10,
                decimalSeparator: '.',
                decimalPrecision: 3,
                allowDecimals: true,
                allowNegative: false,
                listeners: {
                    blur: function (n, The, eOpts) {
                        me.CargarTotalesImporte(n);
                    }
                }
            }
        },
        { header: "Comentario", width: 150, dataIndex: 'COMENTARIO',
            editor: {
                xtype: 'TextFieldBase',
                allowBlank: true,
                maxLength: 100
            }
        },
        ];

        //botones para el pie del grid en este caso vamos a colocar un paginador
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} de {2}',
            emptyMsg: "No existen Compras Pendientes de Credito Registrados."

        });
        me.bar = this.bbar;

        this.callParent(arguments);
    },
    CargarTotalesImporte: function (n) {
        var me = this;
        var total = 0;
        me.store.each(function (record) {
            total += record.get('IMPORTE_TOTAL');
        });
        me.txt_total.setValue(total);
        //        alert('sadsad');
    }
    ////////////////////////// 
});
