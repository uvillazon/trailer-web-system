Ext.define("App.Listas.View.FormLista", {
    extend: "Ext.form.Panel",
    title: "Formulario Tipo de lista",
    layout: {
        type: 'table',
        columns: 1
    },
    bodyPadding: 10,
    fieldDefaults : {
        margin: '2',
        align:'left',
        labelWidth: 70,
    },
    lista : '',
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
            name: 'ID_TABLA',
            hidden: true
        });
        
        
        //Definimos serie 
        me.txt_lista = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Tipo Lista',
            name: 'LISTA',
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: false,
            width: 300,
            readOnly : true,
            value : me.lista
          //  margin: '10'
        });

        me.txt_codigo = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Codigo',
            name: 'CODIGO',
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: false,
            width: 300,
            maxLength: 4,
          //  margin: '10'
        });

        me.txt_valor = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Nombre',
            name: 'VALOR',
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: false,
            width: 300,
            maxLength: 30,
          //  margin: '10'
        });
        
        me.cbx_estado = Ext.create("App.Utils.Componente.ComboBase", {
            fieldLabel: 'Estado',
            displayField: 'VALOR',
            name: 'ESTADO',
            store: ['A', 'I'],
        });
        //////////////////////////////
        this.items = [
            this.txt_id,
            me.txt_lista,
            me.txt_codigo,
            me.txt_valor,
            me.cbx_estado
            ];
        this.buttons = [this.bto_guardar,this.bto_limpiar];
        this.callParent(arguments);

    } ,
    getBotonGuardar : function (){return this.bto_guardar;},
    getBotonLimpiar : function (){return this.bto_limpiar;},
    Limpiar : function(win){
        var me = this;
        me.getForm().reset();
        win.hide();
    }
});
