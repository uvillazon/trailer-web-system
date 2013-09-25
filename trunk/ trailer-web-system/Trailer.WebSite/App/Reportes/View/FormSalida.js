Ext.define("App.Salidas.View.FormSalida", {
    extend: "Ext.form.Panel",
    title: "Datos Generales de Salida de Materiales",
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
    orden : null,
    idOrden : null,
    initComponent: function () {
        var me = this;
        

        this.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: 'ID_SALIDA',
            hidden: true
        });
        this.txt_id_orden = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: 'ID_ORDEN_PRODUCCION',
            hidden: true,
            value : me.idOrden
        });
        
        //Definimos serie 
        me.txt_codigo = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Nro. Salida',
            name: 'NRO_SALIDA',
            //allowBlank: false,
            width: 220,
            readOnly:true
        });
        me.txt_orden = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Nro. Orden OP',
            name: 'NRO_ORDEN',
            value : me.orden,
            //allowBlank: false,
            width: 220,
            readOnly:true
        });
        me.dat_fecha = Ext.create("App.Utils.Componente.DateFieldBase",{
            fieldLabel: 'Fecha Salida',
            itemId: 'FECHA_SALIDA',
            name: 'FECHA_SALIDA',
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


       

        me.store_res = Ext.create('App.Empleados.Store.Empleados',{pageSize : 3000}).load();
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

       
        //////////////////////////////
        this.items = [
            this.txt_id,
            me.txt_id_orden,
            me.txt_estado,
            me.txt_codigo,
            me.txt_orden,
            me.cbx_responsable,
            me.dat_fecha,
            me.txt_descripcion
            ];
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
        
    },
    Desbloquear: function () {
        var me = this;
        DesbloquearForm(me);
       
       
    },
});
