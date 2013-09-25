Ext.define("App.DetallesSalida.View.FormDetallesSalida", {
    extend: "Ext.form.Panel",
    title: "Registro de Salidas Por Detalle de Orden de Produccion",
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
        
        me.store_orden = Ext.create("App.OrdenesProduccion.Store.OrdenesProduccion");
        me.store_material = Ext.create("App.MateriasPrima.Store.MateriasPrima");
        me.store_item = Ext.create('App.OrdenesProduccion.Store.DetallesOrden');
        me.store_corte = Ext.create('App.Cortes.Store.Cortes');
        me.store_corte.setExtraParam('codigo' , 'ORDENPRODUCCION');
    },
    CargarComponentes : function(){
        var me= this;
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
        me.cbx_material = Ext.create('App.Utils.Componente.ComboBase', {
            fieldLabel: 'Buscar Material',
            name : 'ID_MATERIA_PRIMA',
            store: me.store_material,
            displayField: 'NOMBRE',
            valueField: 'NOMBRE',
            width: 240,
            queryMode: 'remote',
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No existe Materiales.',
                getInnerTpl: function() {
                    return '' +
                        '<h3><span>{CATEGORIA} : {NOMBRE} - {COLOR}</span></h3>' +
                        '{CARACTERISTICA}' +
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
        me.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", {

            name: "ID_SALIDA",

            hidden: true,

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
       
        me.cbx_item = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_item,
            fieldLabel: 'Item OP',
            name: 'ID_DETALLE_ORDEN',
            displayField : 'ARTICULO',
            width: 480,
            colspan : 2,
            afterLabelTextTpl: c_requerido,
            selectOnFocus: true,
            matchFieldWidth : true,
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No existe Detalle OP.',
                getInnerTpl: function() {
                    return '' +
                        '<h3><span>Talla : {TALLA}</span></h3>' +
                        '{DESC}' +
                    '';
                }
            },
        });
        me.dat_fecha_salida = Ext.create("App.Utils.Componente.DateFieldBase",{
            fieldLabel: 'Fecha Salida',
            name: 'FECHA_SALIDA',
            width: 240,
            opcion :'sinfecha',
            afterLabelTextTpl: c_requerido,
            allowBlank: false,

        });
        me.store_responsable = Ext.create('App.Empleados.Store.Empleados');
        me.cbx_responsable = Ext.create('App.Utils.Componente.ComboBase',{
            store: me.store_responsable,
            fieldLabel: 'Responsable Salida',
            name: 'RESPONSABLE',
            displayField : 'NOMBRE',
            width: 240,
            colspan : 1,
            afterLabelTextTpl: c_requerido,
            selectOnFocus: true,
            matchFieldWidth : false,
        });
         me.txt_nro_salida = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Nro Salida',
            name: 'NRO_SALIDA',
            width: 240,
            disabled : true,
            //margin: '10'
        });
        me.txt_observacion = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Observacion',
            name: 'OBSERVACION',
            width: 720,
            colspan : 3,
            //margin: '10'
        });
        this.bto_limpiar = Ext.create('Ext.Button', {
             text: 'Limpiar',
             width: 120,
             textAlign: 'center',
             iconCls: 'cross',
             margin : 10,
             hidden : true

        });
        this.bto_guardar = Ext.create('Ext.Button', {
             text: 'Guardar',
             width: 120,
             textAlign: 'center',
             iconCls: 'disk',
             margin : 10,
             hidden : true

        });
        //Definimos datefield para la fecha de baja del documento 
        me.grid = Ext.create("App.DetallesSalida.View.GridSalidas",{colspan :3 , txt_total : me.num_Importe});
        me.items = [
        me.txt_id,
        me.cbx_orden,
        me.txt_recepcion,
        me.txt_cliente,
        me.dat_fecha,
        me.dat_fecha_ent,
        me.txt_responsable,
        me.txt_nro_salida,
        me.dat_fecha_salida,
        me.cbx_responsable,
        me.txt_observacion,
        me.cbx_item,
        me.cbx_material,
        
        me.grid
        ];
        
        me.grid.store.on('load', me.CargarTotales, this);
        me.grid.Crear.on('click',me.AgregarItem,this);
        me.grid.Corte.on('click',me.AgregarCorte,this);
        me.grid.Eliminar.on('click',me.EliminarItem,this);
//        me.num_Importe.on('specialkey',me.CargarImportes,this);
        me.grid.on('cellclick', me.CargarDatos, this);
    },
    
    AgregarEventos : function(){
        var me = this;
        me.cbx_orden.on('select', function (cmb, record, index) {
                me.getForm().loadRecord(record[0]);
                me.store_item.setExtraParam('condicion', record[0].get('ID_ORDEN_PRODUCCION'));
                me.store_item.setExtraParam('codigo', 'OP');
                me.store_item.load();

                me.store_corte.setExtraParam('condicion', record[0].get('ID_ORDEN_PRODUCCION'));
                me.store_corte.load();
////                ITEMORDENPRODUCCION
//                me.grid.getStore().setExtraParam('condicion', record[0].get('ID_ORDEN_PRODUCCION'));
//                me.grid.getStore().setExtraParam('codigo', 'ORDENPRODUCCION'); 
//                me.grid.getStore().load();
        });
        me.cbx_item.on('select', function (cmb, record, index) {
            me.item  = record[0];
//            alert(me.item.get('ID_DETALLE_ORDEN'))
//            me.grid.getStore().setExtraParam('codigo', 'ITEMORDENPRODUCCION'); 
//            me.grid.getStore().setExtraParam('condicion', record[0].get('ID_DETALLE_ORDEN'));
//            
//            me.grid.getStore().load();
//            me.AgregarItem();

        });
        me.cbx_material.on('select', function (cmb, record, index) {
            me.material  = record[0];
//            me.AgregarItem();
        });
         
        
    },
    EliminarItem : function(){
        var me = this;
         var data = me.grid.getSelectionModel().getSelection()[0];
        if (data != null) {
           
            if (data.get('ID_DETALLE') != 0) {
//                 alert(data.get('ID_DETALLE'));
                Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                    if (btn == 'yes') {
                        me.grid.el.mask('Procesando...', 'x-mask-loading');
                        Ext.Ajax.request({
                            url: host+'Cortes/EliminarCorte',
                            params: { ID_CORTE: data.get('ID_CORTE') },
                            success: function (response) {
                                me.grid.el.unmask();
                                r = Ext.decode(response.responseText);
                                if (!r.success) {
                                    Ext.MessageBox.alert('Error', r.msg);
                                    return;
                                } else {
                                    Ext.MessageBox.alert('Exito', r.msg);
                                    me.grid.getStore().load();
                                }
                            },
                            failure: function (response) {
                                me.grid.el.unmask();
                                Ext.MessageBox.alert('Error', response.result.msg);
                            }
                        });

                    }
                });
            }
            else {
//                 alert(data.get('ID_DETALLE')+'aaaaa');
                me.grid.store.remove(data);
            }

        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro para Eliminar');
        }
        
    },
    AgregarItem : function(){
        var me = this;
//        alert(me.material.get('NOMBRE'));
        if (me.item != null && me.material != null) {
            var rec = Ext.create('App.DetallesSalida.Model.DetallesSalidaAux', {
                ID_DETALLE: 0,
                ID_DETALLE_ORDEN: me.item.get('ID_DETALLE_ORDEN'),
                ID_MATERIA_PRIMA : me.material.get('ID_MATERIA_PRIMA'),
                DETALLE_ITEM : me.item.get('ARTICULO')+' - '+me.item.get('COLOR'),
                UNIDAD : me.material.get('UNIDAD'),
                DETALLE : 'Sin Detalle',
                TALLA : me.item.get('TALLA'),
                DETALLE_MATERIAL : me.material.get('NOMBRE')+' - '+me.material.get('COLOR'),
                CANTIDAD : 1
            });
            me.grid.store.insert(0, rec);
            me.grid.getView().refresh();

        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un Material o Item o Molde y vuelva a intentarlo...');
        }
    },
    AgregarCorte : function(){
        var me = this;
        if (me.cbx_orden.getValue() != null){
            me.store_corte.each(function(record){
               var rec_corte = Ext.create('App.DetallesSalida.Model.DetallesSalidaAux', {
                ID_DETALLE: 0,
                ID_DETALLE_ORDEN: record.get('ID_DETALLE_ORDEN'),
                ID_MATERIA_PRIMA : record.get('ID_MATERIA_PRIMA'),
                DETALLE_ITEM : record.get('DETALLE_ITEM_CORTO'),
                UNIDAD : 'METROS',
                DETALLE : 'Salida Por Corte',
                TALLA : record.get('TALLA'),
                DETALLE_MATERIAL : record.get('DETALLE_MATERIAL'),
                CANTIDAD : record.get('TOTAL_TELA')
            });
            me.grid.store.insert(0, rec_corte);
            me.grid.getView().refresh();
            });
        }
        else{
             Ext.MessageBox.alert('Error', 'Seleccione Una OP y vuelva a intentarlo...');
        }
//        alert(me.cbx_orden.getValue());
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
