Ext.define("App.OrdenesProduccion.View.GridOrdenesProduccion", {
    extend: "Ext.grid.Panel",
    title: 'Orden de Produccion Registrados',
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
    reportes : '',
    initComponent: function () {
        // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        var me = this;

        this.store = Ext.create('App.OrdenesProduccion.Store.OrdenesProduccion');
        this.store.load();
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: "Nro Orden", width: 100, sortable: true, dataIndex: 'NRO_ORDEN' },
            { header: "Cliente", width: 100, sortable: true, dataIndex: 'TIPO_CLIENTE' },
            { header: "Fecha<br>Recepcion", width: 100, sortable: true, dataIndex: 'FECHA_RECEPCION', renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Fecha<br>Entrega", width: 100, sortable: true, dataIndex: 'FECHA_ENTREGA', renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Total Bs", width: 100, sortable: true, dataIndex: 'TOTAL' },
            { header: "Total Cant", width: 100, sortable: true, dataIndex: 'CANTIDAD' },
            { header: "Total <br>Entregado", width: 100, sortable: true, dataIndex: 'CANTIDAD_ENTREGADA' },
            { header: "Total <br>Faltante ", width: 100, sortable: true, dataIndex: 'CANTIDAD_FALTANTE' },
            { header: "Responsable Op", width: 100, sortable: true, dataIndex: 'RESPONSABLE_RECEPCION' },

        ];
        //////////
        me.txt_busqueda = Ext.create("App.Utils.Componente.TextFieldBase", { fieldLabel: "Buscar OP", width: 200, labelWidth: 80 })
        me.button = Ext.create('Ext.Button', {
            //text: 'Click me',
            text: 'Buscar',
            pressed: true,
            iconCls: 'zoom',
            tooltip: 'Buscar Ingresos por Cliente Nro Op ,etc',
            cls: 'botones',
            enableToggle: true,
            scope: this

        });
        ///////////
        this.dockedItems = [{
            itemId: 'mainToolbar',
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
                          iconCls: 'report',
                          text : 'Reporte OP',
                          tooltip: 'Ver Detalle de Op',
                          scope: this,
                          handler: function () {
                              me.ImprimirReporte()
                          }
                      }
//                      ,
//                      {
//                          iconCls: 'delete',
//                          tooltip: 'Eliminar',
//                          scope: this,
//                          handler: function () {
//                              this.Eliminar();
//                          }
//                      }

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
        me.win = Ext.create("App.Utils.Ventana", { width: 500, height: 330, opcion: 'botones' });
        me.form = Ext.create("App.OrdenesProduccion.View.FormOrdenProduccion");
        me.win.add(me.form);
        me.win.getBotonGuardar().on('click', me.Guardar, this);
        me.win.show();

    },
    Editar: function () {

        var me = this;
        //        Ext.MessageBox.alert('Error', 'Falta Implementar');
        var data = me.getSelectionModel().getSelection()[0];
        if (data != null) {
            me.win = Ext.create("App.Utils.Ventana", { width: 500, height: 330, opcion: 'botones' });
            me.form = Ext.create("App.OrdenesProduccion.View.FormOrdenProduccion");
            me.form.CargarDatos(data);
            me.win.add(me.form);
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
                        url: host+'OrdenesProduccion/CrearOrdenProduccion',
                        success: function (form, action) {
                            me.form.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.win.hide();
                            me.form.getForm().reset();
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
        Ext.MessageBox.alert('Error', 'Falta Implementar');
        //        var data = this.getSelectionModel().getSelection()[0];
        //        if (data != null) {
        //            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
        //                if (btn == 'yes') {
        //                    me.el.mask('Procesando...', 'x-mask-loading');
        //                    Ext.Ajax.request({
        //                        url: '../Articulos/EliminarArticulo',
        //                        params: { ID_ARTICULO: data.get('ID_ARTICULO') },
        //                        success: function (response) {
        //                            me.el.unmask();
        //                            r = Ext.decode(response.responseText);
        //                            if (!r.success) {
        //                                Ext.MessageBox.alert('Error', r.msg);
        //                                return;
        //                            } else {
        //                                Ext.MessageBox.alert('Exito', r.msg);
        //                                me.store.load();
        //                            }
        //                        },
        //                        failure: function (response) {
        //                            me.el.unmask();
        //                            Ext.MessageBox.alert('Error', response.result.msg);
        //                        }
        //                    });

        //                }
        //            });

        //        }
        //        else {
        //            Ext.MessageBox.alert('Error', 'Seleccione Un registro');
        //        }
    },
    ImprimirReporte: function () {
        var me = this;
        var data = me.getSelectionModel().getSelection()[0];
        if (data != null) {
            window.open(host + 'Informes/OrdenProduccionDetalles?id='+data.get('ID_ORDEN_PRODUCCION'));
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro <br> Para ver El Detalle de ORDEN DE PRODUCCION');
        }
    }
    ////////////////////////// 
});
