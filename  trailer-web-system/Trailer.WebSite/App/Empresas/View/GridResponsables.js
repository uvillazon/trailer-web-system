Ext.define("App.Empresas.View.GridResponsables", {
    extend: "Ext.grid.Panel",
    title: 'Responsables',
    width: 500,
    collapsible: true,
    split: true,
    height: 300,
    collapsible: true,
    useArrows: true,
    rootVisible: true,
    initComponent: function () {

        // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        var me = this;
        this.store = Ext.create('App.Listas.Store.StoreListaRel');
        //        this.store.load();
        this.columns = [
            { width: 120, header: "Lista", sortable: true, dataIndex: 'LISTA' },
            { header: "Codigo", width: 120, sortable: true, dataIndex: 'CODIGO' },
            { header: "Valor", width: 120, sortable: true, dataIndex: 'VALOR' },
            { header: "Estado", width: 50, sortable: true, dataIndex: 'ESTADO' }

        ];
        //////////

        ///////////
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [
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
        me.setTitle("Listas : " + record.get('TIPO_LISTA'));
        me.idlista = record.get('TIPO_LISTA');
        me.store.setExtraParam('condicion', me.idlista);
        me.store.load();
    },

    Crear: function () {
        var me = this;
        me.win = Ext.create("App.Utils.Ventana", { width: 350, height: 250, opcion: 'botones' });
        me.form = Ext.create("App.Listas.View.FormLista", { lista: me.idlista });
        me.win.add(me.form);
        me.win.getBotonGuardar().on('click', me.Guardar, this);
        me.win.show();
    },
    Editar: function () {

        var me = this;
        var data = me.getSelectionModel().getSelection()[0];
        if (data != null) {
            me.win = Ext.create("App.Utils.Ventana", { width: 350, height: 250, opcion: 'botones' });
            me.form = Ext.create("App.Listas.View.FormLista");
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
                        url: host+'Listas/CrearListaRel',
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
                        url: host+'Listas/EliminarListaRel',
                        params: { ID_TABLA: data.get('ID_TABLA') },
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
