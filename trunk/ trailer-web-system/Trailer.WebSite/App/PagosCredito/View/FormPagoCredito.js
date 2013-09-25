Ext.define("App.PagosCredito.View.FormPagoCredito", {
    extend: "Ext.form.Panel",
    title: "Pago de Credito por Proveedor",
    layout: {
        type: 'table',
        columns: 3
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
        
        me.store_proveedores = Ext.create("App.Proveedores.Store.Proveedores");
//        me.store_proveedores.proxy.extraParams['codigo'] = 'CODIGO';
    },
    CargarComponentes : function(){
        var me= this;
        me.cbx_proveedor = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Buscar Proveedor',
            name : 'ID_PROVEEDOR',
            typeAhead: false,
            store: me.store_proveedores,
            displayField: 'NOMBRE',
            valueField: 'ID_PROVEEDOR',
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
                emptyText: 'No existe Proveedores.',
                getInnerTpl: function() {
                    return '' +
                        '<h3><span>{NOMBRE}<br />by {PAIS}</span>{NIT}</h3>' +
                        '{DIRECCION}' +
                    '';
                }
            },
        });
        me.txt_nombre = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Proveedor',
            name: 'NOMBRE',
            width: 240, 
            readOnly: true,
            disabled : true,
            //margin: '10'
        });
        me.txt_direccion = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Direccion',
            name: 'DIRECCION',
            width: 240,
            disabled : true,
            //margin: '10'
        });
        me.txt_nit = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'NIT',
            name: 'NIT',
            width: 240,
            disabled : true,
            //margin: '10'
        });
        me.txt_telefono = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Telefono',
            name: 'TELEFONO',
            width: 240,
            disabled : true,
            //margin: '10'
        });
        me.txt_representante = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Representante',
            name: 'REPRESENTANTE',
            width: 240,
            disabled : true
        });

        me.txt_total_adeudado = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Total Adeudado',
            name: 'TOTAL_ADEUDADO',
            width: 240,
            disabled : true
            //margin: '10'
        });
        me.txt_total_cancelado = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Total Cancelado',
            name: 'TOTAL_CANCELADO',
            width: 240,
            disabled : true
//            //margin: '10'
        });
        me.store_res = Ext.create('App.Empleados.Store.Empleados',{pageSize : 3000}).load();
        me.cbx_responsable = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_res,
            fieldLabel: 'Responsable',
            name: 'RESPONSABLE',
            displayField : 'NOMBRE',
            width: 240,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
        });
        me.num_Importe = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: 'Importe Cancelado',
            name: 'IMPORTE_TOTAL',
            itemId: 'NRO_DOC',
            labelWidth: 110,
            width: 230,
        //disabled: true,
        });
        //Definimos datefield para la fecha de baja del documento 
        me.dat_fecha = Ext.create("App.Utils.Componente.DateFieldBase",{
            fieldLabel: 'Fecha Pago Credito',
            name: 'FECHA_PAGO',
            allowBlank: false,
            labelWidth: 110,
            width: 240,
            colspan :2

        });
        me.txt_observaciones= Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: 'Observaciones',
            name: 'OBSERVACION',
            columns: 1 ,
            colspan: 3,
            height:100,
            width :700,
            labelWidth: 110,
            allowBlank: false
        });
        me.grid = Ext.create("App.PagosCredito.View.GridCompras",{colspan :3 , txt_total : me.num_Importe});
        me.items = [
       
        me.cbx_proveedor,
        me.txt_nombre,
        me.txt_direccion,
        me.txt_nit,
        me.txt_telefono,
        me.txt_representante,
        me.cbx_responsable,
        me.dat_fecha,
        me.txt_observaciones,
        me.txt_total_adeudado,
        me.txt_total_cancelado,
        me.num_Importe,
        me.grid
        ];
        me.cbx_proveedor.on('select', function (cmb, record, index) {
//               alert('adssada'+4record);
               me.getForm().loadRecord(record[0]);
               me.grid.getStore().proxy.extraParams['condicion'] = record[0].get('ID_PROVEEDOR');
               me.grid.getStore().load();

//               me.CargarTotales();
        });
        me.grid.store.on('load', me.CargarTotales, this);
        me.num_Importe.on('specialkey',me.CargarImportes,this);
        me.grid.on('cellclick', me.CargarDatos, this);
    },
    CargarImportes : function(field, e){
        var me = this;
        if (e.getKey() == e.ENTER) {
            if(field.getValue() > me.txt_total_adeudado.getValue()){
//                Ext.MessageBox.alert('Error', 'El importe a cancelar no debe superar el total adeudado');
                field.setValue(me.txt_total_adeudado.getValue());
            }
            var total = field.getValue();
            me.grid.getStore().each(function(record){
                 record.set('IMPORTE_TOTAL',0);
            });
            me.grid.getStore().each(function(record){
                if(total > 0){
                    if(record.get('TOTAL_ADEUDADO') <= total){
                        record.set('IMPORTE_TOTAL',record.get('TOTAL_ADEUDADO'));
                        
                    }
                    else{
                        record.set('IMPORTE_TOTAL',total);

                    }
                    total = total - record.get('TOTAL_ADEUDADO') ;
                 }
//               record.get('TOTAL_ADEUDADO').set(field.getValue());
//               record.save();                
//                totalCantidad+=record.get('TOTAL_CANCELADO');
            });
        }
    },
    CargarTotales : function(){
        var me = this;
        var total=0;
        var totalCantidad=0;
        me.txt_total_adeudado.setValue(total);
        me.txt_total_cancelado.setValue(totalCantidad);  
        if(me.grid.getStore().count()>0){
            me.grid.getStore().each(function(record){
                total+=record.get('TOTAL_ADEUDADO');                   
                totalCantidad+=record.get('TOTAL_CANCELADO');
            });
        }
        //console.log(total);
         me.txt_total_adeudado.setValue(total);
        me.txt_total_cancelado.setValue(totalCantidad);  
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
    },
    ParametrosGrid : function(){
        var me = this;
        var modified = me.grid.getStore().getModifiedRecords(); //step 1
        if (!Ext.isEmpty(modified)) {
            var recordsToSend = [];
            Ext.each(modified, function (record) { //step 2
                recordsToSend.push(Ext.apply( record.data));
                   
            });
            recordsToSend = Ext.JSON.encode(recordsToSend);
            return recordsToSend;
        }
        else{
            return null;
        }
    }
    
});
