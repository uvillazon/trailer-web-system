Ext.define("App.Ingresos.View.GridCompra", {
    extend: "Ext.grid.Panel",
    title: 'Detalle Ingreso  ',
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
        this.store = Ext.create('App.Ingresos.Store.DetallesIngreso');
        //        this.store.load();
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { dataIndex: 'ID_MATERIA_PRIMA', hidden: true },
            { dataIndex: 'ID_DETALLE_INGRESO', hidden: true },
            { width: 140, header: "Descripcion", sortable: true, dataIndex: 'DESCRIPCION' },
            { width: 80, header: "Color", sortable: true, dataIndex: 'COLOR' },
            { header: "Unidad", width: 80, sortable: true, dataIndex: 'UNIDAD' },
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
            { header: "Costo <br>Unitario", width: 80, sortable: true, dataIndex: 'COSTO',
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
            { header: "Total", width: 80, sortable: true, dataIndex: 'TOTAL',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    me.cambiarTotal();
                    value = record.get('COSTO') * record.get('CANTIDAD');
                    if (record != null) {
                        return '<b>' + Ext.util.Format.usMoney(record.get('COSTO') * record.get('CANTIDAD')) + '</b>';
                        
                    }
                }
            }

        ];
        //////////
        me.txt_total = Ext.create("App.Utils.Componente.TextFieldBase", {
            //name: 'TOTAL',
            cls: 'DisabledClase',
            fieldLabel: 'Total',
            labelWidth: 35,
            width : 100,
            readOnly : true
        });
        me.txt_total_cant = Ext.create("App.Utils.Componente.TextFieldBase", {
            //name: 'TOTAL_CANT',
            cls: 'DisabledClase',
            fieldLabel: 'Total Cant',
            labelWidth: 35,
            width : 100,
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
                        me.txt_total,me.txt_total_cant
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
        me.store.on('load', me.cambiarTotal, this);
        this.callParent(arguments);

    },
    CargarDatos: function (record) {
        var me = this;
        //        alert(record.get('TIPO_LISTA'));
        me.setTitle("Detalle Ingreso   : " + record.get('NRO_INGRESO'));
        me.idIngreso = record.get('ID_INGRESO');
        me.estadoIngreso = record.get('ESTADO');
        me.store.setExtraParam('condicion', me.idIngreso);
        me.store.setExtraParam('Codigo', 'INGRESO');
        me.txt_total.setValue('0');
        me.txt_total_cant.setValue('0');
        me.getStore().load();
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
                        url: host+'Ingresos/CrearDetallesIngreso',
                        params: { Detalles: recordsToSend ,ID_INGRESO  : me.idIngreso },
                        success: function (result, request) {
                            var obj = Ext.decode(result.responseText);
                            me.el.unmask();
                            if (obj.success === true) {
                                Ext.MessageBox.alert('Exito', obj.msg);
                                me.getStore().load();
                            } else {
                                Ext.MessageBox.alert('Error', obj.msg);
                                me.getStore().load();
                            }

                        },
                        failure: function (result, request) {
                            GridTaps.el.unmask();
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
            if (data.get('ID_DETALLE_INGRESO') != 0) {
                Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                    if (btn == 'yes') {
                        me.el.mask('Procesando...', 'x-mask-loading');
                        Ext.Ajax.request({
                            url: host+'Ingresos/EliminarDetalleIngreso',
                            params: { ID_DETALLE_INGRESO: data.get('ID_DETALLE_INGRESO') },
                            success: function (response) {
                                me.el.unmask();
                                r = Ext.decode(response.responseText);
                                if (!r.success) {
                                    Ext.MessageBox.alert('Error', r.msg);
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
        var total=0;
        var totalCantidad=0;
        me.txt_total.setValue(total);
        me.txt_total_cant.setValue(totalCantidad);  
        if(me.getStore().count()>0){
            me.getStore().each(function(record){
                total+=record.get('COSTO') * record.get('CANTIDAD');                   
                totalCantidad+=record.get('CANTIDAD');
            });
        }
        //console.log(total);
        me.txt_total.setValue(total);
        me.txt_total_cant.setValue(totalCantidad);  
    },
    ////////////////////////// 
});
