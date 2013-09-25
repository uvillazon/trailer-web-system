Ext.define("App.Designaciones.View.FormDesignacion", {
    extend: "Ext.form.Panel",
    title: "Registro de Designacion de Operarios",
    layout: {
        type: 'table',
        columns: 3
    },
    bodyPadding: 10,
    fieldDefaults : {
        margin: '2',
        align:'left',
        labelWidth: 110,
    },
    autoScroll : true,
    item : null,
    material : null,
    molde : null,
    opcion : '',
    controlador : 'Designaciones',
    accionCrear : 'CrearDesignacion',
    accionEliminar : 'EliminarDesignacion',
    accionEliminarMaterial : 'EliminarMaterial',
    accionEliminarCancelacion : 'EliminarCancelacion',
    accionEliminarEntrega : 'EliminarEntrega',
    initComponent: function () {
        var me = this;
        if(me.opcion == ''){
            me.CargarStore();
            me.CargarComponentes();
            me.AgregarEventos();
        }
        else if (me.opcion == 'EditarDesignacion'){
            me.CargarComponentesEditar();
            me.EventoCargarTotales();
        }
        else if (me.opcion == 'DesignacionMaterial'){
            me.CargarComponentesMaterial();
//            me.EventoCargarTotales();
        }
        else if (me.opcion == 'DesignacionDetalleCancelado'){
            me.CargarComponentesDetalleCancelado();
//            me.EventoCargarTotales();
        }
         else if (me.opcion == 'DesignacionDetalleEntrega'){
            me.CargarComponentesDetalleEntrega();
//            me.EventoCargarTotales();
        }
        else
        {
            alert('designacion');
        }
        this.callParent(arguments);

    },
    CargarStore : function(){
        var me= this;
        
        me.store_orden = Ext.create("App.OrdenesProduccion.Store.OrdenesProduccion");
        me.store_material = Ext.create("App.MateriasPrima.Store.MateriasPrima");

        me.store_item = Ext.create('App.OrdenesProduccion.Store.DetallesOrden');
        me.store_operario = Ext.create('App.Empleados.Store.Empleados');
        me.store_responsable = Ext.create('App.Empleados.Store.Empleados',{pageSize : 2000, autoLoad : true});
//        me.store_orden.proxy.extraParams['codigo'] = 'CODIGO';
    },
    CargarComponentes : function(){
        var me= this;
        me.cbx_orden = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Buscar OP',
            name : 'ID_ORDEN_PRODUCCION',
            typeAhead: false,
            store: me.store_orden,
            displayField: 'NRO_ORDEN',
            valueField: 'ID_ORDEN_PRODUCCION',
            hideTrigger:true,
            vtype: "uppercase",
            pageSize: 10,
            matchFieldWidth : false,
            forceSelection : true,
            editable : true,
            queryParam : 'condicion',
            minChars : 1,
            width: 240,
//            colspan : 3,
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No existe OP.',
                getInnerTpl: function() {
                    return '' +
                        '<h3><span>{NRO_ORDEN}<br /> Cliente: {TIPO_CLIENTE}</span></h3>' +
                        '{FECHA_RECEPCION}' +
                    '';
                }
            },
        });
        me.txt_recepcion = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Resp. Recepcion',
            name: 'RESPONSABLE_RECEPCION',
            width: 240, 
            readOnly: true,
            disabled : true,
            //margin: '10'
        });
        me.txt_cliente = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Cliente',
            name: 'TIPO_CLIENTE',
            width: 240,
            disabled : true,
            //margin: '10'
        });
       me.dat_fecha = Ext.create("App.Utils.Componente.DateFieldBase",{
            fieldLabel: 'Fecha Recepcion',
            name: 'FECHA_RECEPCION',
            disabledCls: 'DisabledClase',
            disabled : true,
            width: 240,
            opcion :'sinfecha',
        });

        me.dat_fecha_ent = Ext.create("Ext.form.DateField",{
            fieldLabel: 'Fecha Entrega',
            name: 'FECHA_ENTREGA',
            disabled : true,
            afterLabelTextTpl: c_requerido,
            disabledCls: 'DisabledClase',
           width: 240,
           opcion :'sinfecha',
        });
        me.txt_responsable = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Responsable',
            name: 'RESPONSABLE',
            width: 240,
            disabled : true
        });
        
        me.cbx_item = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_item,
            fieldLabel: 'Item OP',
            name: 'DETALLE_ITEM',
            displayField : 'ARTICULO',
            width: 240,
            colspan : 1,
            afterLabelTextTpl: c_requerido,
            selectOnFocus: true,
            matchFieldWidth : false,
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No existe Detalle OP.',
                getInnerTpl: function() {
                    return '' +
                        '<h3><span>Talla : {TALLA}</span></h3>' +
                        '{DESC}' +
                    '';
                }
            },
        });
        me.num_sastre = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "Sastre",
            name: "SASTRE",
            width: 240,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        me.num_hilo = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "Hilo",
            name: "HILO",
            width: 240,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
//            readOnly: true
        });
        me.cbx_operario = Ext.create('App.Utils.Componente.ComboBase', {
            fieldLabel: 'Operario',
            name : 'ID_EMPLEADO',
            store: me.store_operario,
            displayField: 'NOMBRE',
            valueField: 'ID_EMPLEADO',
            queryMode: 'remote',
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No existe OPERARIOS.',
                getInnerTpl: function() {
                    return '' +
                        '<h3>{NOMBRE}  {APELLIDO} - {CARGO}</h3>' +
                        'Descripcion :{DESCRIPCION}' +
                    '';
                }
            },
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
        me.num_total = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "Total",
            name: "TOTAL",
            width: 240,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            readOnly : true,
        });
        me.dat_fecha_entrega = Ext.create("App.Utils.Componente.DateFieldBase", {
            opcion :"sin fecha",
            limite : false,
            fieldLabel: "Fecha a Entregar",
            name: "FECHA_ENTREGA",
            width: 240,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        me.cbx_responsable = Ext.create("App.Utils.Componente.ComboBase", {
            fieldLabel: "Responsable",
            name: "RESPONSABLE",
            displayField: 'NOMBRE',
            width: 240,
//            colspan:2,
            store : me.store_responsable,
            selectOnFocus: true,
        });
        me.txt_observacion = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Observacion',
            name: 'OBSERVACION',
            width: 240
        });
        
        //Definimos datefield para la fecha de baja del documento 
        me.grid = Ext.create("App.Designaciones.View.GridDetallesDesignacion",{colspan :3 , txt_total : me.num_Importe , form : this});
        me.items = [
       
        me.cbx_orden,
        me.txt_recepcion,
        me.txt_cliente,
        me.dat_fecha,
        me.dat_fecha_ent,
        me.txt_responsable,
        me.cbx_item,
        me.num_sastre,
        me.num_hilo,
        me.cbx_operario,
        me.num_cantidad,
        me.num_total,
        me.dat_fecha_entrega,
        me.cbx_responsable,
        me.txt_observacion,
        me.grid
        ];
        
        me.grid.store.on('load', me.CargarTotales, this);
        me.grid.Crear.on('click',me.GuardarDesignacion,this);
        me.grid.Editar.on('click',me.EditarDesignacion,this);
        me.grid.Eliminar.on('click',me.EliminarItem,this);
        me.grid.Material.on('click',me.AgregarMaterial,this);
//        me.num_Importe.on('specialkey',me.CargarImportes,this);
//        me.grid.on('cellclick', me.CargarDatos, this);
//        me.grid.getStore().on('load',me.CargarTotales,this);
    },
    CargarComponentesMaterial : function(){
        var me = this;
//        alert('hola');
        me.CargarComponentesEditar(true);
        me.grid_material = Ext.create('App.Designaciones.View.Grids',{colspan : 3 });
       
        me.items = [
       
        me.txt_id,
        me.txt_nro_orden,
        me.txt_detalle_item,
        me.txt_talla,
        me.txt_operario,
        me.num_sastre,
        me.num_hilo,
        me.num_cantidad,
        me.num_total,
        me.dat_fecha_entrega,
        me.cbx_responsable,
        me.txt_observacion,
        me.grid_material
        ];
        me.grid_material.Crear.on('click',function(){
           me.form =  Ext.create('App.Designaciones.View.Forms' , {grid : me.grid_material});
           me.form.data = me.data;
           me.form.CrearMaterial();
        });
//        me.grid.Editar.on('click',me.EditarDetalleDesignacion,this);
        me.grid_material.Editar.on('click',function(){
           me.form =  Ext.create('App.Designaciones.View.Forms' , {grid : me.grid_material , opcion : 'EditarDetalleMaterial'});
           me.form.data = me.data;
           me.form.EditarDetalleMaterial();
        });
        me.grid_material.Eliminar.on('click',me.EliminarItemMaterial,this);
//        me.grid.Material.on('click',me.AgregarMaterial,this);
//        me.add(me.grid_material);
    },
    CargarComponentesDetalleCancelado : function(){
        var me = this;
        me.CargarComponentesEditar(true);
        me.grid_material = Ext.create('App.Designaciones.View.Grids',{colspan : 3 , opcion : 'DetalleCancelado' });
        me.txt_cantidad_entregado = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Cantidad Entregada',
            name: 'CANTIDAD_ENTREGADA',
            disabled : true,
            width: 240,
        });
        me.txt_cancelado = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Monto Cancelado',
            name: 'TOTAL_CANCELADO',
            disabled : true,
            width: 240,
            colspan :2,
        });
        me.items = [
       
        me.txt_id,
        me.txt_nro_orden,
        me.txt_detalle_item,
        me.txt_talla,
        me.txt_operario,
        me.num_sastre,
        me.num_hilo,
        me.num_cantidad,
        me.num_total,
        me.dat_fecha_entrega,
        me.cbx_responsable,
        me.txt_observacion,
        me.txt_cantidad_entregado,
        me.txt_cancelado,
        me.grid_material
        ];
        me.grid_material.Crear.on('click',function(){
           me.form =  Ext.create('App.Designaciones.View.Forms' , {grid : me.grid_material , opcion : 'DetalleCancelacion'});
           me.form.data = me.data;
           me.form.CrearDetalleCancelacion();
        });
//        me.grid.Editar.on('click',me.EditarDetalleDesignacion,this);
        me.grid_material.Editar.on('click',function(){
           me.form =  Ext.create('App.Designaciones.View.Forms' , {grid : me.grid_material , opcion : 'DetalleCancelacion'});
           me.form.data = me.data;
           me.form.EditarDetalleCancelacion();
        });
        me.grid_material.Eliminar.on('click',me.EliminarItemCancelacion,this);
//        me.grid.Material.on('click',me.AgregarMaterial,this);
//        me.add(me.grid_material);
    },
    CargarComponentesDetalleEntrega : function(){
        var me = this;
        me.CargarComponentesEditar(true);
        me.grid_material = Ext.create('App.Designaciones.View.Grids',{colspan : 3 , opcion : 'DetalleEntrega' });
        me.txt_cantidad_entregado = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Cantidad Entregada',
            name: 'CANTIDAD_ENTREGADA',
            disabled : true,
            width: 240,
        });
        me.txt_cancelado = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Monto Cancelado',
            name: 'TOTAL_CANCELADO',
            disabled : true,
            width: 240,
            colspan :2,
        });
        me.items = [
       
        me.txt_id,
        me.txt_nro_orden,
        me.txt_detalle_item,
        me.txt_talla,
        me.txt_operario,
        me.num_sastre,
        me.num_hilo,
        me.num_cantidad,
        me.num_total,
        me.dat_fecha_entrega,
        me.cbx_responsable,
        me.txt_observacion,
        me.txt_cantidad_entregado,
        me.txt_cancelado,
        me.grid_material
        ];
        me.grid_material.Crear.on('click',function(){
           me.form =  Ext.create('App.Designaciones.View.Forms' , {grid : me.grid_material , opcion : 'DetalleEntregado'});
           me.form.data = me.data;
           me.form.CrearDetalleEntregado();
        });
//        me.grid.Editar.on('click',me.EditarDetalleDesignacion,this);
        me.grid_material.Editar.on('click',function(){
           me.form =  Ext.create('App.Designaciones.View.Forms' , {grid : me.grid_material , opcion : 'DetalleEntregado'});
           me.form.data = me.data;
           me.form.EditarDetalleEntregado();
        });
        me.grid_material.Eliminar.on('click',me.EliminarItemEntregado,this);
//        me.grid.Material.on('click',me.AgregarMaterial,this);
//        me.add(me.grid_material);
    
    },
    CargarComponentesEditar : function(dis = false){
        var me = this;
        me.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: "ID_DESIGNACION",
            hidden: true,
        });

        me.txt_nro_orden = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "Nro_orden",
            name: "NRO_ORDEN",
            width: 240,
            maxLength: 10,
            afterLabelTextTpl: c_requerido,
            disabled : true,
        });
        me.txt_detalle_item = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "Detalle Item OP",
            name: "DETALLE_ITEM",
            width: 240,
            maxLength: 500,
            afterLabelTextTpl: c_requerido,
            disabled : true,
        });
        me.txt_talla = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "TALLA",
            name: "TALLA",
            width: 240,
            maxLength: 20,
            afterLabelTextTpl: c_requerido,
            disabled : true,
        });
        me.txt_operario = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "Operario",
            name: "OPERARIO",
            width: 240,
            maxLength: 20,
            afterLabelTextTpl: c_requerido,
            disabled : true,
        });
        me.num_sastre = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "Sastre",
            name: "SASTRE",
            width: 240,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            disabled : dis,
        });
        me.num_hilo = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "Hilo",
            name: "HILO",
            width: 240,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
            readOnly: true,
            disabled : dis,
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
            disabled : dis,
        });
        me.num_total = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "Total",
            name: "TOTAL",
            width: 240,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            readOnly : true,
            disabled : dis,
        });
        me.dat_fecha_entrega = Ext.create("App.Utils.Componente.DateFieldBase", {
            opcion :"sin fecha",
            limite : false,
            fieldLabel: "Fecha a Entregar",
            name: "FECHA_ENTREGA",
            width: 240,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            disabled : dis,
        });
        me.cbx_responsable = Ext.create("App.Utils.Componente.ComboBase", {
            fieldLabel: "Responsable",
            name: "RESPONSABLE",
            displayField: 'NOMBRE',
            width: 240,
//            colspan:2,
            store : me.store_responsable,
            selectOnFocus: true,
            disabled : dis,
        });
        me.txt_observacion = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Observacion',
            name: 'OBSERVACION',
            width: 480,
            colspan : 2,
            disabled : dis,
        });
        
        //Definimos datefield para la fecha de baja del documento 
        me.items = [
       
        me.txt_id,
        me.txt_nro_orden,
        me.txt_detalle_item,
        me.txt_talla,
        me.txt_operario,
        me.num_sastre,
        me.num_hilo,
        me.num_cantidad,
        me.num_total,
        me.dat_fecha_entrega,
        me.cbx_responsable,
        me.txt_observacion,
        ];
    
    },
     CargarTotales: function (n) {
        var me = this;
        var total = 0;
        me.num_total.setValue(me.num_cantidad.getValue() *  me.num_sastre.getValue());
    },
    
    AgregarEventos : function(){
        var me = this;
        me.cbx_orden.on('select', function (cmb, record, index) {
                me.getForm().loadRecord(record[0]);
                me.store_item.setExtraParam('condicion', record[0].get('ID_ORDEN_PRODUCCION'));
                me.store_item.setExtraParam('codigo', 'OP');
                me.store_item.load();
                me.grid.getStore().setExtraParam('condicion', record[0].get('ID_ORDEN_PRODUCCION'));
                me.orden = record[0];
//                ITEMORDENPRODUCCION
//                me.grid.getStore().setExtraParam('condicion', record[0].get('ID_ORDEN_PRODUCCION'));
//                me.grid.getStore().setExtraParam('codigo', 'ORDENPRODUCCION'); 
//                me.grid.getStore().load();
        });
        me.cbx_item.on('select', function (cmb, record, index) {
            me.item  = record[0];
            me.num_sastre.setValue(me.item.get('SASTRE'));
            me.num_hilo.setValue(me.item.get('HILO'));
            me.num_cantidad.setValue(me.item.get('CANTIDAD') - me.item.get('CANTIDAD_A_PRODUCIR'));
            me.num_total.setValue(me.item.get('SASTRE') * me.num_cantidad.getValue());
//            alert(me.item.get('ID_DETALLE_ORDEN'))
//            me.grid.getStore().setExtraParam('codigo', 'ITEMORDENPRODUCCION'); 
//            me.grid.getStore().setExtraParam('condicion', record[0].get('ID_DETALLE_ORDEN'));
//            
//            me.grid.getStore().load();
//            me.AgregarItem();

        });
         me.cbx_operario.on('select', function (cmb, record, index) {
            me.operario  = record[0];
            me.grid.getStore().setExtraParam('condicion', me.operario.get('ID_EMPLEADO')); 
            me.grid.getStore().setExtraParam('codigo', 'OPERARIO');
            me.grid.getStore().load(); 
            
        });
        me.EventoCargarTotales();
        
    },
    EventoCargarTotales : function(){
        var me = this;
        me.num_cantidad.on('change',me.CargarTotales,this);
        me.num_sastre.on('change',me.CargarTotales,this);
    },
    EliminarItem : function(){
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
    GuardarDesignacion : function(){
        var me = this;
        me.FormSend = me.getForm();

        if (me.FormSend.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar Los Datos?', function (btn) {

                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    me.FormSend.submit({
                        submitEmptyText: false,
                        url: host + '' + me.controlador + '/' + me.accionCrear + '',
                        params: { ID_DETALLE_ORDEN:me.item.get('ID_DETALLE_ORDEN') , TALLA : me.item.get('TALLA'),NRO_ORDEN : me.orden.get('NRO_ORDEN')},
                        success: function (form, action) {
                            me.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
//                            me.Formulario.Bloquear();
                            me.grid.getStore().load();
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
    AgregarMaterial : function(){
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
                            me.win.hide();
//                            me.Formulario.Bloquear();
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
    EliminarItemMaterial : function(){
        var me = this;
         var data = me.grid_material.getSelectionModel().getSelection()[0];
        if (data != null) {
            if (data.get('ID_DETALLE') != 0) {
                Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                    if (btn == 'yes') {
                        me.grid_material.el.mask('Procesando...', 'x-mask-loading');
                        Ext.Ajax.request({
                            url: host+''+me.controlador+'/'+me.accionEliminarMaterial+'',
                            params: { ID_DETALLE: data.get('ID_DETALLE')},
                            success: function (response) {
                                me.grid_material.el.unmask();
                                r = Ext.decode(response.responseText);
                                if (!r.success) {
                                    Ext.MessageBox.alert('Error', r.msg);
                                    return;
                                } else {
                                    Ext.MessageBox.alert('Exito', r.msg);
                                    me.grid_material.getStore().load();
                                }
                            },
                            failure: function (response) {
                                me.grid_material.el.unmask();
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
    EliminarItemCancelacion : function(){
        var me = this;
         var data = me.grid_material.getSelectionModel().getSelection()[0];
        if (data != null) {
            if (data.get('ID_DETALLE') != 0) {
                Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                    if (btn == 'yes') {
                        me.grid_material.el.mask('Procesando...', 'x-mask-loading');
                        Ext.Ajax.request({
                            url: host+''+me.controlador+'/'+me.accionEliminarCancelacion+'',
                            params: { ID_DETALLE: data.get('ID_DETALLE')},
                            success: function (response) {
                                me.grid_material.el.unmask();
                                r = Ext.decode(response.responseText);
                                if (!r.success) {
                                    Ext.MessageBox.alert('Error', r.msg);
                                    return;
                                } else {
                                    Ext.MessageBox.alert('Exito', r.msg);
                                    me.grid_material.getStore().load();
                                }
                            },
                            failure: function (response) {
                                me.grid_material.el.unmask();
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
    EliminarItemEntrega : function(){
        var me = this;
         var data = me.grid_material.getSelectionModel().getSelection()[0];
        if (data != null) {
            if (data.get('ID_DETALLE') != 0) {
                Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                    if (btn == 'yes') {
                        me.grid_material.el.mask('Procesando...', 'x-mask-loading');
                        Ext.Ajax.request({
                            url: host+''+me.controlador+'/'+me.accionEliminarEntrega+'',
                            params: { ID_DETALLE: data.get('ID_DETALLE')},
                            success: function (response) {
                                me.grid_material.el.unmask();
                                r = Ext.decode(response.responseText);
                                if (!r.success) {
                                    Ext.MessageBox.alert('Error', r.msg);
                                    return;
                                } else {
                                    Ext.MessageBox.alert('Exito', r.msg);
                                    me.grid_material.getStore().load();
                                }
                            },
                            failure: function (response) {
                                me.grid_material.el.unmask();
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
        
    }
});
