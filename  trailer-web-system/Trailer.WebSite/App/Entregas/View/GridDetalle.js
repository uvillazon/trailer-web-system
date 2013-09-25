Ext.define("App.Entregas.View.GridDetalle", {
    extend: "Ext.grid.Panel",
    title: 'Detalle Entergas  ',
    width: 500,
    collapsible: true,
    split: true,
    height: '100%',
    collapsible: true,
    useArrows: true,
    rootVisible: true,
    idIngreso: 0,
    estadoIngreso: '',
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    })],
    requires: ['App.Utils.ux.Printer'],
    selType: 'cellmodel',
    initComponent: function () {

        var me = this;
        this.store = Ext.create('App.Entregas.Store.DetallesEntrega', { pageSize: 3000 });
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { dataIndex: 'ID_DETALLE_ENTREGA', hidden: true },
            { header: 'Descripcion', sortable: true, dataIndex: 'DESC', width: 200 },
            { header: "Talla", width: 50, sortable: true, dataIndex: 'TALLA' },
            { header: "Cantidad", width: 60, sortable: true, dataIndex: 'CANTIDAD_ENTREGADA',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 0,
                    maxValue: 100000,
                    allowNegative: true,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    selectOnFocus: true
                }

            }

        ];


        ///////////
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [
                    {
                        pressed: true,
                        cls: 'botones',
                        iconCls: 'printer',
                        tooltip: 'Imprimir Datos',
                        enableToggle: true,
                        scope: this,
                        handler: function () {
                            App.Utils.ux.Printer.mainTitle = me.title;
                            App.Utils.ux.Printer.print(me);
                        }
                    },
                      {
                          iconCls: 'disk',
                          tooltip: 'Guardar',
                          scope: this,
                          handler: function () {
                              this.GuardarCambios();
                          }
                      },
                      {
                          iconCls: 'arrow_refresh',
                          tooltip: 'Recargar',
                          scope: this,
                          handler: function () {
                              me.store.load();
                          }
                      },
                      {
                          iconCls: 'delete',
                          tooltip: 'Eliminar',
                          scope: this,
                          handler: function () {
                              me.Eliminar()
                          }
                      },

           ]
        }
        ];
        //////////////////////////
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen Resultados."

        });
        me.bar = this.bbar;
        this.callParent(arguments);

    },
    CargarDatos: function (record) {
        var me = this;
        //        alert(record.get('TIPO_LISTA'));
        me.setTitle("Detalle Entergas Nro: " + record.get('NRO_ENTREGA'));
        me.idIngreso = record.get('ID_ENTREGA');
        me.estadoIngreso = record.get('ESTADO');
        me.datos = record;
        me.store.setExtraParam('condicion', me.idIngreso);
        me.store.setExtraParam('Codigo', 'ENTREGA');
        me.bar.moveFirst();
    },
    Eliminar: function () {
        var me = this;
        var data = this.getSelectionModel().getSelection()[0];

        if (data != null) {
            if (data.get('ID_DETALLE_ENTREGA') != 0) {
                Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                    if (btn == 'yes') {
                        me.el.mask('Procesando...', 'x-mask-loading');
                        Ext.Ajax.request({
                            url: host + 'Entregas/EliminarDetalleEntrega',
                            params: { ID_DETALLE_ENTREGA: data.get('ID_DETALLE_ENTREGA') },
                            success: function (response) {
                                me.el.unmask();
                                r = Ext.decode(response.responseText);
                                if (!r.success) {
                                    Ext.MessageBox.alert('Error1', r.msg);
                                    return;
                                } else {
                                    Ext.MessageBox.alert('Exito', r.msg);
                                    me.getStore().load();
                                }
                            },
                            failure: function (response) {
                                me.el.unmask();
                                Ext.MessageBox.alert('Error', response.result.msg);
                            }
                        });

                    }
                });
            }
            else {
                me.store.remove(data);
            }

        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro');
        }
    }

    ,
    GuardarCambios: function () {
        var me = this;
        var resultArray = [];
        var modified = me.getStore().getModifiedRecords(); //step 1
        var count = 0;
        if (!Ext.isEmpty(modified)) {
            var recordsToSend = [];
            Ext.each(modified, function (record) { //step 2
                recordsToSend.push(Ext.apply({ ID_DETALLE_ENTREGA: record.data.ID_DETALLE_ENTREGA, ID_DETALLE_ORDEN: record.data.ID_DETALLE_ORDEN, CANTIDAD_ENTREGADA: record.data.CANTIDAD_ENTREGADA, NRO_ENTREGA: me.datos.get('NRO_ENTREGA'), TALLA: record.data.TALLA }));

            });
            recordsToSend = Ext.JSON.encode(recordsToSend);
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar Los Cambios?', function (btn) {
                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    Ext.Ajax.request({
                        url: host+'Entregas/ModificarDetalles',
                        params: { Detalles: recordsToSend, ID_ENTREGA: me.idIngreso ,ID_ORDEN : me.datos.get('ID_ORDEN_PRODUCCION') },
                        success: function (result, request) {
                            var obj = Ext.decode(result.responseText);
                            me.el.unmask();
                            if (obj.success === true) {
                                Ext.MessageBox.alert('Exito', obj.msg);
                                me.getStore().load();
                            } else {
                                Ext.MessageBox.alert('Error', obj.msg);
                            }

                        },
                        failure: function (result, request) {
                            me.el.unmask();
                            console.log('server-side failure with status code ' + response.status);
                        }

                    });
                }
            });
        }
        else {
            Ext.MessageBox.alert('Error', 'Ingrese un Valor Para modificar');
        }
    },
    cambiarTotal: function () {
        var me = this;
        var total = 0;
        var totalCantidad = 0;
        me.txt_total.setValue(total);
        me.txt_total_cant.setValue(totalCantidad);
        if (me.getStore().count() > 0) {
            me.getStore().each(function (record) {
                total += record.get('COSTO') * record.get('CANTIDAD');
                totalCantidad += record.get('CANTIDAD');
            });
        }
        //console.log(total);
        me.txt_total.setValue(total);
        me.txt_total_cant.setValue(totalCantidad);
    }
});
