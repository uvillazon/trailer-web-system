Ext.define("App.Utils.FieldSetRetirar", {
    extend: "Ext.form.FieldSet",
    collapsible: true,
    layout: {
        type: 'table',
        columns: 2
    },
    operacion : '',
    //padding : 0,
    initComponent: function () {
    //Definimos stores para la interfaz
     store_autoriza = Ext.create("App.Responsables.Store.ResponsablesAutoriza");
     store_retira = Ext.create("App.Responsables.Store.ResponsablesRetira");
     store_motivoBaja = Ext.create("App.Listas.Store.MotivoRetiroRec");
     store_condicion = Ext.create("App.Listas.Store.CondicionEquipo");
     store_deposito = Ext.create("App.Listas.Store.Deposito");
     store_tipoDocumento=Ext.create("App.Listas.Store.Documentos");
    
    //Definimos datefield para la fecha de baja del documento 
    dat_fechaRetiro = Ext.create("App.Utils.Componente.DateFieldBase",{
    fieldLabel: 'Fecha Retiro',
    itemId: 'FECHA_RET',
    name: 'FECHA_RET',
    allowBlank: false,
    afterLabelTextTpl: c_requerido,
    labelWidth: 110,
    width: 240,
    //margin:3,
    });
    //Definimos textfields para campo autorizado
    cbx_motivo= Ext.create("App.Utils.Componente.ComboBase", {
    fieldLabel: 'Motivo',
    valueField: 'VALOR',
    name:'MOTIVO',
    itemId: 'MOTIVO',
    afterLabelTextTpl: c_requerido,
    allowBlank: false,
    /* labelWidth: 87,*/
    store : store_motivoBaja,
    labelWidth: 110,
    width: 240,
    //margin:3,
    });        
    cbx_condicion= Ext.create("App.Utils.Componente.ComboBase", {
    fieldLabel: 'Condicion Equipo',
    valueField: 'VALOR',
    name:'CONDICION',
    itemId: 'CONDICION',
    /* labelWidth: 87,*/
    store : store_condicion,
    labelWidth: 110,
    width: 240,
    //margin:3,
    });
    cbx_ubicacion= Ext.create("App.Utils.Componente.ComboBase", {
    fieldLabel: 'Deposito Destino',
    valueField: 'VALOR',
    name:'DEPOSITO',
    itemId: 'DEPOSITO',
    store : store_deposito,
    labelWidth: 110,
    width: 240,
    //margin:3,
    });

    //Definimos textfields para campo responsable
    txt_observaciones= Ext.create("App.Utils.Componente.TextAreaBase", {
    fieldLabel: 'Observaciones',
    name: 'OBSERVACION',
    itemId: 'OBSERVACION',
    afterLabelTextTpl: c_requerido,
     height:50,
        //labelWidth: 98,
        width :480,
    columns: 1,
    colspan: 2,
    labelWidth: 110,
    //margin:3,
    allowBlank: false
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
    width: 240,
    //margin:3,
    });
    //Definimos textfields para campo responsable
    cbx_responsable= Ext.create("App.Utils.Componente.ComboBase", {
    fieldLabel: 'Responsable',
    displayField: 'NOMBRECOMPLETO',
    name: 'RESPONSABLE',
    store:store_retira,
    itemId: 'RESPONSABLE',
    afterLabelTextTpl: c_requerido,
    allowBlank: false,
    labelWidth: 110,
    width: 240,
    //margin:3,
    });
    
    //definimos combo para seleccionar el tipo de documento
    cbx_documento = Ext.create("App.Utils.Componente.ComboBase", {
    store : store_tipoDocumento,
    fieldLabel: 'Documento',
    name: 'TIPO_DOC',
    itemId: 'TIPO_DOC',
    selectOnFocus: true,
    labelWidth: 110,
    width: 240,
    //disabled: true
    });
    //Definimos datefield para la fecha de extension del documento 
    dat_fechaDocumento = Ext.create("App.Utils.Componente.DateFieldBase",{ opcion :'sin fecha',
    fieldLabel: 'Fecha Documento',
    itemId: 'FECHA_DOC',
    name: 'FECHA_DOC',
    columns: 1,
    colspan: 2,
    labelWidth: 110,
    width: 240,
    });
    //Definimos numberfield para el nro de documento 
    num_nrodocumento = Ext.create("App.Utils.Componente.NumberFieldBase", {
    fieldLabel: 'Nro Doc#',
    name: 'NRO_DOC',
    itemId: 'NRO_DOC',
    labelWidth: 110,
    width: 240,
    });
    this.items = [
    dat_fechaRetiro,
    cbx_motivo,
    cbx_condicion,
    cbx_ubicacion,
    cbx_documento,
    num_nrodocumento,
    dat_fechaDocumento,
    txt_observaciones,
    cbx_autorizado,
    cbx_responsable];
    this.callParent(arguments);
    }
});

