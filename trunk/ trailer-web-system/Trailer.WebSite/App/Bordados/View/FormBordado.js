Ext.define("App.Bordados.View.FormBordado", {
    extend: "Ext.form.Panel",
    title: "Datos Generales del Bordado",
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
            name: 'ID_BORDADO',
            hidden: true
        });
        //Definimos serie 
        me.txt_canal = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Canal',
            name: 'CANAL',
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: false,
            width: 220
        });

        me.txt_kardex = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Kardex',
            name: 'KARDEX',
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: false,
            width: 220
        });

        me.txt_diseno= Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: 'Diseño',
            name: 'DISENO',
            height:70,
            width :440,
            colspan :2,
            
        });

        me.txt_puntada = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Puntada',
            name: 'PUNTADA',
            selectOnFocus: false,
            width: 220,
          //  margin: '10'
        });
        
        me.txt_descripcion= Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: 'Descripcion',
            name: 'DESCRIPCION',
            height:100,
            width :440,
            colspan :2,
            
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

        me.num_ancho = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: 'Ancho',
            name: 'ANCHO',
            maxValue: 9999.99,
            decimalSeparator: '.',
            decimalPrecision: 2,
            allowDecimals: true,
            width: 220,
            allowBlank: false,
            afterLabelTextTpl: c_requerido,
            selectOnFocus: true
        });
        
        me.num_alto = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: 'Alto',
            name: 'ALTO',
            maxValue: 9999.99,
            decimalSeparator: '.',
            decimalPrecision: 2,
            allowDecimals: true,
            width: 220,
            allowBlank: false,
            afterLabelTextTpl: c_requerido,
            selectOnFocus: true
        });


        //////////////////////////////
        this.items = [
            this.txt_id,
            me.txt_canal,
            me.txt_kardex,
            me.txt_diseno,
            me.cbx_empresa,
            me.txt_puntada,
            me.num_ancho,
            me.num_alto,
            me.txt_descripcion
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
