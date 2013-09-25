Ext.define("App.Facturas.View.GridFacturas", {
    extend: "Ext.grid.Panel",
    title: 'Facturas Registrados',
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

        this.store = Ext.create('App.Facturas.Store.Facturas');
        this.store.load();
        this.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro <br>Factura", width: 70, sortable: true, dataIndex: "NRO_FACTURA" },
            { header: "Fecha", width: 120, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Cliente", width: 70, sortable: true, dataIndex: "CLIENTE" },
            { header: "Empresa", width: 70, sortable: true, dataIndex: "EMPRESA" },
            { header: "Nit", width: 70, sortable: true, dataIndex: "NIT" },
            { header: "Nro <br>OP´s", width: 70, sortable: true, dataIndex: "OPS" },
            { header: "Nro<br>Recibos", width: 70, sortable: true, dataIndex: "NRO_RECIBOS" },
            { header: "Total", width: 70, sortable: true, dataIndex: "MONTO" },
            { header: "Total<br>Cancelado<br>Hasta la Fecha", width: 70, sortable: true, dataIndex: "MONTO_CANCELADO" },
            { header: "Estadp", width: 70, sortable: true, dataIndex: "ESTADO" },
            { header: "Emitido<br>Por", width: 70, sortable: true, dataIndex: "EMITIDO_POR" },
            { header: "Tiempo <br>Aproximado<br>Cancelacion", width: 70, sortable: true, dataIndex: "TIEMPO_APROX" },
            { header: "Fecha <br>Aproximado<br>Cancelacion", width: 70, sortable: true, dataIndex: "FECHA_APROX" },
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
                          tooltip: 'Crear Recibo',
                          text: 'Crear Recibo',
                          scope: this,
                          handler: function () {

                              this.CrearRecibo();
                          }
                      },
                      {
                          iconCls: 'delete',
                          tooltip: 'Anular Recibo',
                          text: 'Anular Recibo',
                          scope: this,
                          handler: function () {
                              this.Eliminar();
                          }
                      },
                      {
                          iconCls: 'report',
                          text : 'Reporte Recibo',
                          tooltip: 'Ver Detalle del Recibo',
                          scope: this,
                          handler: function () {
                              me.ImprimirReporte()
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
    CrearRecibo: function () {
        var me = this;
        me.winRecibo = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 550, height: 550 });
        me.FormRecibo = Ext.create("App.Facturas.View.FormRecibo");
        me.winRecibo.add(me.FormRecibo);
        me.winRecibo.getBotonGuardar().on('click', me.GuardaRecibo, this);
        me.winRecibo.show();
    },
    GuardaRecibo: function () {
        var me = this;
        var form = me.FormRecibo.getForm();
        if (form.isValid() && me.FormRecibo.ParametrosGrid() != null) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar los cambios', function (btn) {

                if (btn == 'yes') {
                    me.FormRecibo.el.mask('Procesando...', 'x-mask-loading');
                    form.submit({
                        submitEmptyText: false,
                        url: host + 'Facturas/CrearRecibo',
                        params: { detalles: me.FormRecibo.ParametrosGrid() },
                        success: function (form, action) {
                            me.FormRecibo.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.FormRecibo.getForm().reset();
                            me.winRecibo.hide();
                            me.store.load();
                            me.ImprimirReporte(action.result.datos);

                        },
                        failure: function (form, action) {
                            me.FormRecibo.el.unmask();
                            Ext.MessageBox.alert('Error', action.result.msg);
                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    },
    ImprimirReporte: function (id = null) {
        var me = this;
        if(id != null){
            window.open(host + 'Informes/ReporteRecibo?id=' + id);
        }
        else{
         var data = me.getSelectionModel().getSelection()[0];
            if (data != null) {
                window.open(host + 'Informes/ReporteRecibo?id='+data.get('ID_RECIBO'));
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione Un registro <br> Para ver El Detalle de RECIBO');
            }
        }
    }
    ////////////////////////// 
});
