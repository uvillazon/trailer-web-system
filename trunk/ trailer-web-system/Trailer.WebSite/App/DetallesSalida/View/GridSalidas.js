Ext.define("App.DetallesSalida.View.GridSalidas", {
    extend: "Ext.grid.Panel",
    title: 'Detalles de Salida Por Item de OP',
    width: 770,
    height: 340,
    margins: '0 2 0 0',
    // region: 'west',
    loadMask: true,
    collapsible: false,
    selType: 'cellmodel',
//    plugins: [
//        Ext.create('Ext.grid.plugin.CellEditing', {
//            clicksToEdit: 2
//        })
//    ],
    txt_total: null,
    initComponent: function () {
        var me = this;
        this.editing = Ext.create('Ext.grid.plugin.CellEditing');
        me.plugins = me.editing;
        this.store = Ext.create('App.DetallesSalida.Store.DetallesSalida');
        //        me.store.proxy.extraParams['codigo'] = 'ORDENPRODUCCION';
//        me.store_responsable = Ext.create('App.Empleados.Store.Empleados');
        Ext.create('App.Utils.Componente.NumberFieldBase');
        me.columns = [
        { xtype: 'rownumberer', width: 30, sortable: false },
        { header: "Item", width: 150, sortable: true, dataIndex: 'DETALLE_ITEM' },
        { header: "Talla", width: 50, sortable: true, dataIndex: 'TALLA' },
        { header: "Material", width: 150, sortable: true, dataIndex: 'DETALLE_MATERIAL' },
        { header: "Unidad", width: 70, sortable: true, dataIndex: 'UNIDAD' },
        { header: "Cantidad<br>de Salida", width: 80, dataIndex: 'CANTIDAD',
            editor: {
                xtype: 'NumberFieldBase',
                allowBlank: false,
                minValue: 0,
                maxValue: 9999999.99,
                maxLength: 10,
                decimalSeparator: '.',
                decimalPrecision: 3,
                allowDecimals: true,
                allowNegative: false
            }
        },
       
        { header: "Detalle", width: 150, dataIndex: 'DETALLE',
            editor: {
                xtype: 'TextFieldBase',
                allowBlank: true,
                maxLength: 100
            }
        },
//        { header: "Responsable", width: 100, dataIndex: 'RESPONSABLE',
//            editor: {
//                xtype: 'combo',
//                valueField: 'NOMBRE',
//                displayField: 'NOMBRE',
//                allowBlank: false,
//                store: me.store_responsable,
//                selectOnFocus: true,
//                allowBlank: false
//            }
//        }
        ];
        me.Crear = Ext.create('Ext.Button', {
            text: 'Agregar',
            iconCls: 'add',
            cls: 'botones',
            scope : this

        });
        me.Corte = Ext.create('Ext.Button', {
            text: 'Agregar Items Corte',
            iconCls: 'add',
            cls: 'botones',
            scope : this

        });
        me.Eliminar = Ext.create('Ext.Button', {
            text: 'Eliminar',
            iconCls: 'delete',
            cls: 'botones',
            scope : this

        });
        me.dockedItems = {
            xtype: 'toolbar',
            items: [
            me.Crear,me.Eliminar , me.Corte
            ]};
        //botones para el pie del grid en este caso vamos a colocar un paginador
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} de {2}',
            emptyMsg: "No existen Detalles de Salida Registrados."

        });
        me.bar = this.bbar;

        this.callParent(arguments);
    },
    ////////////////////////// 
});
