Ext.define("App.Extjs.View.Form", {
    extend: "Ext.form.Panel",
    title: "Datos del Contacto",
    layout: {
        type: 'table',
        columns: 1
    },
    bodyPadding: 10,
    fieldDefaults : {
        margin: '2',
        align:'left',
        labelWidth: 110,
    },
    autoScroll : true,
    initComponent: function () {
        var me = this;
        
        me.CargarStore();
        me.CargarComponentes();
        this.callParent(arguments);

    },
    CargarStore : function(){
        var me= this;
        me.store_pais = Ext.create('App.Listas.Store.Listas');
        me.store_pais.proxy.extraParams['where'] = 'PAIS';

        me.store_ciudad = Ext.create('App.Listas.Store.Listas',{autoLoad : false});
        me.store_ciudad.proxy.extraParams['where'] = 'CIUDAD';

        me.store_contactos = Ext.create("App.Extjs.Store.Contactos");
        me.store_contactos.proxy.extraParams['codigo'] = 'CODIGO';
    },
    CargarComponentes : function(){
        var me= this;
        
        me.bto_limpiar = Ext.create('Ext.Button', {
             text: 'Limpiar',
             itemId :'limpiar',
             width: 120,
             textAlign: 'center',
             margin : 10,
             hidden : false

        });
        me.bto_guardar = Ext.create('Ext.Button', {
             text: 'Guardar',
             itemId:'guardar',
             width: 120,
             textAlign: 'center',
             margin : 10,
             hidden : false

        });
        me.txt_nombre = Ext.create('Ext.form.field.Text',{
            name: 'NOMBRE',
            fieldLabel: 'Nombre',
            allowBlank: false,
            emptyText: 'Introduzca Nombre',
            enforceMaxLength: true,
            maxLength: 30,
            width: 350,
            labelWidth: 100,
            afterLabelTextTpl : App.Utils.Constantes.C_REQUERIDO
        });
        me.txt_ci = Ext.create('Ext.form.field.Text',{
            name: 'CI',
            fieldLabel: 'CI',
            allowBlank: false,
            emptyText: 'Introduzca CI',
            enforceMaxLength: true,
            maxLength: 30,
            width: 350,
            labelWidth: 100,
            afterLabelTextTpl : App.Utils.Constantes.C_REQUERIDO
        });
        me.txt_apellido = Ext.create('Ext.form.field.Text',{
            name: 'APELLIDO',
            fieldLabel: 'Apellido',
            allowBlank: false,
            emptyText: 'Introduzca Apellido',
            enforceMaxLength: true,
            maxLength: 30,
            width: 350,
            labelWidth: 100,
            afterLabelTextTpl : Utils.Constantes.C_REQUERIDO
        });

        me.txt_direccion = Ext.create('Ext.form.field.Text',{
            name: 'DIRECCION',
            fieldLabel: 'Direccion',
            allowBlank: false,
            emptyText: 'Introduzca Direccion',
            enforceMaxLength: true,
            maxLength: 100,
            width: 350,
            labelWidth: 100,
        });
        
        me.num_telefono = Ext.create('Ext.form.field.Number',{
            name: 'TELEFONO',
            fieldLabel: 'Telefono',
            maxValue: 999999999999  ,
            minValue: 0
        });
        me.txt_descripcion = Ext.create('Ext.form.field.TextArea',{
            grow      : true,
            name      : 'DESCRIPCION',
            fieldLabel: 'Descripcion',
            anchor    : '100%'
        });
        me.cbx_pais = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Pais',
            name : 'PAIS',
            queryMode: 'local',
            store: me.store_pais,
            displayField: 'VALOR',
            valueField: 'VALOR'
        });
        me.cbx_pais.on('select', function (cmb, record, index) {
            me.store_ciudad.proxy.extraParams['codigo'] = record[0].get('ID_LISTA');
            me.store_ciudad.load();
            me.cbx_ciudad.clearValue();
           
        });
        me.cbx_ciudad = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Ciudad',
            name : 'CIUDAD',
            store: me.store_ciudad,
            queryMode: 'local',
            displayField: 'VALOR',
            valueField: 'VALOR'
        });
        
        me.cbx_puesto = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Nombre',
            name : 'CONTACTO',
            typeAhead: false,
            store: me.store_contactos,
            displayField: 'NOMBRE',
            valueField: 'NOMBRE',
            hideTrigger:true,
            pageSize: 10,
            matchFieldWidth : false,
            forceSelection : true,
            editable : true,
            queryParam : 'where',
            minChars : 1,
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No existe Resultados.',

                // Custom rendering template for each item
                getInnerTpl: function() {
                    return '' +
                        '<h3><span>{NOMBRE}<br />by {APELLIDO}</span>{CI}</h3>' +
                        '{TELEFONO}' +
                    '';
                }
            },
        });
        me.items = [
        me.txt_ci,
        me.txt_nombre,
        me.txt_apellido,
        me.txt_direccion,
        me.num_telefono,
        me.txt_descripcion,
        me.cbx_pais,
        me.cbx_ciudad,
        me.cbx_puesto
        ];
        
        me.buttons = [me.bto_guardar,me.bto_limpiar];
    },
    //Bloquea de forma manual
    Bloquear : function(){
        
    },
    //bloquea de Form Dinamicamente
    BloquearDinamicamente : function(){
        var me= this;
        me.bto_guardar.hide();
        me.bto_limpiar.hide();
        Utils.Funciones.BloquearFormulario(me,null);
    },
    Desbloquear : function(){
        var me = this;
        me.bto_guardar.show();
        me.bto_limpiar.show();
        Utils.Funciones.DesbloquearFormulario(me);
    }
    
});
