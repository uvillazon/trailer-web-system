Ext.define("App.Designaciones.View.Forms", {
    extend: "Ext.form.Panel",
    title: "Registe de Datos",
    layout: {
        type: 'table',
        columns: 2
    },
    bodyPadding: 10,
    fieldDefaults : {
        margin: '2',
        align:'left',
        labelWidth: 110,
    },
    autoScroll : true,
    opcion : '',
    controlador : 'Designaciones',
    accionCrearMaterial : 'CrearMaterial',
    accionEliminar : 'EliminarDesignacion',
    accionCrearCancelacion : 'CrearCancelacion',
    accionCrearEntregado : 'CrearEntrega',
    initComponent: function () {
        var me = this;
        if(me.opcion == ''){
            me.CargarStore();
            me.CargarComponentes();
        }
        else if (me.opcion == 'EditarDetalleMaterial'){
           me.store_responsable = Ext.create('App.Empleados.Store.Empleados',{pageSize : 2000, autoLoad : true});
           me.CargarComponentesEditar();
        }
        else if (me.opcion == 'DetalleCancelacion'){
           me.store_responsable = Ext.create('App.Empleados.Store.Empleados',{pageSize : 2000, autoLoad : true});
           me.CargarComponentesCancelacion();
        }
        else if (me.opcion == 'DetalleEntregado'){
           me.store_responsable = Ext.create('App.Empleados.Store.Empleados',{pageSize : 2000, autoLoad : true});
           me.CargarComponentesEntregado();
        }
        else
        {
            alert('designacion');
        }
        this.callParent(arguments);

    },
    CargarStore : function(){
        var me= this;
        me.store_responsable = Ext.create('App.Empleados.Store.Empleados',{pageSize : 2000, autoLoad : true});
        me.store_material = Ext.create("App.MateriasPrima.Store.MateriasPrima");
//        me.store_orden.proxy.extraParams['codigo'] = 'CODIGO';
    },
    CargarComponentes : function(){
        var me= this;
        me.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: "ID_DETALLE",
            hidden: true,
        });
        me.cbx_material = Ext.create('App.Utils.Componente.ComboBase', {
            fieldLabel: 'Buscar Material',
            name : 'ID_MATERIA_PRIMA',
            store: me.store_material,
            displayField: 'NOMBRE',
            valueField: 'ID_MATERIA_PRIMA',
            width: 240,
            queryMode: 'remote',
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No existe Materiales.',
                getInnerTpl: function() {
                    return '' +
                        '<h3><span>{CATEGORIA} : {NOMBRE} - {COLOR}</span></h3>' +
                        '{CARACTERISTICA}' +
                    '';
                }
            },
        });
        me.cbx_responsable = Ext.create("App.Utils.Componente.ComboBase", {
            fieldLabel: "Responsable",
            name: "RESPONSABLE",
            displayField : 'NOMBRE',
            width: 240,
            store : me.store_responsable,
            selectOnFocus: true,
        });
        me.num_cantidad = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "Cantidad",
            name: "CANTIDAD",
            width: 240,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        me.dat_fecha = Ext.create("App.Utils.Componente.DateFieldBase", {
            opcion :"sin fecha",
            fieldLabel: "Fecha",
            name: "FECHA",
            width: 240,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        
        me.txt_observacion = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan : 2,
            maxLength: 150,
        });
        me.items = [
        me.txt_id,
//        me.txt_detalle,
//        me.txt_unidad,
        me.cbx_responsable,
        me.dat_fecha,
        me.cbx_material,
        me.num_cantidad,
       
        me.txt_observacion,
        ];
      
    },
    CargarComponentesCancelacion : function(){
        var me= this;
        me.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: "ID_DETALLE",
            hidden: true,
        });
        me.cbx_responsable = Ext.create("App.Utils.Componente.ComboBase", {
            fieldLabel: "Responsable",
            name: "RESPONSABLE",
            displayField : 'NOMBRE',
            width: 240,
            store : me.store_responsable,
            selectOnFocus: true,
        });
        me.num_cantidad = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "Cantidad",
            name: "CANTIDAD",
            width: 240,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            colspan : 2,
        });
        me.dat_fecha = Ext.create("App.Utils.Componente.DateFieldBase", {
            opcion :"sin fecha",
            fieldLabel: "Fecha",
            name: "FECHA",
            width: 240,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        
        me.txt_observacion = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan : 2,
            maxLength: 150,
        });
        me.items = [
        me.txt_id,
        me.cbx_responsable,
        me.dat_fecha,
        me.num_cantidad,
       
        me.txt_observacion,
        ];
      
    },
    CargarComponentesEntregado : function(){
        var me= this;
        me.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: "ID_DETALLE",
            hidden: true,
        });
        me.cbx_responsable = Ext.create("App.Utils.Componente.ComboBase", {
            fieldLabel: "Responsable",
            name: "RESPONSABLE",
            displayField : 'NOMBRE',
            width: 240,
            store : me.store_responsable,
            selectOnFocus: true,
        });
        me.num_cantidad = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "Cantidad Entregado",
            name: "CANTIDAD",
            width: 240,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            colspan : 2,
        });
        me.dat_fecha = Ext.create("App.Utils.Componente.DateFieldBase", {
            opcion :"sin fecha",
            fieldLabel: "Fecha",
            name: "FECHA",
            width: 240,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        
        me.txt_observacion = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan : 2,
            maxLength: 150,
        });
        me.items = [
        me.txt_id,
        me.cbx_responsable,
        me.dat_fecha,
        me.num_cantidad,
       
        me.txt_observacion,
        ];
      
    },
    CargarComponentesEditar : function(){
        var me= this;
        me.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: "ID_DETALLE",
            hidden: true,
        });
        me.txt_detalle = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "Detalle",
            name: "DETALLE",
            width: 240,
            maxLength: 50,
            disabled: true,
        });
        me.txt_unidad = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "Unidad",
            name: "UNIDAD",
            width: 240,
            maxLength: 50,
            disabled: true,
        });
        me.cbx_responsable = Ext.create("App.Utils.Componente.ComboBase", {
            fieldLabel: "Responsable",
            name: "RESPONSABLE",
            displayField : 'NOMBRE',
            width: 240,
            store : me.store_responsable,
            selectOnFocus: true,
        });
        me.num_cantidad = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "Cantidad",
            name: "CANTIDAD",
            width: 240,
            colspan : 2,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        me.dat_fecha = Ext.create("App.Utils.Componente.DateFieldBase", {
            opcion :"sin fecha",
            fieldLabel: "Fecha",
            name: "FECHA",
            width: 240,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        
        me.txt_observacion = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan : 2,
            maxLength: 150,
        });
        me.items = [
        me.txt_id,
        me.txt_detalle,
        me.txt_unidad,
        me.cbx_responsable,
        me.dat_fecha,
        me.num_cantidad,
        me.txt_observacion,
        ];
      
    },
   
    CrearMaterial : function(){
         var me = this;
        me.win = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 550, height: 200 });
        me.Form = me;
        me.win.add(me.Form);
        me.win.getBotonGuardar().on('click', me.GuardaMaterial, this);
        me.win.show();
    },
    GuardaMaterial : function(){
        var me = this;
        me.FormSend = me.getForm();

        if (me.FormSend.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar Los Datos?', function (btn) {

                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    me.FormSend.submit({
                        submitEmptyText: false,
                        url: host + '' + me.controlador + '/' + me.accionCrearMaterial + '',
                        params: { ID_DESIGNACION:me.data.get('ID_DESIGNACION') },
                        success: function (form, action) {
                            me.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.grid.getStore().load();
                            me.win.hide();
                        },
                        failure: function (form, action) {
                            me.el.unmask();
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
    EditarDesignacion : function(){
        var me = this;
        me.data = me.grid.getSelectionModel().getSelection()[0];
        if (me.data != null) {
            me.winCredito = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 820, height: 550 });
            me.FormPago = Ext.create("App.Designaciones.View.FormDesignacion");
            me.winCredito.add(me.FormPago);
            //        me.winCredito.getBotonGuardar().on('click', me.GuardaCorte, this);
            me.winCredito.show();
        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione un registro <br> para Editar..');
        }
    },
    EditarDetalleMaterial : function(){
        var me = this;
        me.data = me.grid.getSelectionModel().getSelection()[0];
        if (me.data != null) {
            me.win = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 550, height: 230 });
            me.Form = me;
            me.Form.loadRecord(me.data);
            me.win.add(me.Form);
            me.win.getBotonGuardar().on('click', me.GuardaMaterial, this);
            me.win.show();
        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione un registro <br> para Editar..');
        }
    },
    CrearDetalleCancelacion : function(){
        var me = this;
        me.win = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 550, height: 200 });
        me.Form = me;
        me.win.add(me.Form);
        me.win.getBotonGuardar().on('click', me.GuardaCancelacion, this);
        me.win.show();
    },
    EditarDetalleCancelacion : function(){
        var me = this;
        me.data = me.grid.getSelectionModel().getSelection()[0];
        if (me.data != null) {
            me.win = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 550, height: 230 });
            me.Form = me;
            me.Form.loadRecord(me.data);
            me.win.add(me.Form);
            me.win.getBotonGuardar().on('click', me.GuardaCancelacion, this);
            me.win.show();
        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione un registro <br> para Editar..');
        }
    },
    GuardaCancelacion : function(){
        var me = this;
        me.FormSend = me.getForm();

        if (me.FormSend.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar Los Datos?', function (btn) {

                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    me.FormSend.submit({
                        submitEmptyText: false,
                        url: host + '' + me.controlador + '/' + me.accionCrearCancelacion + '',
                        params: { ID_DESIGNACION:me.data.get('ID_DESIGNACION') },
                        success: function (form, action) {
                            me.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.grid.getStore().load();
                            me.win.hide();
                        },
                        failure: function (form, action) {
                            me.el.unmask();
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
    CrearDetalleEntregado : function(){
        var me = this;
        me.win = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 550, height: 200 });
        me.Form = me;
        me.win.add(me.Form);
        me.win.getBotonGuardar().on('click', me.GuardarEntregado, this);
        me.win.show();
    },
    EditarDetalleEntregado : function(){
        var me = this;
        me.data = me.grid.getSelectionModel().getSelection()[0];
        if (me.data != null) {
            me.win = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 550, height: 230 });
            me.Form = me;
            me.Form.loadRecord(me.data);
            me.win.add(me.Form);
            me.win.getBotonGuardar().on('click', me.GuardarEntregado, this);
            me.win.show();
        }
        else {
            Ext.MessageBox.alert('Aviso', 'Seleccione un registro <br> para Editar..');
        }
    },
    GuardarEntregado : function(){
        var me = this;
        me.FormSend = me.getForm();

        if (me.FormSend.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar Los Datos?', function (btn) {

                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    me.FormSend.submit({
                        submitEmptyText: false,
                        url: host + '' + me.controlador + '/' + me.accionCrearEntregado + '',
                        params: { ID_DESIGNACION:me.data.get('ID_DESIGNACION') },
                        success: function (form, action) {
                            me.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.grid.getStore().load();
                            me.win.hide();
                        },
                        failure: function (form, action) {
                            me.el.unmask();
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
});
