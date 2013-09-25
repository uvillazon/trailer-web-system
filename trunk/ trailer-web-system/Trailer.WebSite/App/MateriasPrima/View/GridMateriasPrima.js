Ext.define("App.MateriasPrima.View.GridMateriasPrima", {
    extend: "Ext.grid.Panel",
    title: 'Materiales Registrados',
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
    mostrarBotones: false,
    gridIngreso: null,
    reporte : 'ReporteMateriales',
    gridDetalleSalida: null,
    initComponent: function () {

        // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        var me = this;
        this.store = Ext.create('App.MateriasPrima.Store.MateriasPrima');
        this.store.load();
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: "Codigo", width: 70, sortable: true, dataIndex: 'CODIGO' },
            { header: "Material", width: 100, sortable: true, dataIndex: 'NOMBRE' },
            { header: "Color", width: 80, sortable: true, dataIndex: 'COLOR' },
           
            { header: "Categoria", width: 100, sortable: true, dataIndex: 'CATEGORIA' },
            { header: "Calidad", width: 100, sortable: true, dataIndex: 'CALIDAD' },
            { header: "Unidad", width: 100, sortable: true, dataIndex: 'UNIDAD' },
            
            { header: "Stock Minimo", width: 100, sortable: true, dataIndex: 'STOCK_MINIMO' },
            { header: "Cantidad<br>Disponible Stock", width: 100, sortable: true, dataIndex: 'CANTIDAD_DISP' },
            { header: "Estado", width: 100, sortable: true, dataIndex: 'ESTADO' },
            { header: "Fecha <br>Registro", width: 100, sortable: true, dataIndex: 'FECHA_REG', renderer: Ext.util.Format.dateRenderer('d/m/Y') }

        ];
        me.viewConfig =  { 
            stripeRows: false,
            getRowClass: function (record) {
                return record.get('STOCK_MINIMO') > record.get('CANTIDAD_DISP') ? 'rowColor' : 'rowNegro'; 
            } 
        } ;
        //////////
        me.txt_busqueda = Ext.create("App.Utils.Componente.TextFieldBase", { fieldLabel: "Buscar Materiales", width: 200, labelWidth: 100 })
        me.button = Ext.create('Ext.Button', {
            //text: 'Click me',
            text: 'Buscar',
            pressed: true,
            iconCls: 'zoom',
            tooltip: 'Buscar por Materiales',
            cls: 'botones',
            enableToggle: true,
            scope: this

        });
        me.btn_reporte = Ext.create('Ext.Button', {
            cls: 'botones',
            enableToggle: true,
            iconCls: 'report_go',
            tooltip: 'Reporte Total',
            scope: this,
            handler :  me.VerReporte
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
                                hidden: me.mostrarBotones,
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
                          hidden: me.mostrarBotones,
                          tooltip: 'Agregar',
                          scope: this,
                          handler: function () {

                              this.Crear();
                          }
                      },
                      {
                          iconCls: 'application_form_edit',
                          hidden: me.mostrarBotones,
                          tooltip: 'Editar',
                          scope: this,
                          handler: function () {
                              this.Editar();
                          }
                      },
                      {
                          iconCls: 'delete',
                          hidden: me.mostrarBotones,
                          tooltip: 'Eliminar',
                          scope: this,
                          handler: function () {
                              this.Eliminar();
                          }
                      },
                      me.btn_reporte

           ]
        }];
        //////////////////////////
        me.txt_busqueda.on('specialkey', this.buscarEnterCodigo, this);
        me.button.on('click', this.buscarBotonCodigo, this);
        if (me.gridIngreso != null) {
            me.on('celldblclick', me.CargarGridIngreso, this);
        }
        if (me.gridDetalleSalida != null) {
            me.on('celldblclick', me.CargarGridDetalleSalida, this);
        }
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
    Guardar: function () {
        var me = this;
        var form = me.form.getForm();

        if (form.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar los cambios', function (btn) {

                if (btn == 'yes') {
                    me.form.el.mask('Procesando...', 'x-mask-loading');
                    form.submit({
                        submitEmptyText: false,
                        url: host+'MateriasPrima/CrearMateriaPrima',
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
                        url: host+'MateriasPrima/EliminarMateriaPrima',
                        params: { ID_MATERIA_PRIMA: data.get('ID_MATERIA_PRIMA') },
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
    CargarGridIngreso: function (grid, cell, col, record) {
        var me = this;

        if (me.gridIngreso.idIngreso != 0 && me.gridIngreso.estadoIngreso != 'CONTABILIZADO') {
            var rec = Ext.create('App.Ingresos.Model.DetallesIngreso', {
                ID_DETALLE_INGRESO: 0,
                ID_MATERIA_PRIMA: record.data['ID_MATERIA_PRIMA'],
                DESCRIPCION: record.data['NOMBRE'] + ' ' + record.data['CALIDAD'],
                UNIDAD: record.data['UNIDAD'],
                COLOR: record.data['COLOR'],
                CANTIDAD: 1,
                COSTO: 0,
                TOTAL: 0

            });
            me.gridIngreso.store.insert(0, rec);

        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un Ingreso o Verifique que el ingreso No Este Contabilizado...');
        }
    },
    CargarGridDetalleSalida: function (grid, cell, col, record) {
        var me = this;
        if (me.gridDetalleSalida.idIngreso != 0 && me.gridDetalleSalida.estadoIngreso != 'CONTABILIZADO') {
            var rec = Ext.create('App.Salidas.Model.DetallesSalida', {
                ID_DETALLE_SALIDA: 0,
                ID_MATERIA_PRIMA: record.data['ID_MATERIA_PRIMA'],
                DESCRIPCION: record.data['NOMBRE'] + ' ' + record.data['CALIDAD'],
                UNIDAD: record.data['UNIDAD'],
                CANTIDAD: 1,
                OBSERVACION :'SIN OBSERVACION'
            });
            me.gridDetalleSalida.store.insert(0, rec);
            me.gridDetalleSalida.cambiarTotal();

        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Una Salida o Verifique que la Salida No Este Contabilizado...');
        }
    }
    ////////////////////////// 
});
