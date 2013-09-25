Ext.define("App.Ingresos.View.GridIngresos", {
    extend: "Ext.grid.Panel",
    title: 'Compras Registrados',
    width: 500,
    collapsible: true,
    split: true,
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

        this.store = Ext.create('App.Ingresos.Store.Ingresos');
        this.store.load();
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: " - ", width: 30, sortable: true, dataIndex: 'IMAGEN' },
            { header: "Nro Compra", width: 70, sortable: true, dataIndex: 'NRO_INGRESO' },
            { header: "Nro OP", width: 70, sortable: true, dataIndex: 'NRO_ORDEN' },
            { header: "Tipo Compra", width: 100, sortable: true, dataIndex: 'TIPO_INGRESO' },
            { header: "Proveedor", width: 100, sortable: true, dataIndex: 'PROVEEDOR' },
            { header: "Caracteristicas", width: 100, sortable: true, dataIndex: 'CARACTERISTICA' },
            { header: "Documento", width: 100, sortable: true, dataIndex: 'DOCUMENTO' },
            { header: "Nro. <br> Documento", width: 100, sortable: true, dataIndex: 'NRO_DOCUMENTO' },
            { header: "Responsable", width: 100, sortable: true, dataIndex: 'RESPONSABLE' },
            { header: "Fecha <br> Compra", width: 100, sortable: true, dataIndex: 'FECHA_INGRESO', renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Total ", width: 100, sortable: true, dataIndex: 'TOTAL', renderer: Ext.util.Format.usMoney },
            { header: "Total <br> Cantidad ", width: 100, sortable: true, dataIndex: 'TOTAL_CANT' },
            { header: "Estado", width: 100, sortable: true, dataIndex: 'ESTADO' },

        ];
        //////////
        me.txt_busqueda = Ext.create("App.Utils.Componente.TextFieldBase", { fieldLabel: "Buscar Ingreso", width: 200, labelWidth: 80 })
        me.button = Ext.create('Ext.Button', {
            //text: 'Click me',
            text: 'Buscar',
            pressed: true,
            iconCls: 'zoom',
            tooltip: 'Buscar Ingresos Por Codigo Proveedor ,etc',
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
                          tooltip: 'Agregar',
                          scope: this,
                          handler: function () {

                              this.Crear();
                          }
                      },
                      {
                          iconCls: 'application_form_edit',
                          tooltip: 'Editar',
                          scope: this,
                          handler: function () {
                              this.Editar();
                          }
                      },
                      {
                          iconCls: 'delete',
                          tooltip: 'Eliminar',
                          scope: this,
                          handler: function () {
                              this.Eliminar();
                          }
                      },
                      {
                          iconCls: 'arrow_rotate_clockwise',
                          tooltip: 'Contabilizar',
                          scope: this,
                          handler: function () {
                              this.Contabilizar();
                          }
                      },
                      {
                          iconCls: 'asterisk_orange',
                          tooltip: 'Descontabilizar',
                          scope: this,
                          handler: function () {
                              this.Descontabilizar();
                          }
                      },
                       {
                           iconCls: 'book_edit',
                           tooltip: 'Pago de Creditos a Proveedores',
                           scope: this,
                           handler: function () {
                               this.PagoCreditos();
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
        me.win = Ext.create("App.Utils.Ventana", { width: 500, height: 400, opcion: 'botones' });
        me.form = Ext.create("App.Ingresos.View.FormIngreso");
        me.win.add(me.form);
        me.win.getBotonGuardar().on('click', me.Guardar, this);
        me.win.show();

    },
    Editar: function () {

        var me = this;
        var data = me.getSelectionModel().getSelection()[0];
        if (data != null) {
            me.win = Ext.create("App.Utils.Ventana", { width: 500, height: 330, opcion: 'botones' });
            me.form = Ext.create("App.Ingresos.View.FormIngreso");
            me.win.add(me.form);
            me.form.loadRecord(data);
            me.win.getBotonGuardar().on('click', me.Guardar, this);
            me.win.show();
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
                        url: host+'Ingresos/CrearIngreso',
                        success: function (form, action) {
                            me.form.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.form.getForm().reset();
                            me.win.hide();
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
    Eliminar: function () {
        var me = this;
        var data = this.getSelectionModel().getSelection()[0];
        if (data != null) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    Ext.Ajax.request({
                        url: host+'Ingresos/EliminarIngreso',
                        params: { ID_INGRESO: data.get('ID_INGRESO') },
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
    Contabilizar: function () {
        var me = this;
        var data = this.getSelectionModel().getSelection()[0];
        if (data != null) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Contabilizar este Ingreso?', function (btn) {
                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    Ext.Ajax.request({
                        url: host+'Ingresos/ContabilidadIngreso',
                        params: { ID_INGRESO: data.get('ID_INGRESO') },
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
    Descontabilizar: function () {
        var me = this;
        var data = this.getSelectionModel().getSelection()[0];
        if (data != null) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar la Contabilidad de  este Ingreso?', function (btn) {
                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    Ext.Ajax.request({
                        url: host+'Ingresos/DescontabilidadIngreso',
                        params: { ID_INGRESO: data.get('ID_INGRESO') },
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
    PagoCreditos: function () {
        var me = this;
        me.winCredito = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 820, height: 500 });
        me.FormPago = Ext.create("App.PagosCredito.View.FormPagoCredito");
        me.winCredito.add(me.FormPago);
        me.winCredito.getBotonGuardar().on('click', me.GuardarPagoRegistro, this);
        me.winCredito.show();
    },
    GuardarPagoRegistro: function () {
        var me = this;
        var form = me.FormPago.getForm();
        if (form.isValid() && me.FormPago.ParametrosGrid()!=null) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar los cambios', function (btn) {

                if (btn == 'yes') {
                    me.FormPago.el.mask('Procesando...', 'x-mask-loading');
                    form.submit({
                        submitEmptyText: false,
                        url: host+'PagosCredito/CrearPagoCredito',
                        params : {detalles : me.FormPago.ParametrosGrid()},
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
