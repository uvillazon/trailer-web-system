Ext.define("App.Moldes.View.FormMolde", {
    extend: "Ext.form.Panel",
    title: "Datos Del Molde",
    iconCls:'application_form_add',
    layout: {
        type: 'table',
        columns: 2 
    },
    bodyPadding: 10,
    fieldDefaults : {
        margin: '2',
        align:'left',
        labelWidth: 110,
    },
    serie:null,
    codigomarca :'',
    store_marca : null,
    opcion : '',
    initComponent: function () {
        var me = this;
        if(me.opcion == ''){
            me.CargarStore();
            me.CargarComponentes();
        }
        else{
            me.CargarComponentes();
        }
        this.callParent(arguments);
    },
    CargarStore : function() {
        var me = this;
        me.store_categoria = Ext.create("App.Listas.Store.StoreDinamico");
        me.store_categoria.proxy.extraParams["condicion"] = "CATEGORIA_PRODUCTO";
        me.store_empresa = Ext.create("App.Empresas.Store.Empresas");
    },
    CargarComponentes : function(){
        var me = this;
        me.bto_limpiar = Ext.create('Ext.Button', {
             text: 'Limpiar',
             width: 120,
             textAlign: 'center',
             iconCls: 'cross',
             margin : 10,
             hidden : true

        });
        me.bto_guardar = Ext.create('Ext.Button', {
             text: 'Guardar',
             width: 120,
             textAlign: 'center',
             iconCls: 'disk',
             margin : 10,
             hidden : true

        });
        me.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: "ID_MOLDE",
            hidden: true,
        });
       
        me.txt_nro_molde = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "Nro Molde",
            name: "NRO_MOLDE",
            width: 240,
            maxLength: 10,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        me.cbx_categoria = Ext.create("App.Utils.Componente.ComboBase", {
            fieldLabel: "Categoria",
            name: "CATEGORIA",
            width: 240,
            store : me.store_categoria,
            selectOnFocus: true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
//        me.cbx_empresa = Ext.create("App.Utils.Componente.ComboBase", {
//            fieldLabel: "Empresa",
//            name: "EMPRESA",
//            width: 240,
//            store : me.store_empresa,
//            selectOnFocus: true,
//        });
        me.cbx_empresa = Ext.create('App.Utils.Componente.ComboBase', {
            fieldLabel: 'Buscar Empresa',
            name : 'EMPRESA',
            store: me.store_empresa,
            displayField: 'NOMBRE',
            valueField: 'NOMBRE',
            queryMode: 'remote',
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No existe Empresas.',
                getInnerTpl: function() {
                    return '' +
                        '<h3>{CODIGO} -{NOMBRE}  - {PAIS} tel :{TELEFONO}</h3>' +
                        'Responsable :{RESPONSABLE}' +
                    '';
                }
            },
        });
        me.txt_modelo = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "Modelo",
            name: "MODELO",
            width: 240,
            maxLength: 60,
        });
        me.txt_detalle = Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: "Detalle",
            name: "DETALLE",
            width: 480,
            colspan : 2,
            maxLength: 150,
        });
        me.txt_talla = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "Talla",
            name: "TALLA",
            width: 240,
            maxLength: 30,
            colspan : 2,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        
        me.items = [
        me.txt_id,
        me.txt_nro_molde,
        me.cbx_categoria,
        me.cbx_empresa,
        me.txt_modelo,
        me.txt_talla,
        me.txt_detalle,
        
        ];
       
        this.buttons = [this.bto_guardar,this.bto_limpiar];
    },
    getBotonGuardar : function(){return this.bto_guardar;},
    getBotonLimpiar : function(){return this.bto_limpiar;},
    Bloquear: function () {
        var me = this;
        me.BloquearForm(me);
        this.bto_guardar.hide();
        this.bto_limpiar.hide()
    },
    Desbloquear: function () {
        var me = this;
        me.DesbloquearForm(me);
        this.bto_guardar.show();
        this.bto_limpiar.show()
       
    },
    BloquearForm : function (form){
        var els=form.query('.field');
        Ext.each(els,function(o){
            if(o.hidden == true){
                o.setDisabled(false);
            }
            else{
                o.setDisabled(true);
            }

        });
    },
    DesbloquearForm : function (form){
        var els=form.query('.field');
        Ext.each(els,function(o){
            o.setDisabled(false);
        });
    },
    Editar : function(data){
//        alert('dsdad');
        this.getForm().loadRecord(data);
        this.codigomarca = data.get('MARCA');
        var rec = this.store_marca.findRecord("VALOR",this.codigomarca);
        this.codigomarca = rec.get('CODIGO');
        //alert(rec.get('CODIGO'));
    },
    CargarDatos : function(data){
        var me = this;
        me.getForm().reset();
        me.Bloquear();
        me.getForm().loadRecord(data);
        me.CargarDatosMando(data);
        me.CargarDatosDispositivo(data);
        me.data = data;
    }
});
