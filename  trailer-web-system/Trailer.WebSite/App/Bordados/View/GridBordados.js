Ext.define("App.Bordados.View.GridBordados", {
    extend: "Ext.grid.Panel",
    title: 'Bordados Registrados',
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
    empresa: '',
    botones : false,
    initComponent: function () {

        // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        var me = this;

        this.store = Ext.create('App.Bordados.Store.Bordados');
        if (me.empresa == '') {
            this.store.load();
        }
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: "Bordado", width: 160, sortable: true, dataIndex: 'ID_IMAGEN', renderer: me.renderImagen },
            { header: "Nombre <br> Diseño", width: 100, sortable: true, dataIndex: 'DISENO' },
            { header: "Canal", width: 100, sortable: true, dataIndex: 'CANAL' },
            { header: "Kardex", width: 100, sortable: true, dataIndex: 'KARDEX' },
            { header: "Empresa", width: 100, sortable: true, dataIndex: 'EMPRESA' },
            { header: "Orden <br>Produccion", width: 100, sortable: true, dataIndex: 'ORDEN_PRODUCCION' },
            { header: "Puntada", width: 100, sortable: true, dataIndex: 'PUNTADA' },
            { header: "Ancho", width: 100, sortable: true, dataIndex: 'ANCHO' },
            { header: "Alto", width: 100, sortable: true, dataIndex: 'ALTO' },
            { header: "Descripcion", width: 100, sortable: true, dataIndex: 'DESCRIPCION' },
            { header: "Fecha <br>Registro", width: 100, sortable: true, dataIndex: 'FECHA_REG', renderer: Ext.util.Format.dateRenderer('d/m/Y') }

        ];
        //////////
        me.txt_busqueda = Ext.create("App.Utils.Componente.TextFieldBase", { fieldLabel: "Buscar Bordado", width: 200, hidden: me.botones, labelWidth: 80 })
        me.button = Ext.create('Ext.Button', {
            //text: 'Click me',
            text: 'Buscar',
            pressed: true,
            iconCls: 'zoom',
            tooltip: 'Buscar por Lista',
            cls: 'botones',
            enableToggle: true,
            hidden : me.botones,
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
                                hidden: me.botones,
                                scope: this,
                                handler: function () {
                                    App.Utils.ux.Printer.print(me);
                                }
                            },
                      {
                          iconCls: 'add',
                          tooltip: 'Agregar',
                          scope: this,
                          hidden: me.botones,
                          handler: function () {

                              this.Crear();
                          }
                      },
                      {
                          iconCls: 'application_form_edit',
                          tooltip: 'Editar',
                          hidden: me.botones,
                          scope: this,
                          handler: function () {
                              this.Editar();
                          }
                      },
                      {
                          iconCls: 'delete',
                          tooltip: 'Eliminar',
                          hidden: me.botones,
                          scope: this,
                          handler: function () {
                              this.Eliminar();
                          }
                      },
                      {
                          iconCls: 'image_add',
                          tooltip: 'Agregar Imagen',
                          scope: this,
                          hidden: me.botones,
                          handler: function () {
                              this.Imagen();
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
    Imagen: function () {
        var me = this;
        var data = me.getSelectionModel().getSelection()[0]
        if (data != null) {
            me.winGaleria = Ext.create("App.Utils.Ventana", { title: " Galeria de Archivos o Imagenes", width: 750, height: 500, y: 20 });
            me.panelGaleria = Ext.create("App.Imagen.View.GridImagen", { equipo: 'BORDADO' });
            me.winGaleria.add(me.panelGaleria);
            var id = data.get('ID_BORDADO');
            me.panelGaleria.CargarImagen(data, id);
            me.winGaleria.show();
        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione Un registro <br> Para ver la Galeria de Archivos');
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
                        url: host+'Bordados/CrearBordado',
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
    Eliminar: function () {
        var me = this;
        var data = this.getSelectionModel().getSelection()[0];
        if (data != null) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    Ext.Ajax.request({
                        url: host+'Bordados/EliminarBordado',
                        params: { ID_BORDADO: data.get('ID_BORDADO') },
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
    ,
    renderImagen: function (val, metaData, record) {
        //  alert(record.data.ID)
        if (record.data.ID_IMAGEN == 0) {
            return '<img src="../Content/Iconos/no-imagen.jpg" />';
        }
        else {
            return '<img src="../Imagen/GetImage/?id=' + val + '&tamano=140"/>';
        }
    }
    ////////////////////////// 
});
