Ext.define("App.Utils.FieldSetTransicionEstado", {
    extend: "Ext.form.FieldSet",
    collapsible: true,
    //defaultType: 'textfield',
    layout: {
        type: 'table',
        columns: 2
    },
    fieldDefaults : {
        margin: '2',
        align:'left'
    },
    operacion : '',
    initComponent: function () {
    //Definimos stores para la interfaz
        store_motivo= Ext.create("App.Listas.Store.MotivoCambioEstado");
        store_tipoDocumento= Ext.create("App.Listas.Store.Documentos");
        store_autoriza = Ext.create("App.Responsables.Store.ResponsablesAutoriza");
        store_condicion = Ext.create("App.Listas.Store.CondicionEquipo");
    cbx_documento = Ext.create("App.Utils.Componente.ComboBase", {
    store : store_tipoDocumento,
    fieldLabel: 'Documento',
    name: 'TIPO_DOC',
    itemId: 'TIPO_DOC',
    selectOnFocus: true,
    labelWidth: 110,
    width: 230,
    //disabled: true
});
//Definimos numberfield para el nro de documento 
    num_nrodocumento = Ext.create("App.Utils.Componente.NumberFieldBase", {
    fieldLabel: 'Nro Doc#',
    name: 'NRO_DOC',
    itemId: 'NRO_DOC',
    labelWidth: 110,
    width: 230,
    //disabled: true,
});
//Definimos datefield para la fecha de baja del documento 
    dat_fecha = Ext.create("App.Utils.Componente.DateFieldBase",{
    fieldLabel: 'Fecha Cambio Estado',
    itemId: 'FECHA_MDF_EST',
    name: 'FECHA_MDF_EST',
    allowBlank: false,
    afterLabelTextTpl: c_requerido,
    labelWidth: 130,
    width: 230
    });
//Definimos datefield para la fecha de extension del documento 
    dat_fechaDocumento = Ext.create("App.Utils.Componente.DateFieldBase",{ opcion :'sin fecha',
    fieldLabel: 'Fecha Documento',
    itemId: 'FECHA_DOC',
    name: 'FECHA_DOC',
    labelWidth: 110,
    width: 230,  
    });

//Definimos combos para tipo de documento 
    cbx_motivo = Ext.create("App.Utils.Componente.ComboBase", {
    store : store_motivo,
    fieldLabel: 'Motivo',
    name:'MOTIVO',
    itemId: 'MOTIVO',
    labelWidth: 110,
    width: 300,
    colspan: 2
    //disabled: true
});
//Definimos textfields para campo autorizado
    cbx_autorizado= Ext.create("App.Utils.Componente.ComboBase", {
    fieldLabel: 'Autorizado Por',
    displayField: 'NOMBRECOMPLETO',
    name: 'AUTORIZA',
    itemId: 'AUTORIZA',
    store:store_autoriza,
    afterLabelTextTpl: c_requerido,
    allowBlank: false,
    labelWidth: 110,
    width: 230,  
});
  cbx_responsable= Ext.create("App.Utils.Componente.ComboBase", {
    fieldLabel: 'Responsable Por',
    displayField: 'NOMBRECOMPLETO',
    name: 'RESPONSABLE',
    itemId: 'RESPONSABLE',
    store:store_autoriza,
    afterLabelTextTpl: c_requerido,
    allowBlank: false,
    labelWidth: 110,
    width: 230,  
});
//Definimos textfields para campo responsable
    txt_observaciones= Ext.create("App.Utils.Componente.TextAreaBase", {
    fieldLabel: 'Observaciones',
    name: 'OBSERV',
    itemId: 'OBSERV',
    afterLabelTextTpl: c_requerido,
    columns: 1 ,
    colspan: 2,
    //width: 400,
    height:100,
    width :470,
    labelWidth: 110,
    //labelAlign: 'top',
    //margin:'3',
    allowBlank: false
});
//.-.
txt_condicion = Ext.create("App.Utils.Componente.ComboBase", {
    fieldLabel: 'Condicion Actual',
    displayField: 'VALOR',
    name: 'CONDICION',
    itemId: 'CONDICION',
    store:store_condicion,
    columns: 1,
    colspan: 2,
    labelWidth: 110,
    width: 230,  
});
this.items = [
cbx_documento,
num_nrodocumento,
dat_fechaDocumento,
dat_fecha,
txt_condicion,
txt_observaciones,
cbx_autorizado,
cbx_responsable,];
        this.callParent(arguments);
    },
LimpiarDatos : function() {
    txt_condicion.setValue('');
    }    
});

