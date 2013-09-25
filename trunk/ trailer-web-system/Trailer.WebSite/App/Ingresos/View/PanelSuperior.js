Ext.define("App.Ingresos.View.PanelSuperior", {
    extend: "Ext.form.Panel",
    alias: "widget.PanelSuperiorCompra",
    bodyPadding: '5 10 10',
    grid: '',
    collapsible: false,
    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'panel',
            baseCls: 'x-plain',

            layout: {
                type: 'table',
                columns: 3,
                tableAttrs: {
                    style: {
                        width: '100%',
                        bodyStyle: 'padding:5px'
                    }
                }
            },

            items: [{
                xtype: 'textfield',
                labelWidth: 50,
                readOnly: true,
                id: 'nro_registro',
                itemId: 'nro_registro',
                fieldLabel: 'NRO',
                name: 'data[Compra][compra_id]',
                value: ''
            }, {
                xtype: 'checkboxfield',
                name: 'data[Compra][compra_facturada]',
                itemId: 'compra_facturada',
                fieldLabel: '',
                boxLabel: 'Con Factura',
                listeners: {
                    change: function (field, newValue, oldValue, eOpts) {
                        var value;
                        me.down('#nroFactura').setDisabled(!newValue);
                        // me.down('#nroFactura').setValue(value);
                        me.down('#nroFactura').focus(true, 100);
                    }
                }
            },
            {
                xtype: 'datefield',
                labelWidth: 50,
                name: 'data[Compra][compra_fecha]',
                itemId: 'compra_fecha',
                fieldLabel: 'FECHA',
                allowBlank: false,
                format: 'd/m/Y',
                value: new Date(),
                listeners: {
                    change: function (field, newValue, oldValue, eOpts) {
                        me.grid.store.each(function (record) {
                            //console.log(record.raw['sucursal_id']);
                            // Ext.Date.format(,'d-m-Y H:i:s')
                            //record.set('compra_fecha', newValue);
                            record.set('compra_fecha', Ext.Date.format(newValue, 'd/m/Y'));
                        });
                    }
                }
            },
            {
                disabled: true,
                itemId: 'nroFactura',
                xtype: 'textfield',
                name: 'data[Compra][compra_nro_factura]',
                allowBlank: false,
                fieldLabel: 'Nro de Factura'
            },
            {
                xtype: 'hidden',
                id: 'val-compra_precio_total',
                itemId: 'val-compra_precio_total',
                value: 0,
                name: 'data[Compra][compra_precio_total]'
            },
            {
                xtype: 'hidden',
                id: 'val-compra_cantidad',
                itemId: 'val-compra_cantidad',
                value: 0,
                name: 'data[Compra][compra_cantidad]'
            },
            {
                xtype: 'hidden',
                id: 'val-compra_descuento',
                itemId: 'val-compra_descuento',
                value: 0,
                name: 'data[Compra][compra_descuento]'
            },
            {
                xtype: 'hidden',
                id: 'val-compra_descuento_porcentaje',
                itemId: 'val-compra_descuento_porcentaje',
                value: 0,
                name: 'data[Compra][compra_descuento_porcentaje]'
            }, {
                xtype: 'hidden',
                id: 'val-records',
                name: 'data[Compra][records]'
            }
            ]
        }
        ];
       
        this.callParent(arguments);
    },
    guardar: function (formulario, grid, gridCompras, gridItems) {
        var form = formulario.getForm();
        var modificado = grid.getStore().getModifiedRecords();
        if (!Ext.isEmpty(modificado)) {
            var recordsToSend = [];
            Ext.each(modificado, function (record) {
                recordsToSend.push(
                    Ext.apply({
                        id: record.id
                    }, record.data));
            });
            //grid.stopEditing();

            recordsToSend = Ext.encode(recordsToSend);
            Ext.getCmp('val-records').setValue(recordsToSend);
            //console.log(recordsToSend);
        }
        form.method = 'POST';
        if (form.isValid()) {

            form.submit(
            {
                waitTitle: 'Espere por favor',
                waitMsg: 'Enviando datos...',
                url: host+'compras/guardar_compra',
                success: function (form, action) {

                    Ext.example.msg('Guardar', action.result.msg);
                    Ext.getCmp('nro_registro').setValue(action.result.id);
                    grid.getStore().commitChanges();
                    grid.store.load({
                        params: {
                            compra_id: action.result.id
                        }
                    });

                    gridCompras.store.load();
                    gridCompras.store.on('load', function (store, records, options) {
                        //console.log('cargando...');
                        store.each(function (record) {
                            //console.log(record.raw['compra_id']);
                            if (record.raw['compra_id'] == parseInt(action.result.id)) {
                                gridCompras.getSelectionModel().select(record.index);
                            }
                        });
                    });
                    gridItems.recargarItems(gridItems);
                    // Ext.getCmp('idordenproduccion').setValue(action.result.idordenproduccion);


                },
                failure: function (form, action) {

                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: action.result.msg,
                        buttons: Ext.MessageBox.OK,
                        // activeItem :0,
                        animEl: 'mb9',
                        icon: Ext.MessageBox.ERROR
                    });

                }
            }
            );


        }
    }
});