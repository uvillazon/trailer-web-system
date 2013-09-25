Ext.define("App.Salidas.View.GridSalidas", {
    extend: "Ext.grid.Panel",
    title: 'Salidas Registrados',
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
    record: null,
    gridDetalle : null,
    initComponent: function () {

        // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        var me = this;
        this.store = Ext.create('App.Salidas.Store.Salidas');
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: " - ", width: 30, sortable: true, dataIndex: 'IMAGEN' },
            { header: "Nro Salida", width: 100, sortable: true, dataIndex: 'NRO_SALIDA' },
            { header: "Nro OP", width: 100, sortable: true, dataIndex: 'NRO_ORDEN' },
            { header: "Responsable", width: 100, sortable: true, dataIndex: 'RESPONSABLE' },
            { header: "Fecha <br> Salida", width: 100, sortable: true, dataIndex: 'FECHA_SALIDA', renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Observaciones ", width: 100, sortable: true, dataIndex: 'OBSERVACION' },
            { header: "Estado", width: 100, sortable: true, dataIndex: 'ESTADO' },

        ];
        //////////
        me.txt_busqueda = Ext.create("App.Utils.Componente.TextFieldBase", { fieldLabel: "Buscar Salida", width: 200, labelWidth: 80 })
        me.button = Ext.create('Ext.Button', {
            //text: 'Click me',
            text: 'Buscar',
            pressed: true,
            iconCls: 'zoom',
            tooltip: 'Buscar Salida Por Nro Op,Resposanble ,etc',
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
//                      {
//                          iconCls: 'add',
//                          tooltip: 'Agregar',
//                          scope: this,
//                          handler: function () {

//                              this.Crear();
//                          }
//                      },
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
    CargarDatos: function (record) {
        var me = this;
        me.record = record;
        //        alert(record.get('TIPO_LISTA'));
        me.setTitle("Salidas Registrados   OP: " + record.get('NRO_ORDEN'));
        me.idOrden = record.get('ID_ORDEN_PRODUCCION');
//        alert(me.idOrden);
        me.estado = record.get('ESTADO');
        me.store.setExtraParam('condicion', me.idOrden);
        me.store.setExtraParam('Codigo', 'OP');
        me.bar.moveFirst();
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
        if (me.record != null) {
            me.win = Ext.create("App.Utils.Ventana", { width: 500, height: 330, opcion: 'botones' });
            me.form = Ext.create("App.Salidas.View.FormSalida", { orden: me.record.get('NRO_ORDEN') ,idOrden : me.idOrden});
            me.win.add(me.form);
            me.win.getBotonGuardar().on('click', me.Guardar, this);
            me.win.show();
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Una Orden De Produccion');
        }

    },
    Editar: function () {

        var me = this;
        var data = me.getSelectionModel().getSelection()[0];
        if (data != null) {
            me.win = Ext.create("App.Utils.Ventana", { width: 500, height: 330, opcion: 'botones' });
            me.form = Ext.create("App.Salidas.View.FormSalida");
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
//        alert(me.idOrden);
        if (form.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar los cambios', function (btn) {

                if (btn == 'yes') {
                    me.form.el.mask('Procesando...', 'x-mask-loading');
                    form.submit({
                        submitEmptyText: false,
                        url: host+'Salidas/CrearSalida',
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
                        url: host+'Salidas/EliminarSalida',
                        params: { ID_SALIDA: data.get('ID_SALIDA') },
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
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Contabilizar esta SALIDA?', function (btn) {
                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    Ext.Ajax.request({
                        url: host+'Salidas/ContabilidadSalida',
                        params: { ID_SALIDA: data.get('ID_SALIDA') },
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
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar la Contabilidad de  esta SALIDA?', function (btn) {
                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    Ext.Ajax.request({
                        url: host+'Salidas/DescontabilidadSalida',
                        params: { ID_SALIDA: data.get('ID_SALIDA') },
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
    }
    ////////////////////////// 
});
