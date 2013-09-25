Ext.define("App.Cortes.View.GridCortes", {
    extend: "Ext.grid.Panel",
    title: 'Cortes Registrados',
    width: 950,
//    collapsible: true,
//    split: true,
    height: '100%',
    iconCls: 'application_view_list',
    collapsible: true,
    useArrows: true,
    rootVisible: true,
    requires: ['App.Utils.ux.Printer'],
    form: null,
    initComponent: function () {

        // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        var me = this;

        this.store = Ext.create('App.Cortes.Store.Cortes');
        this.store.load();
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: "Nro<br>Orden", width: 100, sortable: true, dataIndex: 'NRO_ORDEN' },
            { header: "Item", width: 100, sortable: true, dataIndex: 'DETALLE_ITEM' },
            { header: "Material", width: 100, sortable: true, dataIndex: 'DETALLE_MATERIAL' },
            { header: "Talla", width: 100, sortable: true, dataIndex: 'TALLA' },
            { header: "Largo del<br>Trazado", width: 100, sortable: true, dataIndex: 'TELA' },
            { header: "Cantidad <br>Hoja", width: 100, sortable: true, dataIndex: 'HOJA' },
            { header: "Cantidad<br>Prendas (o/y)<br>Piezas", width: 100, sortable: true, dataIndex: 'CANTIDAD' },
            { header: "Detalle", width: 100, sortable: true, dataIndex: 'DETALLE' },
            { header: "Total<br>Tela", width: 100, sortable: true, dataIndex: 'TOTAL_TELA' },
            { header: "Total<br>Cantidad<br>Unidades", width: 100, sortable: true, dataIndex: 'TOTAL_CANTIDAD' },
            { header: "Responsable", width: 100, sortable: true, dataIndex: 'RESPONSABLE' }
        ];
        //////////
        me.txt_busqueda = Ext.create("App.Utils.Componente.TextFieldBase", { fieldLabel: "Buscar", width: 200, labelWidth: 80 })
        me.button = Ext.create('Ext.Button', {
            //text: 'Click me',
            text: 'Buscar',
            pressed: true,
            iconCls: 'zoom',
            tooltip: 'Buscar por Algun Criterio',
            cls: 'botones',
            enableToggle: true,
            scope: this

        });
        ///////////
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [
            ////////////////
                    me.txt_busqueda,
                    me.button,
                            {
                                pressed: true,
                                cls: 'botones',
                                iconCls: 'printer',
                                tooltip: 'Imprimir Datos',
                                enableToggle: true,
                                scope: this,
                                handler: function () {
                                    App.Utils.ux.Printer.print(me);
                                }
                            },
                      {
                          iconCls: 'add',
                          tooltip: 'Crear Registro de Corte',
                          scope: this,
                          handler: function () {

                              this.CrearCorte();
                          }
                      },
                      {
                          iconCls: 'delete',
                          tooltip: 'Eliminar',
                          scope: this,
                          handler: function () {
                              this.Eliminar();
                          }
                      }

           ]
        }];
        //////////////////////////
        me.txt_busqueda.on('specialkey', this.buscarEnterCodigo, this);
        me.button.on('click', this.buscarBotonCodigo, this);
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

    buscarEnterCodigo: function (f, e) {
        var me = this;
        // me.store.setBaseParam('condicion', me.txt_busqueda.getValue());
        if (e.getKey() == e.ENTER) {
            me.store.setExtraParam('codigo', 'CODIGO');
            me.store.setExtraParam('condicion', me.txt_busqueda.getValue());
            me.bar.moveFirst();
            me.store.load();

        }
    },
    buscarBotonCodigo: function () {
        var me = this;

        me.store.setExtraParam('codigo', 'CODIGO');
        me.store.setExtraParam('condicion', me.txt_busqueda.getValue());
        me.bar.moveFirst();
        me.store.load();
    },
    Crear: function () {
        var me = this;
        me.form.Desbloquear();
        me.form.getForm().reset();
        me.form.getBotonGuardar().on('click', me.Guardar, this);

    },
    Editar: function () {

        var me = this;
        var data = me.getSelectionModel().getSelection()[0];
        if (data != null) {
            me.form.loadRecord(data);
            me.form.Desbloquear();
            me.form.getBotonGuardar().on('click', me.Guardar, this);
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro <br> Para Editar');
        }
    },
    Guardar: function () {
        var me = this;
        var form = me.form.getForm();

        if (form.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar los cambios', function (btn) {

                if (btn == 'yes') {
                    me.form.el.mask('Procesando...', 'x-mask-loading');
                    form.submit({
                        submitEmptyText: false,
                        url: host+'Cortes/CrearProveedor',
                        success: function (form, action) {
                            me.form.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.form.Bloquear();
                            me.store.load();

                        },
                        failure: function (form, action) {
                            me.form.el.unmask();
                            Ext.MessageBox.alert('Error', action.result.msg);
                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    }
    ,
//    EliminarItem: function () {
//        var me = this;
//        var data = me.grid.getSelectionModel().getSelection()[0];
//        if (data != null) {
//            if (data.get('ID_CORTE') != 0) {
//                Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
//                    if (btn == 'yes') {
//                        me.grid.el.mask('Procesando...', 'x-mask-loading');
//                        Ext.Ajax.request({
//                            url: host + 'Cortes/EliminarCorte',
//                            params: { ID_CORTE: data.get('ID_CORTE') },
//                            success: function (response) {
//                                me.grid.el.unmask();
//                                r = Ext.decode(response.responseText);
//                                if (!r.success) {
//                                    Ext.MessageBox.alert('Error', r.msg);
//                                    return;
//                                } else {
//                                    Ext.MessageBox.alert('Exito', r.msg);
//                                    me.grid.getStore().load();
//                                }
//                            },
//                            failure: function (response) {
//                                me.grid.el.unmask();
//                                Ext.MessageBox.alert('Error', response.result.msg);
//                            }
//                        });

//                    }
//                });
//            }
//            else {
//                me.store.remove(data);
//                me.cambiarTotal();
//            }

//        }
//        else {
//            Ext.MessageBox.alert('Error', 'Seleccione Un registro para Eliminar');
//        }

//    },
    Eliminar: function () {
        var me = this;
        var data = this.getSelectionModel().getSelection()[0];
        if (data != null) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    Ext.Ajax.request({
                        url: host + 'Cortes/EliminarCorte',
                        params: { ID_CORTE: data.get('ID_CORTE') },
                        success: function (response) {
                            me.el.unmask();
                            r = Ext.decode(response.responseText);
                            if (!r.success) {
                                Ext.MessageBox.alert('Error', r.msg);
                                return;
                            } else {
                                Ext.MessageBox.alert('Exito', r.msg);
                                me.store.load();
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
            Ext.MessageBox.alert('Error', 'Seleccione Un registro');
        }
    },
    CrearCorte: function () {
        var me = this;
        me.winCredito = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 820, height: 550 });
        me.FormPago = Ext.create("App.Cortes.View.FormDetallesCorte");
        me.winCredito.add(me.FormPago);
        me.winCredito.getBotonGuardar().on('click', me.GuardaCorte, this);
        me.winCredito.show();
    },
    GuardaCorte: function () {
        var me = this;
        var form = me.FormPago.getForm();
        if (form.isValid() && me.FormPago.ParametrosGrid() != null) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar los cambios', function (btn) {

                if (btn == 'yes') {
                    me.FormPago.el.mask('Procesando...', 'x-mask-loading');
                    form.submit({
                        submitEmptyText: false,
                        url: host+'Cortes/CrearDetallesCorte',
                        params: { detalles: me.FormPago.ParametrosGrid() },
                        success: function (form, action) {
                            me.FormPago.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.FormPago.getForm().reset();
                            me.winCredito.hide();
                            me.store.load();

                        },
                        failure: function (form, action) {
                            me.FormPago.el.unmask();
                            Ext.MessageBox.alert('Error', action.result.msg);
                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    }

    ////////////////////////// 
});
