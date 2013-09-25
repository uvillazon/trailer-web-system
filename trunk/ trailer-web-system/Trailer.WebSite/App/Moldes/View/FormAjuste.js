Ext.define("App.Moldes.View.FormAjuste", {
    extend: "Ext.form.Panel",
    iconCls:'application_form_add',
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
        me.store_responsable =  Ext.create('App.Empleados.Store.Empleados',{pageSize : 3000}).load();
       
    },
    CargarComponentes : function(){
        var me = this;
        me.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: "ID_AJUSTE_MOLDE",
            hidden: true,
        });
        me.txt_id_molde = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: "ID_MOLDE",
            hidden: true,
        });
        me.txt_nro_molde = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "NRO_MOLDE",
            name: "NRO_MOLDE",
            width: 240,
            maxLength: 10,
            disabled: true,
        });
        me.num_sastre = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "SASTRE",
            name: "SASTRE",
            width: 240,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        me.num_hilo = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "HILO",
            name: "HILO",
            width: 240,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        me.cbx_responsable = Ext.create("App.Utils.Componente.ComboBase", {
            fieldLabel: "RESPONSABLE",
            name: "RESPONSABLE",
            displayField : 'NOMBRE',
            width: 240,
            store : me.store_responsable,
            selectOnFocus: true,
        });
        me.items = [
        me.txt_id,
        me.txt_id_molde,
        me.txt_nro_molde,
        me.num_sastre,
        me.num_hilo,
        me.cbx_responsable,
        me.dat_fecha_reg,
        ];
    },
    Bloquear: function () {
        var me = this;
        me.BloquearForm(me);
    },
    Desbloquear: function () {
        var me = this;
        me.DesbloquearForm(me);
       
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
    CargarDatos : function(data,bool){
        var me = this;
        me.getForm().reset();
        if(bool){
        me.Bloquear();
        }
        me.getForm().loadRecord(data);
        me.data = data;
    }
});
