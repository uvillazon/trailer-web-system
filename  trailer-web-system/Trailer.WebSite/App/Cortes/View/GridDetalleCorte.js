Ext.define("App.Cortes.View.GridDetalleCorte", {
    extend: "Ext.grid.Panel",
    title: 'Detalles de Cortes  por Orden de Produccion',
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
    form: null,
    txt_total: null,
    initComponent: function () {
        var me = this;
        this.store = Ext.create('App.Cortes.Store.Cortes');
        //        me.store.proxy.extraParams['codigo'] = 'ORDENPRODUCCION';
        me.store_responsable = Ext.create('App.Empleados.Store.Empleados');
        Ext.create('App.Utils.Componente.NumberFieldBase');
        me.columns = [
        { xtype: 'rownumberer', width: 30, sortable: false },
        { header: "Item", width: 100, sortable: true, dataIndex: 'DETALLE_ITEM' },
        { header: "Material", width: 90, sortable: true, dataIndex: 'DETALLE_MATERIAL' },
        { header: "Talla", width: 70, sortable: true, dataIndex: 'TALLA' },
        
        { header: "Nor. Molde", width: 70, sortable: true, dataIndex: 'NRO_MOLDE' },
        { header: "Largo del<br>Trazado", width: 80, dataIndex: 'TELA',
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
                    focus: function (n, The, eOpts) {
                        me.CargarTotales(n);
                    },
                    blur: function (n, The, eOpts) {
                        me.CargarTotales(n);
                    }
                }
            }
        },
        { header: "Cantidad<br>Hoja", width: 80, dataIndex: 'HOJA',
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
                    focus: function (n, The, eOpts) {
                        me.CargarTotales(n);
                    },
                    blur: function (n, The, eOpts) {
                        me.CargarTotales(n);
                    }
                }
            }
        },
        { header: "Cantidad<br>Prendas (o/y)<br>Piezas", width: 80, dataIndex: 'CANTIDAD',
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
                    focus: function (n, The, eOpts) {
                        me.CargarTotales(n);
                    },
                    blur: function (n, The, eOpts) {
                        me.CargarTotales(n);
                    }
                }
            }
        },
        { header: "Detalle", width: 100, dataIndex: 'DETALLE',
            editor: {
                xtype: 'TextFieldBase',
                allowBlank: true,
                maxLength: 100
            }
        },
        { header: "Total<br>Tela", width: 70, sortable: true, dataIndex: 'TOTAL_TELA' },
        { header: "Total<br>Cantidad<br>Unidades", width: 70, sortable: true, dataIndex: 'TOTAL_CANTIDAD' },
        { header: "Responsable", width: 100, dataIndex: 'RESPONSABLE',
            editor: {
                xtype: 'combo',
                valueField: 'NOMBRE',
                displayField: 'NOMBRE',
                allowBlank: false,
                store: me.store_responsable,
                selectOnFocus: true,
                allowBlank: false
            }
        }
        ];
        me.Crear = Ext.create('Ext.Button', {
            text: 'Crear',
            iconCls: 'add',
            cls: 'botones',
            scope: this

        });
        me.Eliminar = Ext.create('Ext.Button', {
            text: 'Eliminar',
            iconCls: 'delete',
            cls: 'botones',
            scope: this

        });
        me.dockedItems = {
            xtype: 'toolbar',
            items: [
            me.Crear, me.Eliminar
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
    },
    CargarTotales: function (n) {
        var me = this;
//        alert("jpoña");
        var total = 0;
        var TotalTela = 0;
        me.store.each(function (record) {

            record.set('TOTAL_TELA', record.get('TELA') * record.get('HOJA'));
            record.set('TOTAL_CANTIDAD', record.get('HOJA') * record.get('CANTIDAD'));
            TotalTela += record.get('TOTAL_TELA');
            total += record.get('TOTAL_CANTIDAD');
        });
        me.form.txt_total_tela.setValue(TotalTela);
        me.form.txt_total_cantidad.setValue(total);
        //        me.txt_total.setValue(total);
        //        alert('sadsad');
    }
    ////////////////////////// 
});
