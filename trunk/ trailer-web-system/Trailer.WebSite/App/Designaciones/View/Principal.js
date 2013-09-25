Ext.define("App.Designaciones.View.Principal", {
    extend: "Ext.panel.Panel",
    alias: "widget.PanelPrincipal",
    width: 970,
    resizable: true,
    height: 570,
    frame: true,
    layout: 'border',
    //    title: 'Adminsitracion Cortes',
    defaults: {
        split: true
    },
    controlador : 'Designaciones',
    accionCrear : 'CrearDesignacion',
    accionEliminar : 'EliminarDesignacion',
    initComponent: function () {
        var me = this;

        me.toolbar = Ext.create('App.Utils.ToolBarMenu', { opcion: 'izquierda' });
        me.toolbar.crear.show().on('click', me.Crear, this);
        me.toolbar.editar.show().on('click', me.Editar, this);
        me.toolbar.eliminar.show().on('click', me.Eliminar, this);
        me.materiales = Ext.create('Ext.Button', {
            text: 'Agregar Materiales',
            iconCls: 'application_form_add',
            itemId: 'btn_ajuste',
            cls: 'botones',
        });
        me.cancelado = Ext.create('Ext.Button', {
            text: 'Cancelacion de Operacios',
            iconCls: 'application_form_add',
            cls: 'botones',
        });
        me.entregado = Ext.create('Ext.Button', {
            text: 'Entregas de Productos Terminados',
            iconCls: 'application_form_add',
            cls: 'botones',
        });
        me.materiales.on('click', me.AgregarMateriales, this);
        me.cancelado.on('click', me.AgregarCancelacion, this);
        me.entregado.on('click', me.AgregarEntregado, this);
        me.toolbar.add(me.materiales);
        me.toolbar.add(me.cancelado);
        me.toolbar.add(me.entregado);

        me.grid = Ext.create("App.Designaciones.View.GridDesignaciones", {
            region: 'center',
            width: '100%',
            height: '100%'
        });
        me.grid.addDocked(me.toolbar, 1);
        this.items = [me.grid];
        this.callParent(arguments);
    },
    Crear: function () {

        var me = this;
        me.winCredito = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 820, height: 550 });
        me.FormPago = Ext.create("App.Designaciones.View.FormDesignacion");
        me.winCredito.add(me.FormPago);
        //        me.winCredito.getBotonGuardar().on('click', me.GuardaCorte, this);
        me.winCredito.show();
    },
    Editar: function () {
       var me = this;
        me.data = me.grid.getSelectionModel().getSelection()[0];
        if (me.data != null) {
            me.win = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 820, height: 250 });
            me.Form = Ext.create("App.Designaciones.View.FormDesignacion",{opcion : 'EditarDesignacion'});
            me.Form.loadRecord(me.data);
            me.win.add(me.Form);
            me.win.getBotonGuardar().on('click', me.GuardarEditarDesignacion, this);
            me.win.show();
        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione un registro <br> para Editar..');
        }
    },
    GuardarEditarDesignacion : function(){
        var me = this;
        me.FormSend = me.Form.getForm();

        if (me.FormSend.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar Los Datos?', function (btn) {

                if (btn == 'yes') {
                    me.win.el.mask('Procesando...', 'x-mask-loading');
                    me.FormSend.submit({
                        submitEmptyText: false,
                        url: host + '' + me.controlador + '/' + me.accionCrear + '',
//                        params: { ID_DETALLE_ORDEN:me.item.get('ID_DETALLE_ORDEN') , TALLA : me.item.get('TALLA'),NRO_ORDEN : me.orden.get('NRO_ORDEN')},
                        success: function (form, action) {
                            me.win.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
//                            me.Formulario.Bloquear();
                            me.win.hide();
                            me.grid.getStore().load();
                        },
                        failure: function (form, action) {
                            me.win.el.unmask();
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
    Eliminar : function(){
        var me = this;
         var data = me.grid.getSelectionModel().getSelection()[0];
        if (data != null) {
            if (data.get('ID_DESIGNACION') != 0) {
                Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                    if (btn == 'yes') {
                        me.grid.el.mask('Procesando...', 'x-mask-loading');
                        Ext.Ajax.request({
                            url: host+''+me.controlador+'/'+me.accionEliminar+'',
                            params: { ID_DESIGNACION: data.get('ID_DESIGNACION')},
                            success: function (response) {
                                me.grid.el.unmask();
                                r = Ext.decode(response.responseText);
                                if (!r.success) {
                                    Ext.MessageBox.alert('Error', r.msg);
                                    return;
                                } else {
                                    Ext.MessageBox.alert('Exito', r.msg);
                                    me.grid.getStore().load();
                                }
                            },
                            failure: function (response) {
                                me.grid.el.unmask();
                                Ext.MessageBox.alert('Error', response.result.msg);
                            }
                        });

                    }
                });
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione Un registro para Eliminar');
            }

        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro para Eliminar');
        }
        
    },
    AgregarMateriales : function(){
        var me = this;
        me.data = me.grid.getSelectionModel().getSelection()[0];
        if (me.data != null) {
            me.win = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 820, height: 550 });
            me.Form = Ext.create("App.Designaciones.View.FormDesignacion",{opcion : 'DesignacionMaterial'});
            me.Form.loadRecord(me.data);
            me.Form.data = me.data;
            me.Form.grid_material.getStore().setExtraParam('condicion',me.data.get('ID_DESIGNACION'));
            me.Form.grid_material.getStore().setExtraParam('codigo','DESIGNACION');
            me.Form.grid_material.getStore().load();
            me.win.add(me.Form);
            me.win.getBotonGuardar().on('click', me.GuardarDesignacionMaterial, this);
            me.win.show();
        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione un registro <br> para Editar..');
        }
    },
    AgregarCancelacion : function(){
        var me = this;
        me.data = me.grid.getSelectionModel().getSelection()[0];
        if (me.data != null) {
            me.win = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 820, height: 550 });
            me.Form = Ext.create("App.Designaciones.View.FormDesignacion",{opcion : 'DesignacionDetalleCancelado'});
            me.Form.loadRecord(me.data);
            me.Form.data = me.data;
            me.Form.grid_material.getStore().setExtraParam('condicion',me.data.get('ID_DESIGNACION'));
            me.Form.grid_material.getStore().setExtraParam('codigo','DESIGNACION');
            me.Form.grid_material.getStore().load();
            me.win.add(me.Form);
            me.win.getBotonGuardar().on('click', me.GuardarDesignacionMaterial, this);
            me.win.show();
        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione un registro <br> para Editar..');
        }
    },
    AgregarEntregado : function(){
        var me = this;
        me.data = me.grid.getSelectionModel().getSelection()[0];
        if (me.data != null) {
            me.win = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 820, height: 550 });
            me.Form = Ext.create("App.Designaciones.View.FormDesignacion",{opcion : 'DesignacionDetalleEntrega'});
            me.Form.loadRecord(me.data);
            me.Form.data = me.data;
            me.Form.grid_material.getStore().setExtraParam('condicion',me.data.get('ID_DESIGNACION'));
            me.Form.grid_material.getStore().setExtraParam('codigo','DESIGNACION');
            me.Form.grid_material.getStore().load();
            me.win.add(me.Form);
            me.win.getBotonGuardar().on('click', me.GuardarDesignacionMaterial, this);
            me.win.show();
        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione un registro <br> para Editar..');
        }
    }
    //    Guardar
});