Ext.define("App.OrdenesProduccion.View.FormOrdenProduccion", {
    extend: "Ext.form.Panel",
    title: "Datos Generales de Orden Produccion",
    layout: {
        type: 'table',
        columns: 2
    },
    iconCls : 'application_form_add',
    bodyPadding: 10,
    fieldDefaults : {
        margin: '2',
        align:'left',
        labelWidth: 70,
    },
    initComponent: function () {
        var me = this;
        
        this.bto_limpiar = Ext.create('Ext.Button', {
             text: 'Limpiar',
             itemId :'limpiar_rec',
             width: 120,
             textAlign: 'center',
             iconCls: 'cross',
             margin : 10,
             hidden : true

        });
        this.bto_guardar = Ext.create('Ext.Button', {
             text: 'Guardar',
             itemId:'guardar_rec',
             width: 120,
             textAlign: 'center',
             iconCls: 'disk',
             margin : 10,
             hidden : true

        });
        this.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: 'ID_ORDEN_PRODUCCION',
            hidden: true
        });
        //Definimos serie 
        me.txt_codigo = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Nro. OP',
            name: 'NRO_ORDEN',
            allowBlank: false,
            width: 220,
            afterLabelTextTpl: c_requerido,
            
        });
        
        
        me.store_encargado = Ext.create('App.Empleados.Store.Empleados',{pageSize : 3000}).load();
        me.cbx_encargado = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_encargado,
            fieldLabel: 'Resp. Recepcion',
            name: 'RESPONSABLE_RECEPCION',
            displayField : 'NOMBRE',
            width: 220,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });
        me.dat_fecha = Ext.create("App.Utils.Componente.DateFieldBase",{
            fieldLabel: 'Fecha Recepcion',
            name: 'FECHA_RECEPCION',
            allowBlank: false,
            afterLabelTextTpl: c_requerido,
            
            width: 220
        });

        me.dat_fecha_ent = Ext.create("Ext.form.DateField",{
            fieldLabel: 'Fecha Entrega',
            name: 'FECHA_ENTREGA',
            allowBlank: false,
            afterLabelTextTpl: c_requerido,
            disabledCls: 'DisabledClase',
            width: 220
        });
        
        
        me.txt_descripcion= Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: 'Observaciones',
            name: 'OBSERVACION',
            height:100,
            width :440,
            colspan :2,
            
        });
        me.cbx_tipo_cliente = Ext.create("App.Utils.Componente.ComboBase", {
            store: ["CLIENTE","EMPRESA"],
            fieldLabel: 'Tipo Cliente',
//            name: 'TIPO_CLIENTE1',
            width: 220,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });
        me.cbx_tipo_cliente.on('select', function (cmb, record, index) {
                if(cmb.getValue() == 'CLIENTE')
                {
                   me.cbx_cliente.setDisabled(false);
                   me.cbx_empresa.setDisabled(true);
                   me.cbx_responsable.setDisabled(true);
                   me.cbx_empresa.clearValue();
                   me.cbx_responsable.clearValue();
                   // me.txt_propietario.setReadOnly(true);
                }
                else{
                    me.cbx_cliente.setDisabled(true);
                    me.cbx_cliente.clearValue();
                    me.cbx_empresa.setDisabled(false);
                    me.cbx_responsable.setDisabled(false);
                } 
        });
        me.store_cliente = Ext.create('App.Clientes.Store.Clientes',{pageSize : 3000}).load();
        me.cbx_cliente = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_cliente,
            fieldLabel: 'Cliente',
            name: 'CLIENTE',
            displayField : 'NOMBRE',
            width: 220,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });

        me.store_empresa = Ext.create('App.Empresas.Store.Empresas',{pageSize : 3000}).load();
        me.cbx_empresa = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_empresa,
            fieldLabel: 'Empresa',
            name: 'EMPRESA',
            displayField : 'NOMBRE',
            width: 220,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });
        me.cbx_empresa.on('select', function (cmb, record, index) {
            me.cbx_responsable.clearValue();
            me.store_res.proxy.extraParams['condicion'] = record[0].get('ID_EMPRESA');
            me.store_res.load();
        });


        me.store_res = Ext.create('App.Responsables.Store.Responsables',{pageSize : 3000});
        me.cbx_responsable = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_res,
            fieldLabel: 'Responsable',
            name: 'RESPONSABLE',
            displayField : 'NOMBRE',
            width: 220,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });

        me.txt_Total = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Total',
            name: 'TOTAL',
            disabled: true,
            width: 220,
            hidden : true
        });
        me.txt_Total_can = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Total Cantidad',
            name: 'NRO_INGRESO',
            disabled: true,
            width: 220,
            hidden : true
        });
        //////////////////////////////
        this.items = [
            this.txt_id,
            me.txt_codigo,
            me.cbx_encargado,
            me.dat_fecha,
            me.dat_fecha_ent,
            me.cbx_tipo_cliente,
            me.cbx_cliente,
            me.cbx_empresa,
            me.cbx_responsable,
            me.txt_descripcion,
            me.txt_Total,
            me.txt_Total_can
            ];
        this.buttons = [this.bto_guardar,this.bto_limpiar];
        this.callParent(arguments);

    } ,
    getBotonGuardar : function (){return this.bto_guardar;},
    getBotonLimpiar : function (){return this.bto_limpiar;},
    Limpiar : function(){
        var me = this;
        me.getForm().reset();
       
    },
    Bloquear: function () {
        var me = this;
        BloquearForm(me);
        this.bto_guardar.hide();
        this.bto_limpiar.hide()
    },
    Desbloquear: function () {
        var me = this;
        DesbloquearForm(me);
        this.bto_guardar.show();
        this.bto_limpiar.show()
       
    },
    CargarDatos : function(data){
        var me = this;
        me.getForm().loadRecord(data);
        me.data = data;
//        alert(me.data.get('CLIENTE'));
        if(me.data.get('CLIENTE')!=''){
                   me.cbx_cliente.setDisabled(false);
                   me.cbx_empresa.setDisabled(true);
                   me.cbx_responsable.setDisabled(true);
                   me.cbx_empresa.clearValue();
                   me.cbx_responsable.clearValue();
        
        }
        else{
                me.cbx_cliente.setDisabled(true);
                me.cbx_cliente.clearValue();
                me.cbx_empresa.setDisabled(false);
                me.cbx_responsable.setDisabled(false);
        }
//        me.cbx_tipo_cliente.on('select', function (cmb, record, index) {
//                if(cmb.getValue() == 'CLIENTE')
//                {
//                   me.cbx_cliente.setDisabled(false);
//                   me.cbx_empresa.setDisabled(true);
//                   me.cbx_responsable.setDisabled(true);
//                   me.cbx_empresa.clearValue();
//                   me.cbx_responsable.clearValue();
//                   // me.txt_propietario.setReadOnly(true);
//                }
//                else{
//                    me.cbx_cliente.setDisabled(true);
//                    me.cbx_cliente.clearValue();
//                    me.cbx_empresa.setDisabled(false);
//                    me.cbx_responsable.setDisabled(false);
//                } 
//        });
    }
});
