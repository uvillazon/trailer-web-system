Ext.define("App.HojasCalculo.View.FormOrdenProduccion", {
    extend: "Ext.form.Panel",
    title: "Datos Generales de Orden Produccion",
    layout: {
        type: 'table',
        columns: 4
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
        me.cargarStore();
        me.cargarComponentes();  
         me.AgregarEventos();
        this.callParent(arguments);
    },
    cargarStore : function(){
        var me= this;
        me.store_orden = Ext.create("App.OrdenesProduccion.Store.OrdenesProduccion");
    },
    cargarComponentes : function(){
        var me = this;
        me.cbx_orden = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Buscar OP',
            name : 'ID_ORDEN_PRODUCCION',
            typeAhead: false,
            store: me.store_orden,
            displayField: 'NRO_ORDEN',
            valueField: 'ID_ORDEN_PRODUCCION',
            hideTrigger:true,
            vtype: "uppercase",
            pageSize: 10,
            matchFieldWidth : false,
            forceSelection : true,
            editable : true,
            queryParam : 'condicion',
            minChars : 1,
            width: 240,
//            colspan : 3,
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No existe OP.',
                getInnerTpl: function() {
                    return '' +
                        '<h3><span>{NRO_ORDEN}<br /> Cliente: {TIPO_CLIENTE}</span></h3>' +
                        '{FECHA_RECEPCION}' +
                    '';
                }
            },
        });
        me.txt_recepcion = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Resp. Recepcion',
            name: 'RESPONSABLE_RECEPCION',
            width: 240, 
            readOnly: true,
            disabled : true,
            //margin: '10'
        });
        me.txt_cliente = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Cliente',
            name: 'TIPO_CLIENTE',
            width: 240,
            disabled : true,
            //margin: '10'
        });
       me.dat_fecha = Ext.create("App.Utils.Componente.DateFieldBase",{
            fieldLabel: 'Fecha Recepcion',
            name: 'FECHA_RECEPCION',
            disabledCls: 'DisabledClase',
            disabled : true,
            width: 240,
            opcion :'sinfecha',
        });

        me.dat_fecha_ent = Ext.create("Ext.form.DateField",{
            fieldLabel: 'Fecha Entrega',
            name: 'FECHA_ENTREGA',
            disabled : true,
            afterLabelTextTpl: c_requerido,
            disabledCls: 'DisabledClase',
           width: 240,
           opcion :'sinfecha',
        });
        me.txt_responsable = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Responsable',
            name: 'RESPONSABLE',
            width: 240,
            disabled : true
        });
        me.num_sastre = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "Sastre",
            name: "SASTRE",
            width: 240,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            disabled : true,
        });
        me.num_hilo = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "Hilo",
            name: "HILO",
            width: 240,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
            disabled : true,
//            readOnly: true
        });
        me.txt_observacion = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Observacion',
            name: 'OBSERVACION',
            width: 480,
            colspan : 2,
            disabled : true,
        });
        
        //Definimos datefield para la fecha de baja del documento 
//        me.grid = Ext.create("App.Designaciones.View.GridDetallesDesignacion",{colspan :3 , txt_total : me.num_Importe , form : this});
        me.items = [
       
        me.cbx_orden,
        me.txt_recepcion,
        me.txt_cliente,
        me.dat_fecha,
        me.dat_fecha_ent,
        me.txt_responsable,
        me.txt_observacion,
        ];
    },
     AgregarEventos : function(){
        var me = this;
        me.cbx_orden.on('select', function (cmb, record, index) {
                me.getForm().loadRecord(record[0]);
                me.orden = record[0];
                me.grid.CargarDatos(me.orden);

        });
        
    },
});
