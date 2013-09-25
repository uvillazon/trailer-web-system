Ext.define("App.Entregas.View.GridEntregas", {
    extend: "Ext.grid.Panel",
    title: 'Entregas Registrados de OP ',
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

        this.store = Ext.create('App.Entregas.Store.Entregas');
        this.store.load();
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: "Nro Orden", width: 100, sortable: true, dataIndex: 'NRO_ORDEN' },
            { header: "Nro Entrega", width: 100, sortable: true, dataIndex: 'NRO_ENTREGA' },
            { header: "Responsable", width: 100, sortable: true, dataIndex: 'RESPONSABLE' },
            { header: "Quien <br> Recibe", width: 100, sortable: true, dataIndex: 'QUIEN_RECIBE' },
            { header: "Fecha<br>Entrega", width: 100, sortable: true, dataIndex: 'FECHA_ENTREGA', renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Observaciones", width: 100, sortable: true, dataIndex: 'OBSERVACION' }

        ];
        //////////
        me.txt_busqueda = Ext.create("App.Utils.Componente.TextFieldBase", { fieldLabel: "Buscar Entrega", width: 200, labelWidth: 80 })
        me.button = Ext.create('Ext.Button', {
            //text: 'Click me',
            text: 'Buscar',
            pressed: true,
            iconCls: 'zoom',
            tooltip: 'Buscar Entregas por Nro Op ,etc',
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
    },
    Crear: function () {
        var me = this;
        if (me.data != null) {
            me.win = Ext.create("App.Utils.Ventana", { width: 500, height: 330, opcion: 'botones' });
            me.form = Ext.create("App.Entregas.View.FormEntrega");
            me.form.CargarDatos(me.data);
            me.win.add(me.form);
            me.win.getBotonGuardar().on('click', me.Guardar, this);
            me.win.show();
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro OP<br> Para Crear');
        }
    },
    CargarDatos: function (record) {
        var me = this;
        me.data = record;
        me.setTitle('Entregas Registrados de OP : ' + me.data.get('NRO_ORDEN'));
        me.store.setExtraParam('codigo', 'ORDEN_PRODUCCION');
        me.store.setExtraParam('condicion', me.data.get('ID_ORDEN_PRODUCCION'));
        me.bar.moveFirst();
    },
    Editar: function () {

        var me = this;
        var data = me.getSelectionModel().getSelection()[0];
        if (data != null) {
            me.win = Ext.create("App.Utils.Ventana", { width: 500, height: 330, opcion: 'botones' });
            me.form = Ext.create("App.Entregas.View.FormEntrega");
            me.form.loadRecord(data);
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
                        url: host+'Entregas/CrearEntrega',
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
        var data = this.getSelectionModel().getSelection()[0];
        if (data != null) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    Ext.Ajax.request({
                        url: host+'Entregas/EliminarEntrega',
                        params: { ID_ENTREGA: data.get('ID_ENTREGA') },
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
