Ext.define("App.DetallesSalida.View.GridDetallesSalida", {
    extend: "Ext.grid.Panel",
    title: 'Detalles de Salida por Item OP Registrados',
    width: '100%',
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

        this.store = Ext.create('App.DetallesSalida.Store.DetallesSalida');
        this.store.load();
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: "Nro<br>Salida", width: 100, sortable: true, dataIndex: 'NRO_SALIDA' },
            { header: "Nro<br>Orden", width: 100, sortable: true, dataIndex: 'NRO_ORDEN' },
            { header: "Item", width: 100, sortable: true, dataIndex: 'DETALLE_ITEM' },
            { header: "Talla", width: 60, sortable: true, dataIndex: 'TALLA' },
            { header: "Material", width: 100, sortable: true, dataIndex: 'DETALLE_MATERIAL' },
            { header: "Unidad", width: 100, sortable: true, dataIndex: "UNIDAD" },

            { header: "Cantidad", width: 100, sortable: true, dataIndex: "CANTIDAD" },

            { header: "Responsable", width: 100, sortable: true, dataIndex: "RESPONSABLE" },

            { header: "Fecha<br>Salida", width: 100, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },

            { header: "Estado", width: 100, sortable: true, dataIndex: "ESTADO" },
        ];
        me.viewConfig = {
            stripeRows: false,
            getRowClass: function (record) {
                return record.get('ESTADO') =='CONTABILIZADO' ? 'rowVerde' : 'rowNegro';
            }
        };
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
                          text : 'Crear Salida',
                          tooltip: 'Crear Registro de Salida',
                          scope: this,
                          handler: function () {

                              this.CrearSalida();
                          }
                      },
//                      {
//                          iconCls: 'delete',
//                          tooltip: 'Eliminar',
//                          text : 'Eliminar',
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
    CrearSalida: function () {
        var me = this;
        me.win = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 820, height: 600 });
        me.FormSalida = Ext.create("App.DetallesSalida.View.FormDetallesSalida");
        me.win.add(me.FormSalida);
        me.win.getBotonGuardar().on('click', me.GuardarPagoRegistro, this);
        me.win.show();
    },
    GuardarPagoRegistro: function () {
        var me = this;
        var form = me.FormSalida.getForm();
        if (form.isValid() && me.FormSalida.ParametrosGrid() != null) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar los cambios', function (btn) {

                if (btn == 'yes') {
                    me.FormSalida.el.mask('Procesando...', 'x-mask-loading');
                    form.submit({
                        submitEmptyText: false,
                        url: host+'DetallesSalida/CrearDetallesSalida',
                        params: { detalles: me.FormSalida.ParametrosGrid() },
                        success: function (form, action) {
                            me.FormSalida.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.FormSalida.getForm().reset();
                            me.win.hide();
                            me.store.load();

                        },
                        failure: function (form, action) {
                            me.FormSalida.el.unmask();
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
