Ext.define("App.Listas.View.FormTipoLista", {
    extend: "Ext.form.Panel",
    title: "Formulario Tipo de listaa",
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
        me.txt_tipo = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Tipo Lista',
            name: 'TIPO_LISTA',
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: false,
            width: 300,
          //  margin: '10'
        });

        me.txt_observaciones= Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: 'Descripcion',
            name: 'DESCRIPCION',
            afterLabelTextTpl: c_requerido,
            height:100,
            width :300,
            allowBlank: false
        });
        //////////////////////////////
        this.items = [
            this.txt_id,
            me.txt_tipo,
            me.txt_observaciones
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
