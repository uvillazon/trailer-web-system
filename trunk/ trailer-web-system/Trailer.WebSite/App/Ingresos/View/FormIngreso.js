Ext.define("App.Ingresos.View.FormIngreso", {
    extend: "Ext.form.Panel",
    title: "Datos Generales de Ingreso de Material",
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
        

        this.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: 'ID_INGRESO',
            hidden: true
        });
        this.txt_estado = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: 'ESTADO',
            hidden: true
        });
        //Definimos serie 
        me.txt_codigo = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Nrr. Compra',
            name: 'NRO_INGRESO',
            //allowBlank: false,
            width: 220,
            readOnly:true
        });

        me.txt_nrodoc = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Nro. Documento',
            name: 'NRO_DOCUMENTO',
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: false,
            width :220,
            maxLength : 20
        });
        
        me.dat_fecha = Ext.create("App.Utils.Componente.DateFieldBase",{
            fieldLabel: 'Fecha Compra',
            itemId: 'FECHA_INGRESO',
            name: 'FECHA_INGRESO',
            allowBlank: false,
            afterLabelTextTpl: c_requerido,
            
            width: 220
        });
        
        
        me.txt_descripcion= Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: 'Observaciones',
            name: 'CARACTERISTICA',
            height:100,
            width :440,
            colspan :2,
            
        });


        me.store_doc = Ext.create('App.Listas.Store.StoreDinamico');
        me.store_doc.setExtraParam('condicion', 'TIPO_DOCUMENTO');
        me.cbx_doc = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_doc,
            fieldLabel: 'Documento',
            name: 'DOCUMENTO',
            displayField : 'VALOR',
            width: 220,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });

        me.store_tipo = Ext.create('App.Listas.Store.StoreDinamico');
        me.store_tipo.setExtraParam('condicion', 'TIPO_INGRESO');
        me.cbx_tipo = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_tipo,
            fieldLabel: 'Credito / Contado',
            name: 'TIPO_INGRESO',
            displayField : 'VALOR',
            width: 220,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });
        me.cbx_tipo.on('select', function (cmb, record, index) {
                if(cmb.getValue() == 'CREDITO')
                {
                   me.num_monto_cancelado.setDisabled(false);
                   me.num_monto_cancelado.setValue('');
                   // me.txt_propietario.setReadOnly(true);
                }
                else{
                    me.num_monto_cancelado.setDisabled(true);
                    me.num_monto_cancelado.setValue('');
                } 
        });
        me.num_monto_cancelado = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: 'Total Cancelado',
            name: 'TOTAL_CANCELADO',
            width: 220,
            allowBlank: false,
            labelWidth : 90,
            afterLabelTextTpl: c_BsRequerido,
            selectOnFocus: true,
            allowDecimals: true,
            maxValue: 99999999.99,
            maxLength: 11,
        });
        
        me.store_proveedor = Ext.create('App.Proveedores.Store.Proveedores',{pageSize : 3000}).load();
        me.cbx_proveedor = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_proveedor,
            fieldLabel: 'Proveedor',
            name: 'PROVEEDOR',
            displayField : 'NOMBRE',
            valueField : 'NOMBRE',
            width: 220,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });


        me.store_res = Ext.create('App.Empleados.Store.Empleados',{pageSize : 3000}).load();
        me.cbx_responsable = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_res,
            fieldLabel: 'Responsable',
            name: 'RESPONSABLE',
            displayField : 'NOMBRE',
            width: 220,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });

        me.txt_Total = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Total',
            name: 'TOTAL',
            disabled: true,
            width: 220
        });
        me.txt_Total_can = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Total Cantidad',
            name: 'TOTAL_CANT',
            disabled: true,
            width: 220
        });
         me.store_orden = Ext.create("App.OrdenesProduccion.Store.OrdenesProduccion");
          me.cbx_orden = Ext.create('App.Utils.Componente.ComboBase', {
            fieldLabel: 'Nro Orden Produccion',
            name : 'NRO_ORDEN',
            store: me.store_orden,
            displayField: 'NRO_ORDEN',
            valueField: 'NRO_ORDEN',
            width: 240,
            queryMode: 'remote',
            colspan : 2,
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
        //////////////////////////////
        this.items = [
            this.txt_id,
            me.txt_estado,
            me.txt_codigo,
            me.cbx_proveedor,
            me.cbx_responsable,
            me.cbx_tipo,
            me.num_monto_cancelado,
            me.cbx_doc,
            me.txt_nrodoc,
            me.dat_fecha,
            me.cbx_orden,
            me.txt_descripcion,
            me.txt_Total,
            me.txt_Total_can
            ];
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
        
    },
    Desbloquear: function () {
        var me = this;
        DesbloquearForm(me);
       
       
    },
});
