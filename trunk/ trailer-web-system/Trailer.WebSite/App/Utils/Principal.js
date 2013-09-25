Ext.define("App.Utils.Principal", {
    extend: "Ext.panel.Panel",
    alias: "widget.UtilsPrincipal",
    width: '100%',
    //resizable: true,
    height: 520,
    frame: true,
    layout: 'border',
    defaults: {
        split: true
    },
    controlador: 'Responsables',
    accionCrear: 'CreateResponsable',
    accionEliminar: 'Eliminar',
    accionCambioEstado: 'CambioEstado',
    //ventana para el formulario de baja + el titulo para la ventana de BAJA 
    FormEstado: null,
    winCambioEstado: null,
    winBaja: null,
    formBaja: null,
    tituloBaja: '',
    grid: null,
    form: null,
    winGaleria: null,
    panelGaleria: null,
    /*
    Estos dos propiedades Sirve para cargar las galeria de imagenes por ejemplo
    para puesto son lo siguiente
    equipoImagen : 'PUESTO',
    equipoId : 'ID_PUESTO'
    */
    equipoImagen: '',
    equipoId: '',

    view : '',
    //    initComponent: function () {
    //        var me = this;


    //        this.callParent(arguments);
    //    },
    //Metodo que carga Datos al FORMULARIO de los Datos del GRID
    CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
        var me = this;
        me.Formulario.getForm().reset();
        me.Formulario.Bloquear();
        me.Formulario.getForm().loadRecord(record);

    },

    //Metodo que Desbloquea el FORMULARIO
    Crear: function () {
        var me = this;
        me.Formulario.getForm().reset();
        me.Formulario.Desbloquear();
    },
    Limpiar: function () {
        var me = this;
        me.Formulario.getForm().reset();
        me.form.getForm().reset();

    },
    //para editar todos los formularios que tengan el motodo Editar
    EditarCod: function () {
        var me = this;
        me.data = me.grid.getSelectionModel().getSelection()[0];
        if (me.data != null && me.data.get('ESTADO')== 'ALTA') {
            me.Formulario.getForm().reset();
            me.Formulario.Desbloquear();
            me.Formulario.getForm().loadRecord(me.data);
            me.Formulario.codigomarca = me.data.get('MARCA');
            var rec = me.Formulario.store_marca.findRecord("VALOR", me.Formulario.codigomarca);
            me.Formulario.codigomarca = rec.get('CODIGO');
//            alert('salduso');

        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione un registro En Estado ALTA<br> para Editar..');
        }
    },
    //editar sirve solo para equipos 
    Editar: function () {
        var me = this;
        me.data = me.grid.getSelectionModel().getSelection()[0];
        if (me.data != null) {
            me.Formulario.getForm().reset();
            me.Formulario.Desbloquear();

            me.Formulario.getForm().loadRecord(me.data);
        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione un registro <br> para Editar..');
        }
    },
    Guardar: function () {
        var me = this;
        me.FormSend = me.Formulario.getForm();

        if (me.FormSend.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar Los Datos?', function (btn) {

                if (btn == 'yes') {
                    me.Formulario.el.mask('Procesando...', 'x-mask-loading');
                    me.FormSend.submit({
                        submitEmptyText: false,
                        url: host + '' + me.controlador + '/' + me.accionCrear + '',
                        //params: { COD_ELEMENTO: formReconectador.getCodigoElemento() },
                        success: function (form, action) {
                            me.Formulario.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.Formulario.Bloquear();
                            me.grid.getStore().load();
                        },
                        failure: function (form, action) {
                            me.Formulario.el.unmask();
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
    //metodo generico que cierra un ventana y resetea un formulario
    CerrarVentana: function (ventana, formulario) {
        formulario.getForm().reset();
        ventana.hide();
    },
    //Metodos Para Abrir el formulario de BAJA 
    //Solo funciona para Estado en CERTIFICACION PARA TODOS LOS EQUIPOS 
    //Caso contrario Se tiene que Sobre Escribir el metodo para mas validaciones falta terminar de implementar 
    //esto solo servi
    Baja: function () {
        var me = this;
        me.data = me.grid.getSelectionModel().getSelection()[0];
        if (me.data != null) {
            if (me.data.get('ESTADO') == "CERTIFICACION") {

                if (me.winBaja == null) {

                    me.winBaja = Ext.create("App.Utils.Ventana", { title: me.tituloBaja, width: 550, height: 580, y: 20, opcion: 'Botones' });
                    panelBaja = Ext.create("App.Capacitores.View.FormBajaCapacitores");
                    winBaja.add(panelBaja);

                }
                panelBaja.loadRecord(data);
                winBaja.show();
                winBaja.getBotonGuardar().on('click', GuardarBaja);
                winBaja.getBotonCerrar().on('click', CerrarBaja);
            }
            else {
                Ext.MessageBox.alert('Aviso', 'Seleccione Un Capacitor en Estado Certificacion...');
            }

        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione Un registro <br> Para Dar de Baja');
        }
    },
    GuardarBaja: function () {
        var me = this;
        me.FormSendBaja = me.formBaja.getForm();
        if (me.FormSendBaja.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro Dar de BAJA ', function (btn) {

                if (btn == 'yes') {
                    me.formBaja.el.mask('Procesando...', 'x-mask-loading');
                    me.FormSendBaja.submit({
                        submitEmptyText: false,
                        url: host + '' + me.controlador + '/' + me.accionBaja + '',
                        success: function (form, action) {
                            me.formBaja.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.CerrarVentana(me.winBaja, me.formBaja);
                            me.grid.getStore().load();
                        },
                        failure: function (form, action) {
                            me.formBaja.el.unmask();
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
    CargarOpcionConuslta: function () {
        var me = this;
        me.btn_imagen = Ext.create('Ext.Button', {
            text: 'Galeria <br> Imagen / Archivo',
            cls: 'floater',
            itemId: 'btn_imagen',
            iconCls: 'images',
            width: 100,
            iconAlign: 'right',
            scope: this,
            handler: function () {
                me.GaleriaArchivo();
            }

        });
        me.contenedor = Ext.create('Ext.container.Container', {
            layout: {
                type: 'hbox'
            },
            defaults: {
                margin: 2,
                style: {
                    padding: '2px'
                }
            },
            items: [me.btn_imagen]
        });
        me.OpcionesConsulta = Ext.widget('fieldset', {
            frame: true,
            width: 500,
            title: 'Opciones de Consulta',
            items: [me.contenedor]
        });
    },
    CargarOpcionMovimiento: function () {
        var me = this;

        me.contenedor = Ext.create('Ext.container.Container', {
            layout: {
                type: 'hbox'
            },
            defaults: {
                margin: 2,
                style: {
                    padding: '2px'
                }
            }
        });
        me.OpcionesConsulta = Ext.widget('fieldset', {
            frame: true,
            width: 500,
            title: 'Opciones Administrador',
            items: [me.contenedor]
        });
    },
    AgregarOpcionConsulta: function (cmp) {
        var me = this;
        me.contenedor.add(cmp);
    },
    GaleriaArchivo: function () {
        var me = this;
        me.dataImagen = me.grid.getSelectionModel().getSelection()[0];
        if (me.dataImagen != null) {
            if (me.winGaleria == null) {
                me.winGaleria = Ext.create("App.Utils.Ventana", { title: " Galeria de Archivos o Imagenes", width: 750, height: 500, y: 20 });
                me.panelGaleria = Ext.create("App.Imagen.View.GridImagen", { equipo: me.equipoImagen });
                me.winGaleria.add(me.panelGaleria);

            }
            var id = me.dataImagen.get(me.equipoId);
            me.panelGaleria.CargarImagen(me.dataImagen, id);
            me.winGaleria.show();
        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione Un registro <br> Para ver la Galeria de Archivos');
        }
    },
    GuardarCambioEstado: function () {
        var me = this;
        me.FormSendCambioEstado = me.FormEstado.getForm();
        if (me.FormSendCambioEstado.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar Los cambios? ', function (btn) {

                if (btn == 'yes') {
                    me.FormEstado.el.mask('Procesando...', 'x-mask-loading');
                    me.FormSendCambioEstado.submit({
                        submitEmptyText: false,
                        url: host + '' + me.controlador + '/' + me.accionCambioEstado + '',
                        success: function (form, action) {
                            me.FormEstado.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.formCambioEstado.getForm().reset();
                            me.CerrarVentana(me.winCambioEstado, me.FormEstado);
                            me.grid.getStore().load();
                        },
                        failure: function (form, action) {
                            me.FormEstado.el.unmask();
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
    ValidarBajaSubestacion: function (data) {
        if ((data.get('ESTADO') == "PRUEB_ENSAY") || (data.get('ESTADO') == "MTTO_REPAR")) {
            return true;
        }
        else {
            return false;
        }
    },
    ConsultaEquipo: function () {
        var me = this;
        var data = me.grid.getSelectionModel().getSelection()[0]
        if (data != null) {
            if (me.winConsulta == null) {
                me.winConsulta = Ext.create("App.Utils.Ventana", { title: "Consulta de Equipo", width: 770, height: 500, y: 20 });
                me.panelConsulta = Ext.create("App."+me.controlador+".View.TabPanelConsultaEquipo");
                me.winConsulta.add(me.panelConsulta);
                me.panelConsulta.CargarDatos(data);

            } else {

                me.panelConsulta.CargarDatos(data);
            }
            me.winConsulta.show();
        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione Un registro <br> Para ver la consulta');
        }

    },
    Eliminar: function () {
        var me = this;
        var data = me.grid.getSelectionModel().getSelection()[0];
        if (data != null) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    Ext.Ajax.request({
                        url: host+''+me.controlador+'/'+me.accionEliminar+'',
                        params: { ID: data.get(me.equipoId) },
                        success: function (response) {
                            me.el.unmask();
                            r = Ext.decode(response.responseText);
                            if (!r.success) {
                                Ext.MessageBox.alert('Error', r.msg);
                                return;
                            } else {
                                Ext.MessageBox.alert('Exito', r.msg);
                                me.grid.store.load();
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
});
