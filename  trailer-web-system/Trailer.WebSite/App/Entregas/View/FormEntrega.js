Ext.define("App.Entregas.View.FormEntrega", {
    extend: "Ext.form.Panel",
    title: "Datos Generales de Entrega",
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
            name: 'ID_ENTREGA',
            hidden: true
        });
        this.txt_id_op = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: 'ID_ORDEN_PRODUCCION',
            hidden: true
        });
        //Definimos serie 
        me.txt_op = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Nro. OP',
            name: 'NRO_ORDEN',
            width: 220,
            readOnly : true
        });
        
        
        me.store_encargado = Ext.create('App.Empleados.Store.Empleados',{pageSize : 3000}).load();
        me.cbx_encargado = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_encargado,
            fieldLabel: 'Resp. Entrega',
            name: 'RESPONSABLE',
            displayField : 'NOMBRE',
            width: 220,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
            colspan: 2
           // forceSelection: true,
      //      margin: '10'
        });

        me.txt_recibe = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Quien Recibe',
            name: 'QUIEN_RECIBE',
            width: 440,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            colspan: 2
        });

        me.dat_fecha = Ext.create("App.Utils.Componente.DateFieldBase",{
            fieldLabel: 'Fecha Entrega',
            name: 'FECHA_ENTREGA',
            allowBlank: false,
            afterLabelTextTpl: c_requerido,
            
            width: 220
        });
        
        me.txt_descripcion= Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: 'Observaciones',
            name: 'OBSERVACION',
            height:100,
            width :440,
            colspan :2,
            
        });

        //////////////////////////////
        this.items = [
            this.txt_id,
             me.txt_id_op,
             me.txt_op,
             me.dat_fecha,
             me.cbx_encargado,
             me.txt_recibe,
             me.txt_descripcion
            ];
        this.buttons = [this.bto_guardar,this.bto_limpiar];
        this.callParent(arguments);

    } ,
    CargarDatos : function(record){
        var me = this;
        me.loadRecord(record);
        me.cbx_encargado.clearValue();
        me.txt_recibe.setValue(record.get('RESPONSABLE'));
    },
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
});
