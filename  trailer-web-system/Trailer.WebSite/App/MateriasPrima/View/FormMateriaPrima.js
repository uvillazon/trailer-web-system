Ext.define("App.MateriasPrima.View.FormMateriaPrima", {
    extend: "Ext.form.Panel",
    title: "Datos Generales de Materiales",
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
            name: 'ID_MATERIA_PRIMA',
            hidden: true
        });
        //Definimos serie 
        me.txt_codigo = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Codigo',
            name: 'CODIGO',
            allowBlank: false,
            width: 220,
//            colspan :2
        });

        me.txt_nombre = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Nombre',
            name: 'NOMBRE',
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: false,
            width :440,
            colspan :2,
            maxLength : 100
        });

        me.txt_calidad= Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: 'Calidad',
            name: 'CALIDAD',
            height:70,
            width :440,
            colspan :2,
            
        });

        
        
        me.txt_descripcion= Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: 'Caracteristicas',
            name: 'CARACTERISTICA',
            height:100,
            width :440,
            colspan :2,
            
        });


        me.store_categoria = Ext.create('App.Listas.Store.StoreDinamico');
        me.store_categoria.setExtraParam('condicion', 'CATEGORIA_MATERIA');
        me.cbx_categoria = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_categoria,
            fieldLabel: 'Categoria',
            name: 'CATEGORIA',
            displayField : 'VALOR',
            width: 220,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });

        me.store_unidad = Ext.create('App.Listas.Store.StoreDinamico');
        me.store_unidad.setExtraParam('condicion', 'UNIDAD');
        me.cbx_unidad = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_unidad,
            fieldLabel: 'Unidad',
            name: 'UNIDAD',
            displayField : 'VALOR',
            width: 220,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });

        me.store_color = Ext.create('App.Listas.Store.StoreDinamico');
        me.store_color.setExtraParam('condicion', 'COLOR');
        me.cbx_color = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_color,
            fieldLabel: 'Color',
            name: 'COLOR',
            displayField : 'VALOR',
            width: 220,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });

        me.num_stock = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: 'Stock Minimo',
            name: 'STOCK_MINIMO',
            width: 220,
            allowBlank: false,
            afterLabelTextTpl: c_requerido,
            selectOnFocus: true
        });
        
        me.num_cantidad_disponible = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: 'Cantidad Disponible',
            name: 'CANTIDAD_DISP',
            width: 220,
//            allowBlank: false,
//            afterLabelTextTpl: c_requerido,
            selectOnFocus: true,
            readOnly :true,
        });
        


        //////////////////////////////
        this.items = [
            this.txt_id,
            me.txt_codigo,
            me.num_cantidad_disponible,
            me.txt_nombre,
            me.txt_calidad,
            me.cbx_categoria,
            me.cbx_color,
            me.cbx_unidad,
            me.num_stock,
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
