Ext.define("App.Productos.View.FormProducto", {
    extend: "Ext.form.Panel",
    title: "Datos Generales del Producto Terminado",
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
             width: 120,
             textAlign: 'center',
             iconCls: 'cross',
             margin : 10,
             hidden : true
        });
        this.bto_guardar = Ext.create('Ext.Button', {
             text: 'Guardar',
             width: 120,
             textAlign: 'center',
             iconCls: 'disk',
             margin : 10,
             hidden : true
        });

        this.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: 'ID_PRODUCTO',
            hidden: true
        });
        //Definimos serie 
        me.txt_nro_orden = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Orden Produccion',
            name: 'NRO_ORDEN',
            allowBlank: false,
            width: 220,
        });

        me.txt_articulo = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Articulo',
            name: 'ARTICULO',
            selectOnFocus: false,
            width :220,
            maxLength : 100
        });
         me.txt_cliente = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Cliente',
            name: 'CLIENTE',
            selectOnFocus: false,
            width :220,
            maxLength : 100
        });

         me.txt_tela = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Tela',
            name: 'TELA',
            selectOnFocus: false,
            width :220
        });
         me.txt_talla = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Talla',
            name: 'TALLA',
            selectOnFocus: false,
            width :220
        });
         me.txt_color = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Color',
            name: 'COLOR',
            selectOnFocus: false,
            width :220
        });
         me.txt_disponible = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Cantidad Disponible',
            name: 'CANTIDAD_DISP',
            selectOnFocus: false,
            width :220
        });
        me.txt_costo = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Costo',
            name: 'COSTO',
            selectOnFocus: false,
            width :220
        });

        me.txt_detalle= Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: 'Detalle Producto',
            name: 'DETALLE_ITEM',
            height:70,
            width :440,
            colspan :2
        });
        me.txt_detalle_bor= Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: 'Detalle Bordado',
            name: 'DETALLE_BORDADO',
            height:70,
            width :440,
            colspan :2
        });

         me.txt_detalle_cos= Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: 'Detalle Costura',
            name: 'DETALLE_COSTURA',
            height:70,
            width :440,
            colspan :2
        });

        //////////////////////////////
        this.items = [
            this.txt_id,
            me.txt_nro_orden,
            me.txt_articulo,
            me.txt_cliente,
            me.txt_tela,
            me.txt_talla,
            me.txt_color,
            me.txt_disponible,
            me.txt_costo,
            me.txt_detalle,
            me.txt_detalle_bor,
            me.txt_detalle_cos
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
});
