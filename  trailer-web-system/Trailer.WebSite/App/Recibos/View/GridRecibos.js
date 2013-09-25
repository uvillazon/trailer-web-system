Ext.define("App.Recibos.View.GridRecibos", {
    extend: "Ext.grid.Panel",
    title: 'Recibos Registrados',
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

        this.store = Ext.create('App.Recibos.Store.Recibos');
        this.store.load();
        this.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro<br>Recibo", width: 70, sortable: true, dataIndex: "NRO_RECIBO" },
            { header: "Fecha", width: 120, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "OP", width: 70, sortable: true, dataIndex: "OPS" },
            { header: "Cliente", width: 70, sortable: true, dataIndex: "CLIENTE" },
            { header: "Empresa", width: 70, sortable: true, dataIndex: "EMPRESA" },
            { header: "Nro<br>Factura", width: 50, sortable: true, dataIndex: "NRO_FACTURA" },
            { header: "Monto", width: 50, sortable: true, dataIndex: "MONTO" },
            { header: "Tipo", width: 80, sortable: true, dataIndex: "TIPO" },
            { header: "Deposito", width: 80, sortable: true, dataIndex: "DEPOSITO" },
            { header: "Nro<br>Cheque", width: 60, sortable: true, dataIndex: "NRO_CHEQUE" },
            { header: "Banco", width: 100, sortable: true, dataIndex: "BANCO" },
            { header: "Descripcion", width: 150, sortable: true, dataIndex: "DESCRIPCION" },
            { header: "Recibido<br>Por", width: 100, sortable: true, dataIndex: "RECIBIDO_POR" },
            { header: "Quien <br> Entrega", width: 100, sortable: true, dataIndex: "ENTREGADO" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },
        ];
        me.viewConfig =  { 
            stripeRows: false,
            getRowClass: function (record) {
                return record.get('ESTADO') == 'ANULADO' ? 'rowColor' : 'rowNegro'; 
            } 
        } ;
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
        me.FormRecibo = Ext.create("App.Recibos.View.FormRecibo");
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
                        url: host + 'Recibos/CrearRecibo',
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
    },
    Eliminar : function(){
        var me = this;
         var data = me.getSelectionModel().getSelection()[0];
        if (data != null) {
           
            if (data.get('ID_RECIBO') != 0) {
//                 alert(data.get('ID_DETALLE'));
                Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Anular el Recibo #'+data.get('NRO_RECIBO')+' ?', function (btn) {
                    if (btn == 'yes') {
                        me.el.mask('Procesando...', 'x-mask-loading');
                        Ext.Ajax.request({
                            url: host+'Recibos/EliminarRecibo',
                            params: { ID_RECIBO: data.get('ID_RECIBO') },
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
//                 alert(data.get('ID_DETALLE')+'aaaaa');
                me.store.remove(data);
            }

        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro para Anular');
        }
        
    },
    ////////////////////////// 
});
