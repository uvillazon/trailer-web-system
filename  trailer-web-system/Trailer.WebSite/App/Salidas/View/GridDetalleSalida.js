Ext.define("App.Salidas.View.GridDetalleSalida", {
    extend: "Ext.grid.Panel",
    title: 'Detalle Salida  ',
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
    selType: 'cellmodel',
    initComponent: function () {

        // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        var me = this;
        me.store = Ext.create('App.DetallesSalida.Store.DetallesSalida');
        me.store.setExtraParam('codigo', 'SALIDA');
        me.store.on('load', me.cambiarTotal, this);
        //        this.store.load();
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { dataIndex: 'ID_MATERIA_PRIMA', hidden: true },
            { dataIndex: 'ID_DETALLE_SALIDA', hidden: true },
            { header: "Nro<br>Salida", width: 60, sortable: true, dataIndex: 'NRO_SALIDA' },
            { header: "Nro<br>Orden", width: 60, sortable: true, dataIndex: 'NRO_ORDEN' },
            { header: "Item", width: 100, sortable: true, dataIndex: 'DETALLE_ITEM' },
            { header: "Talla", width: 60, sortable: true, dataIndex: 'TALLA' },
            { header: "Material", width: 100, sortable: true, dataIndex: 'DETALLE_MATERIAL' },
            { header: "Responsable", width: 100, sortable: true, dataIndex: "RESPONSABLE" },
            { header: "Cantidad", width: 80, sortable: true, dataIndex: 'CANTIDAD',
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

            },
            { header: "Detalle", width: 150, sortable: true, dataIndex: 'DETALLE',
                editor: {
                    xtype: 'textfield',
                    allowBlank: false,
                    selectOnFocus: true
                }

            }
        ];
        me.txt_total_cant = Ext.create("App.Utils.Componente.TextFieldBase", {
            //name: 'TOTAL_CANT',
            cls: 'DisabledClase',
            fieldLabel: 'Total Cant',
            labelWidth: 70,
            width : 150,
            readOnly : true
        });

        ///////////
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [
                      {
                          iconCls: 'disk',
                          text: 'Guardar',
                          scope: this,
                          handler: function () {
                              this.Guardar();
                          }
                      },
                      {
                          iconCls: 'arrow_refresh',
                          text: 'Recargar',
                          scope: this,
                          handler: function () {
                              me.store.load();
                          }
                      },
                      {
                          iconCls: 'delete',
                          text: 'Eliminar Detalle',
                          scope: this,
                          handler: function () {
                              me.Eliminar()
                          }
                      },
                      '->', // same as { xtype: 'tbfill' }
                        ,me.txt_total_cant
            //application_form_edit.png

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
        
        me.on('edit', function(editor, e) {
//        e.record.commit();
//        alert('asdasd');
            me.cambiarTotal();
        });
        this.callParent(arguments);

    },
    CargarDatos: function (record) {
        var me = this;
        me.setTitle("Detalle Salida Nro  : " + record.get('NRO_SALIDA'));
        me.idIngreso = record.get('ID_SALIDA');
        me.estadoIngreso = record.get('ESTADO');
        me.store.setExtraParam('condicion', me.idIngreso);
//        me.store.setExtraParam('Codigo', 'SALIDA');
        me.txt_total_cant.setValue('0');
        me.bar.moveFirst();
    },
    Guardar: function () {
        var me = this;
        var resultArray = [];
        var modified = me.getStore().getModifiedRecords(); //step 1
        var count = 0;
        if (!Ext.isEmpty(modified)) {
            var recordsToSend = [];
            Ext.each(modified, function (record) { //step 2
                recordsToSend.push(Ext.apply( record.data));
                   
            });
            recordsToSend = Ext.JSON.encode(recordsToSend);
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar Los Cambios?', function (btn) {
                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    Ext.Ajax.request({
                        url: host+'DetallesSalida/ActualizarDetallesSalida',
                        params: { Detalles: recordsToSend ,ID_SALIDA  : me.idIngreso },
                        success: function (result, request) {
                            var obj = Ext.decode(result.responseText);
                            me.el.unmask();
                            if (obj.success === true) {
                                Ext.MessageBox.alert('Exito', obj.msg);
                                me.store.commitChanges();
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
        else{
            Ext.MessageBox.alert('Error', 'Ingrese un Valor');
        }
    
    },
    Eliminar: function () {
        var me = this;
        var data = this.getSelectionModel().getSelection()[0];

        if (data != null) {
            if (data.get('ID_DETALLE') != 0) {
//                alert(data.get('ID_DETALLE'));
                Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                    if (btn == 'yes') {
                        me.el.mask('Procesando...', 'x-mask-loading');
                        Ext.Ajax.request({
                            url: host+'DetallesSalida/EliminarDetalleSalida',
                            params: { ID_DETALLE: data.get('ID_DETALLE') },
                            success: function (response) {
                                me.el.unmask();
                                r = Ext.decode(response.responseText);
                                if (!r.success) {
                                    Ext.MessageBox.alert('Error', r.msg);
                                    return;
                                } else {
                                    Ext.MessageBox.alert('Exito', r.msg);
                                    me.store.remove(data);
                                    me.cambiarTotal();
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
                me.cambiarTotal();
            }
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro');
        }
    }
    ,
    cambiarTotal:function(){
        var me = this;
        var totalCantidad=0;
        me.txt_total_cant.setValue(totalCantidad);  
        if(me.store.count()>0 && me.store != null){
            me.getStore().each(function(record){
               totalCantidad+=record.get('CANTIDAD');
            });
        }
        me.txt_total_cant.setValue(totalCantidad);  
    },
    ////////////////////////// 
});
