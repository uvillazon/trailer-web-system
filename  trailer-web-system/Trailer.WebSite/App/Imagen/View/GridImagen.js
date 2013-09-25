Ext.define("App.Imagen.View.GridImagen", {
    extend: "Ext.grid.Panel",
    height: 400,
    //collapsible: true,
    // width: 520,
    margins: '0 2 0 0',
    data: null,
    disableSelection: false,
    equipo: '',
    idequipo: '',
    initComponent: function () {
        var me = this;
        var store = Ext.create('App.Imagen.Store.ImagenEquipo');
        this.winView = Ext.create("App.Utils.Ventana", { width: 800, height: 600, y: 20, resizable: true, draggable: true });
        this.win = Ext.create("App.Utils.Ventana", { height: 190, opcion: 'Botones' });
        this.form1 = Ext.create("App.Utils.FormArchivo", { equipo: me.equipo });
        me.columns = [
            { header: 'Nro', xtype: 'rownumberer', width: 30, sortable: false },
            { header: "Imagen", flex: 1, renderer: me.renderIcon, dataIndex: 'ID', sortable: true },
            { header: 'Descripción', dataIndex: 'DESCRIPCION', width: 100 },
            { header: 'Fecha', dataIndex: 'FECHA_REG', width: 100, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: 'Tamaño (Mb)', dataIndex: 'TAMANO', width: 100, renderer: Ext.util.Format.numberRenderer('0.000') },
            { header: 'Extension', dataIndex: 'EXTENSION', width: 100 },
        ];

        me.win.getBotonGuardar().on('click', this.Guardar, this);
        this.win.add(this.form1);
        this.store = store;
        //this.store.setBaseParam('condicion', me.equipo);
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-add',
                text: 'Agregar',
                scope: this,
                handler: this.onCreate
            }, {
                iconCls: 'icon-delete',
                text: 'Eliminar',
                scope: this,
                handler: this.onDelete
            }, {
                iconCls: 'images',
                text: 'Ver Archivo',
                scope: this,
                handler: this.onView
            }

            ]
        }];
        this.callParent(arguments);
    },
    onCreate: function () {
        var me = this;
        me.win.show();
        //me.win.getBotonCerrar().on('click', CerrarBaja);
    },
    //    getForm: function () {
    //        return this.form1.getForm();
    //    },
    //    getButton: function () {
    //        return this.win.getBotonGuardar();
    //    },
    CargarImagen: function (data, id) {
        var me = this;
        me.data = data;
        me.idequipo = id;
        //me.store.load();
        me.store.load({ params: { condicion: me.equipo, ID: me.idequipo} });
    },
    onView: function () {
        var me = this;
        var val = me.getSelectionModel().getSelection()[0];
        if (val != null) {
            me.winView.removeAll(true);
            var pdf = val.get('ID');
            if (val.get('EXTENSION') == 'application/pdf') {
                //                me.winView.add([{ html: '<object width="100%" height="100%" data="GetPdf/' + pdf + '.pdf"></object>'}]);
                me.winView.add([{ html: '<iframe style="overflow:auto;width:100%;height:100%;"' +
        ' frameborder="0" ' +
        ' src="../Imagen/GetPdf/' + pdf + '"' +
        '></iframe>'
                }]);
                me.winView.show();
                me.winView.hide();
            }
            else {

                me.winView.add([{ html: '<object width="100%" height="100%" data="'+host+'Imagen/GetImage/?id=' + pdf + '&tamano=900"></object>'}]);
                me.winView.show();
            }

        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione Un registro <br> Para Ver el Archivo');
        }

    },
    Guardar: function () {
        var me = this;
        var form1 = me.form1.getForm();
        //alert(me.id);
        if (form1.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar Los cambios?', function (btn) {

                if (btn == 'yes') {
                    //                    me.form1.el.mask('Procesando...', 'x-mask-loading');
                    form1.submit({
                        // submitEmptyText: false,
                        url: host+'Imagen/Upload',

                        scope: me.form1,
                        params: { ID: me.idequipo },
                        waitMsg: 'Guardando ...',
                        success: function (form, action) {
                            Ext.MessageBox.alert('Exito', action.result.result);
                            me.win.hide();
                            me.form1.limpiarFormulario();
                            me.CargarImagen(me.data, me.idequipo);
                        },
                        failure: function (form, action) {
                            Ext.MessageBox.alert('Error', action.result.result);
                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }


    },
    onDelete: function () {
        var me = this;
        var direccion = host+"Imagen/EliminarImagen";
        var data = this.getSelectionModel().getSelection()[0];
        if (data != null) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar Esta Imagen o Archivo?', function (btn) {

                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    Ext.Ajax.request({
                        url: direccion,
                        params: { ID: data.get('ID'), ID_EQUIPO: me.idequipo },

                        success: function (response) {

                            me.el.unmask();

                            r = Ext.decode(response.responseText);
                            if (!r.success) {

                                Ext.MessageBox.alert('Error', r.msg);

                                return;
                            } else {
                                Ext.MessageBox.alert('Exito', r.msg);
                                me.CargarImagen(me.data, me.idequipo);

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
            Ext.MessageBox.alert('Error', 'Seleccione Un registro <br> Para eliminar Equipo');
        }
    },
    renderIcon: function (val, metaData, record) {
        var me = this;
        if (record.data.EXTENSION == "application/pdf") {
            return '<img src="'+host+'Content/Iconos/pdf_icon.png" />';
        }
        else {
            return '<img src="'+host+'Imagen/GetImage/?id=' + val + '&tamano=150"/>';
        }
    }

});