Ext.define("App.Responsables.View.GridResponsables", {
    extend: "Ext.grid.Panel",
    title: 'Responsables',
    width: 500,
    collapsible: true,
    split: true,
    height: 300,
    collapsible: true,
    useArrows: true,
    rootVisible: true,
    requires: ['App.Utils.ux.Printer'],
    initComponent: function () {

        // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        var me = this;
        this.store = Ext.create('App.Responsables.Store.Responsables');
        //        this.store.load();
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: "Nombre", width: 100, sortable: true, dataIndex: 'NOMBRE' },
            { header: "Apellido", width: 100, sortable: true, dataIndex: 'APELLIDO' },
            { header: "Telefono", width: 100, sortable: true, dataIndex: 'TELEFONO' },
            { header: "Direccion", width: 100, sortable: true, dataIndex: 'DIRECCION' },
            { header: "Correo <br> Electronico", width: 100, sortable: true, dataIndex: 'EMAIL' },
            { header: "Descripcion", width: 100, sortable: true, dataIndex: 'DESCRIPCION' },
            { header: "Empresa", width: 100, sortable: true, dataIndex: 'EMPRESA' },
            { header: "Ciudad", width: 100, sortable: true, dataIndex: 'CIUDAD' }

        ];
        //////////

        ///////////
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [
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
                          text: 'Agregar',
                          scope: this,
                          handler: function () {
                              this.Crear();
                          }
                      },
                      {
                          iconCls: 'application_form_edit',
                          text: 'Editar',
                          scope: this,
                          handler: function () {
                              this.Editar();
                          }
                      },
                      {
                          iconCls: 'delete',
                          text: 'Eliminar',
                          scope: this,
                          handler: function () {
                              this.Eliminar();
                          }
                      }

            //application_form_edit.png

           ]
        }];
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
        //        alert(record.get('TIPO_LISTA'));
        me.setTitle("Responsables : " + record.get('NOMBRE'));
        me.idemp = record.get('ID_EMPRESA');
        me.empresa = record.get('NOMBRE');
        me.store.setExtraParam('condicion', me.idemp);
        me.store.load();
    },

    Crear: function () {
        var me = this;
        me.win = Ext.create("App.Utils.Ventana", { width: 500, height: 350, opcion: 'botones' });
        me.form = Ext.create("App.Responsables.View.FormResponsable", { lista: me.idemp });
        me.win.add(me.form);
        me.win.getBotonGuardar().on('click', me.Guardar, this);
        me.win.show();
    },
    Editar: function () {

        var me = this;
        var data = me.getSelectionModel().getSelection()[0];
        if (data != null) {
            me.win = Ext.create("App.Utils.Ventana", { width: 500, height: 350, opcion: 'botones' });
            me.form = Ext.create("App.Responsables.View.FormResponsable");
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
                        url: host+'Responsables/CrearResponsable',
                        params: { ID_EMPRESA: me.idemp, EMPRESA: me.empresa },
                        success: function (form, action) {
                            me.form.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.form.Limpiar(me.win);
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
    },
    Eliminar: function () {
        var me = this;
        var data = this.getSelectionModel().getSelection()[0];
        if (data != null) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    Ext.Ajax.request({
                        url: host+'Responsables/EliminarResponsable',
                        params: { ID_RESPONSABLE: data.get('ID_RESPONSABLE') },
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
