///se tiene que adaptar para elemento y equipos
Ext.define("App.Utils.FieldSetBaja", {
    extend: "Ext.form.FieldSet",
    //collapsible: true,
    //defaultType: 'textfield',
    layout: {
        type: 'table',
        columns: 2
    },
    operacion : '',
    initComponent: function () {
    //Definimos stores para la interfaz
        var store_motivoBaja= Ext.create("App.Listas.Store.MotivoBaja");
        var store_tipoDocumento= Ext.create("App.Listas.Store.DocumentosBajaElemento");
        var store_responsable = Ext.create("App.Responsables.Store.ResponsablesAutoriza");//HAY Q CAMBIAR STORE
        var store_autoriza = Ext.create("App.Responsables.Store.ResponsablesAutoriza");
    
var cbx_documento = Ext.create("App.Utils.Componente.ComboBase", {
    store : store_tipoDocumento,
    fieldLabel: 'Documento',
    name: 'TIPO_DOC',
    itemId: 'TIPO_DOC',
    selectOnFocus: true,
    labelWidth: 110,
    width: 240,
    //disabled: true
});
//Definimos numberfield para el nro de documento 
var num_nrodocumento = Ext.create("App.Utils.Componente.NumberFieldBase", {
    fieldLabel: 'Nro Doc#',
    name: 'NRO_DOC',
    itemId: 'NRO_DOC',
    labelWidth: 110,
    width: 240,
});
//Definimos datefield para la fecha de baja del documento 
var dat_fechaBaja = Ext.create("App.Utils.Componente.DateFieldBase",{
    fieldLabel: 'Fecha Baja',
    itemId: 'FECHA_BAJA',
    name: 'FECHA_BAJA',
    allowBlank: false,
    afterLabelTextTpl: c_requerido,
    labelWidth: 110,
    width: 240,
});
//Definimos datefield para la fecha de extension del documento 
var dat_fechaDocumento = Ext.create("App.Utils.Componente.DateFieldBase",{ opcion :'sin fecha',
    fieldLabel: 'Fecha Documento',
    itemId: 'FECHA_DOC',
    name: 'FECHA_DOC',
    labelWidth: 110,
    width: 240,
});

//Definimos combos para tipo de documento 
var cbx_motivo = Ext.create("App.Utils.Componente.ComboBase", {
    store : store_motivoBaja,
    fieldLabel: 'Motivo',
    name:'MOTIVO',
    itemId: 'MOTIVO',
   
    afterLabelTextTpl: c_requerido,
    allowBlank: false,
   
    columns: 1 ,
    colspan: 2,
    labelWidth: 110,
    width: 240,
});
//Definimos textfields para campo autorizado
var cbx_autorizado= Ext.create("App.Utils.Componente.ComboBase", {
    fieldLabel: 'Autorizado Por',
    displayField: 'NOMBRECOMPLETO',
    name: 'AUTORIZA',
    itemId: 'AUTORIZA',
    store:store_autoriza,
    afterLabelTextTpl: c_requerido,
    allowBlank: false,
    labelWidth: 110,
    width: 240,
});
//Definimos textfields para campo responsable
var cbx_responsable= Ext.create("App.Utils.Componente.ComboBase", {
    fieldLabel: 'Responsable',
    displayField: 'NOMBRECOMPLETO',
    name: 'RESPONSABLE',
    store:store_responsable,
    itemId: 'RESPONSABLE',
    afterLabelTextTpl: c_requerido,
    allowBlank: false,
    labelWidth: 110,
    width: 240,
});
//Definimos textfields para campo responsable
var txt_observaciones= Ext.create("App.Utils.Componente.TextAreaBase", {
    fieldLabel: 'Observaciones',
    name: 'OBSERV',
    itemId: 'OBSERV',
    afterLabelTextTpl: c_requerido,
    labelWidth: 110,
    width: 500,
    allowBlank: false
});
//.-.
if(this.operacion == "CambioEstado"){
this.items = [
cbx_documento,
num_nrodocumento,
dat_fechaDocumento,
dat_fechaBaja,
txt_observaciones,
cbx_autorizado,
cbx_responsable];
}
else{
this.items = [
cbx_documento,
num_nrodocumento,
dat_fechaDocumento,
dat_fechaBaja,
cbx_motivo,
txt_observaciones,
cbx_autorizado,
cbx_responsable


    ];
    }
        this.callParent(arguments);
    }
});

