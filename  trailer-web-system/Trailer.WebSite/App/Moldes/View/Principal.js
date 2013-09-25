Ext.define("App.Moldes.View.Principal", {
    extend: "App.Utils.Principal",
    alias: "widget.PanelPrincipalRtus",
    controlador: 'Moldes',
    accionCrear: 'CrearMolde',
    accionEliminar: 'EliminarMolde',
    accionAjsute : 'CrearAjusteMolde',
    equipoImagen: 'MOLDES',
    equipoId: 'ID_MOLDE',
    view: '',
    initComponent: function () {
        var me = this;
//        alert(me.view);
//        if (me.view == 'Inventario') {
            me.CargarComponentes();
//        }
//        else{
//            alert('aaa');
//        }

        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.toolbar = Ext.create('App.Utils.ToolBarMenu', { opcion: '' });
        me.toolbar.crear.show().on('click', me.Crear, this);
        me.toolbar.editar.show().on('click', me.Editar, this);
        me.toolbar.eliminar.show().on('click', me.Eliminar, this);
        me.toolbar.imagen.show().on('click', me.Imagen, this);
        me.toolbar.ajuste.show().on('click', me.Ajuste, this);

        me.grid = Ext.create('App.'+me.controlador+'.View.Grid'+me.controlador, {
            region: 'west',
            width: '45%',
        });
        me.grid.addDocked(me.toolbar, 1);
        me.form = Ext.create('App.Utils.FormDerecha', {
            region: 'center',
            width: '50%'
        });

        me.CargarOpcionConuslta();
        me.Formulario = Ext.create("App."+me.controlador+".View.FormMolde");
        me.Formulario.Bloquear();
        me.Formulario.bto_guardar.on('click', me.Guardar, this);
        me.form.add(me.Formulario);

        this.items = [me.grid, me.form];
        me.grid.on('cellclick', me.CargarDatos, this);

    },
    Imagen: function () {
        var me = this;
        var data = me.grid.getSelectionModel().getSelection()[0]
        if (data != null) {
            me.winGaleria = Ext.create("App.Utils.Ventana", { title: " Galeria de Archivos o Imagenes", width: 750, height: 500, y: 20 });
            me.panelGaleria = Ext.create("App.Imagen.View.GridImagen", { equipo: me.equipoImagen });
            me.winGaleria.add(me.panelGaleria);
//            alert(me.equipoId);
            var id = data.get(me.equipoId);
            me.panelGaleria.CargarImagen(data, id);
            me.winGaleria.show();
        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione Un registro <br> Para ver la Galeria de Archivos');
        }
    },
    Ajuste: function () {
        var me = this;
        me.data = me.grid.getSelectionModel().getSelection()[0];
        if (me.data != null) {
            me.winAjuste = Ext.create("App.Utils.Ventana", { title: " Ajuste de Moldes",opcion:'botones', width: 300, height: 250, y: 20 });
            me.panelAjuste = Ext.create("App.Moldes.View.FormAjuste");
            me.winAjuste.add(me.panelAjuste);
            me.winAjuste.bto_guardar.on('click', me.GuardarAjuste, this);
            me.panelAjuste.CargarDatos(me.data,false);
            me.winAjuste.show();
        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione un registro <br> para Registro de Ajustes..');
        }
    },
    GuardarAjuste : function(){
        var me = this;
        me.FormSend = me.panelAjuste.getForm();

        if (me.FormSend.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar Los Datos?', function (btn) {

                if (btn == 'yes') {
                    me.panelAjuste.el.mask('Procesando...', 'x-mask-loading');
                    me.panelAjuste.submit({
                        submitEmptyText: false,
                        url: host + '' + me.controlador + '/' + me.accionAjsute + '',
                        //params: { COD_ELEMENTO: formReconectador.getCodigoElemento() },
                        success: function (form, action) {
                            me.panelAjuste.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.grid.getStore().load();
                            me.winAjuste.hide();
                        },
                        failure: function (form, action) {
                            me.panelAjuste.el.unmask();
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
    //cargar componentes para principal Estado
  
});
