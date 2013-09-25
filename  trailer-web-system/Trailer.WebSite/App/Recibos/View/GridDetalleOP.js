Ext.define("App.Recibos.View.GridDetalleOP", {
    extend: "Ext.grid.Panel",
    title: 'Detalles De OP Pendientes de Saldo',
    width: 480,
    height: 245,
    margins: '0 2 0 0',
    // region: 'west',
    loadMask: true,
    collapsible: false,
    selType: 'cellmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function () {
        var me = this;
        this.store = Ext.create('App.OrdenesProduccion.Store.OrdenesProduccion');
        Ext.create('App.Utils.Componente.NumberFieldBase');
        me.columns = [
        { xtype: 'rownumberer', width: 30, sortable: false },
        { header: "Op", width: 70, sortable: true, dataIndex: 'NRO_ORDEN' },
        { header: "Fecha<br>Recepcion", width: 100, sortable: true, dataIndex: 'FECHA_RECEPCION', renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        { header: "Monto a<br>Pagar", width: 70, sortable: true, dataIndex: 'TOTAL_POR_COBRAR' },
        { header: "A Cuenta", width: 80, dataIndex: 'A_CUENTA'//,
//            editor: {
//                xtype: 'numberfield',
//                allowBlank: false,
//                minValue: 0,
//                maxValue: 9999999.99,
//                maxLength: 10,
//                decimalSeparator: '.',
//                decimalPrecision: 3,
//                allowDecimals: true,
//                allowNegative: false,
////                listeners: {
////                    focus: function (n, The, eOpts) {
////                        me.CargarTotales(n);
////                    },
////                    blur: function (n, The, eOpts) {
////                        me.CargarTotales(n);
////                    }
////                }
//            }
        },
        
        { header: "Saldo", width: 70, sortable: true, dataIndex: 'SALDO' },
      
        ];
        me.btn_eliminar = Ext.create('Ext.Button', {
            cls: 'botones',
            iconCls: 'delete',
            text: 'Quitar Op',
            tooltip: 'Quitar Op si no corresponde al pago de Op',
            scope: this
        });
        me.dockedItems = [{
            xtype: 'toolbar',
            items: [
                me.btn_eliminar
                
            //                me.btn_editar,
            //                me.btn_editarWin
          ]
        }];
        //botones para el pie del grid en este caso vamos a colocar un paginador
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} de {2}',
            emptyMsg: "No existen Detalles de Op Registrados."

        });
        me.bar = this.bbar;

        this.callParent(arguments);
    },
    CargarTotalesImporte: function (n) {
        var me = this;
        var total = 0;
        me.store.each(function (record) {
            total += record.get('TOTAL_POR_COBRAR');
        });
        me.setTile('Detalles De OP Pendientes de Saldo , Total Deuda Pendiente ='+total);
//        me.txt_total.setValue(total);
        //        alert('sadsad');
    }
    ////////////////////////// 
});
