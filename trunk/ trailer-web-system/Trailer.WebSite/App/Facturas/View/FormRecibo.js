Ext.define("App.Recibos.View.FormRecibo", {
    extend: "Ext.form.Panel",
    title: "Registro de Recibos",
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
    autoScroll : true,
    item : null,
    material : null,
    molde : null,
    initComponent: function () {
        var me = this;
        
        me.CargarStore();
        me.CargarComponentes();
        me.AgregarEventos();
        this.callParent(arguments);

    },
    CargarStore : function(){
        var me= this;
        me.store_cliente = Ext.create("App.Clientes.Store.Clientes");
        me.store_empresa = Ext.create("App.Empresas.Store.Empresas");

        me.store_banco = Ext.create("App.Listas.Store.StoreDinamico");
        me.store_banco.proxy.extraParams["condicion"] = "BANCO";

        me.store_recibido_por = Ext.create("App.Empleados.Store.Empleados");

        
//        me.store_orden.proxy.extraParams['codigo'] = 'CODIGO';
    },
    CargarComponentes : function(){
        var me= this;
        me.cbx_empresa = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Buscar Empresa',
            name : 'EMPRESA',
            typeAhead: false,
            store: me.store_empresa,
            displayField: 'NOMBRE',
            valueField: 'NOMBRE',
            hideTrigger:true,
            vtype: "uppercase",
            pageSize: 10,
            matchFieldWidth : false,
            forceSelection : true,
            editable : true,
            queryParam : 'condicion',
            minChars : 1,
            width: 240,
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No existe Empresa.',
                getInnerTpl: function() {
                    return '' +
                        '<h3><span>{NOMBRE}<br /> Desc: {RESPONSABLE}</span></h3>' +
                        '{DESCRIPCION}' +
                    '';
                }
            },
        });
        me.cbx_cliente = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Buscar Cliente',
            name : 'CLIENTE',
            typeAhead: false,
            store: me.store_cliente,
            displayField: 'NOMBRE',
            valueField: 'NOMBRE',
            hideTrigger:true,
            vtype: "uppercase",
            pageSize: 10,
            matchFieldWidth : false,
            forceSelection : true,
            editable : true,
            queryParam : 'condicion',
            minChars : 1,
            width: 240,
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No existe Clientes.',
                getInnerTpl: function() {
                     return '' +
                        '<h3><span>{NOMBRE}  {APELLIDO}</span></h3>' +
                        '{TELEFONO}' +
                    '';
                }
            },
        });

        me.txt_id_cliente = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: "ID_CLIENTE",
            hidden: true,
        });

         me.txt_id_empresa = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: "ID_EMPRESA",
            hidden: true,
        });

        me.txt_recibi = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Recibi',
            name: 'ENTREGADO',
            width: 480,
            colspan :2,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            //margin: '10'
        });
        me.num_monto = Ext.create("App.Utils.Componente.NumberFieldBase", {
            fieldLabel: "La Suma De",
            name: "MONTO",
            width: 480,
            colspan : 2,
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        me.dat_fecha = Ext.create("App.Utils.Componente.DateFieldBase",{
            fieldLabel: 'Fecha',
            name: 'FECHA',
            width: 240,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
//            opcion :'sinfecha',
        });
        me.cbx_recibido_por = Ext.create("App.Utils.Componente.ComboBase", {
            fieldLabel: "Recibido Por",
            displayField: 'NOMBRE',
            name: "RECIBIDO_POR",
            width: 240,
            store : me.store_recibido_por,
            selectOnFocus: true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
         });
        me.txt_observaciones= Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: 'Por Concepto de ',
            name: 'DESCRIPCION',
            colspan: 2,
            height:70,
            width :480,
            labelAlign: 'top',
            allowBlank: false,
            afterLabelTextTpl: c_requerido,
        });
        me.cbx_tipo = Ext.create("App.Utils.Componente.ComboBase", {
            fieldLabel: "Tipo Pago",
            name: "TIPO",
            width: 240,
            store : ["EFECTIVO","CON CHEQUE","DEPOSITO"],
            selectOnFocus: true,
        });
        me.txt_deposito = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "Deposito",
            name: "DEPOSITO",
            width: 240,
            maxLength: 30,
            disabled : true
        });
        me.txt_nro_cheque = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: "Nro Cheque",
            name: "NRO_CHEQUE",
            width: 240,
            maxLength: 30,
            disabled : true
        });
        me.cbx_banco = Ext.create("App.Utils.Componente.ComboBase", {
            fieldLabel: "Banco",
            name: "BANCO",
            width: 240,
            store : me.store_banco,
            selectOnFocus: true,
            disabled : true
        });
        //Definimos datefield para la fecha de baja del documento 
        me.grid = Ext.create("App.Recibos.View.GridDetalleOP",{colspan :2 });
       
        me.items = [
             me.txt_id_cliente,
             me.txt_id_empresa,
             me.cbx_empresa,
             me.cbx_cliente,
             me.txt_recibi,
             me.num_monto,
             me.dat_fecha,
             me.cbx_recibido_por,
             me.txt_observaciones,
             me.cbx_tipo,
             me.txt_deposito,
             me.txt_nro_cheque,
             me.cbx_banco,
             me.grid
        ];
        
      
    },
    CargarTotalesImporte : function(){
        var me = this;
        var total = 0;
        me.grid.getStore().each(function (record) {
            total += record.get('TOTAL_POR_COBRAR');
        });
        me.grid.setTitle('Detalles De OP Pendientes de Saldo , Total Deuda Pendiente ='+total);
    },
    AgregarEventos : function(){
        var me = this;
        me.cbx_cliente.on('select', function (cmb, record, index) {
            
            me.txt_id_cliente.setValue(record[0].get('ID_CLIENTE'));
            me.txt_id_empresa.setValue('');
            me.cbx_empresa.clearValue();
            me.txt_recibi.setValue(record[0].get('NOMBRE') + ' '+ record[0].get('APELLIDO'));
            me.grid.getStore().setExtraParam('Codigo','RECIBO');
            me.grid.getStore().setExtraParam('condicion',record[0].get('NOMBRE'));
            me.grid.getStore().load();
        });
         me.cbx_empresa.on('select', function (cmb, record, index) {
            me.txt_id_empresa.setValue(record[0].get('ID_EMPRESA'));
            me.txt_id_cliente.setValue('');
            me.cbx_cliente.clearValue();
            me.txt_recibi.setValue(record[0].get('RESPONSABLE'));
            me.grid.getStore().setExtraParam('Codigo','RECIBO');
            me.grid.getStore().setExtraParam('condicion',record[0].get('NOMBRE'));
            me.grid.getStore().load();
        });
        me.cbx_tipo.on('select', function (cmb, record, index) {
            if(cmb.getValue()=="EFECTIVO"){
                me.txt_deposito.setDisabled(true);
                me.txt_nro_cheque.setDisabled(true);
                me.cbx_banco.setDisabled(true);
            }
            else if(cmb.getValue()=="CON CHEQUE"){
                me.txt_deposito.setDisabled(true);
                me.txt_nro_cheque.setDisabled(false);
                me.cbx_banco.setDisabled(false);
            }
            else{
                me.txt_deposito.setDisabled(false);
                me.txt_nro_cheque.setDisabled(true);
                me.cbx_banco.setDisabled(true);
            }
        });
         me.grid.store.on('load', me.CargarTotalesImporte, this);

         me.num_monto.on('specialkey',me.CargarImportes,this);

         me.grid.btn_eliminar.on('click',me.EliminarItem,this);
      

        
    },
    CargarImportes : function(field, e){
        var me = this;
        if (e.getKey() == e.ENTER) {
         
            var total = field.getValue();
            me.grid.getStore().each(function(record){
                 record.set('A_CUENTA',0);
                 record.set('SALDO',0);
            });
            me.grid.getStore().each(function(record){
                if(total > 0){
                    if(record.get('TOTAL_POR_COBRAR') <= total){
                        record.set('A_CUENTA',record.get('TOTAL_POR_COBRAR'));
                        record.set('SALDO',0);
                        
                    }
                    else{
//                        record.set('IMPORTE_TOTAL',total);
                        record.set('A_CUENTA',total);
                        record.set('SALDO',record.get('TOTAL_POR_COBRAR') - total);

                    }
                    total = total - record.get('TOTAL_POR_COBRAR') ;
                 }
//               record.get('TOTAL_ADEUDADO').set(field.getValue());
//               record.save();                
//                totalCantidad+=record.get('TOTAL_CANCELADO');
            });
        }
    },
    EliminarItem : function(){
        var me = this;
         var data = me.grid.getSelectionModel().getSelection()[0];
        if (data != null) {
                me.grid.getStore().remove(data);
//                me.grid.getView().refresh();
                me.CargarTotalesImporte();
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro para Eliminar');
        }
        
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
            alert('no hy restro')
            return null;
        }
    }
    
});
