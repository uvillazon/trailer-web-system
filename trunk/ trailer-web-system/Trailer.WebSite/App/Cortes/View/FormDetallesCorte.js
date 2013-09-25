Ext.define("App.Cortes.View.FormDetallesCorte", {
    extend: "Ext.form.Panel",
    title: "Registro de Cortes",
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
        me.store_molde = Ext.create('App.Moldes.Store.Moldes');
//        me.store_orden.proxy.extraParams['codigo'] = 'CODIGO';
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
            width: 240,
            colspan : 1,
            afterLabelTextTpl: c_requerido,
            selectOnFocus: true,
            matchFieldWidth : false,
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
        
        me.cbx_molde = Ext.create('App.Utils.Componente.ComboBase', {
            fieldLabel: 'Molde',
            name : 'NRO_MOLDE',
            store: me.store_molde,
            displayField: 'NRO_MOLDE',
            valueField: 'ID_MOLDE',
            queryMode: 'remote',
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No existe MOLDES.',
                getInnerTpl: function() {
                    return '' +
                        '<h3>{NRO_MOLDE} - Categoria : {CATEGORIA} - {EMPRESA}</h3>' +
                        'Detalles :{DETALLE} - Talla{TALLA}' +
                    '';
                }
            },
        });
        me.txt_total_tela = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Total Tela',
            name: 'Total Tela',
            width: 240, 
            readOnly: true,
            disabled : true,
            columns :2,
            value : 0,
            disabledCls: 'DisabledClaseTotal',
            //margin: '10'
        });
        me.txt_total_cantidad = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Total Cantidad',
            name: 'Total Cantidad',
            width: 240, 
            readOnly: true,
            disabled : true,
             value : 0,
            disabledCls: 'DisabledClaseTotal',
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
        me.grid = Ext.create("App.Cortes.View.GridDetalleCorte",{colspan :3 , txt_total : me.num_Importe , form : this});
        me.items = [
       
        me.cbx_orden,
        me.txt_recepcion,
        me.txt_cliente,
        me.dat_fecha,
        me.dat_fecha_ent,
        me.txt_responsable,
        me.cbx_item,
        me.cbx_material,
        me.cbx_molde,
        me.grid,
        me.txt_total_tela,
        me.txt_total_cantidad
        ];
        
        me.grid.store.on('load', me.CargarTotales, this);
        me.grid.Crear.on('click',me.AgregarItem,this);
        me.grid.Eliminar.on('click',me.EliminarItem,this);
//        me.num_Importe.on('specialkey',me.CargarImportes,this);
//        me.grid.on('cellclick', me.CargarDatos, this);
        me.grid.getStore().on('load',me.CargarTotales,this);
    },
     CargarTotales: function (n) {
        var me = this;
        var total = 0;
        var TotalTela = 0;
        me.grid.getStore().each(function (record) {
            TotalTela += record.get('TOTAL_TELA');
            total += record.get('TOTAL_CANTIDAD');
        });
        me.txt_total_tela.setValue(TotalTela);
        me.txt_total_cantidad.setValue(total);
    },
    AgregarEventos : function(){
        var me = this;
        me.cbx_orden.on('select', function (cmb, record, index) {
               me.getForm().loadRecord(record[0]);
                me.store_item.setExtraParam('condicion', record[0].get('ID_ORDEN_PRODUCCION'));
                me.store_item.setExtraParam('codigo', 'OP');
                me.store_item.load();
                me.grid.getStore().setExtraParam('condicion', record[0].get('ID_ORDEN_PRODUCCION'));
//                ITEMORDENPRODUCCION
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
//            me.grid.getStore().setExtraParam('condicion', record[0].get('ID_ORDEN_PRODUCCION'));
            me.grid.getStore().setExtraParam('codigo', 'ORDENPRODUCCION'); 
            me.grid.getStore().load();
            me.grid.getStore().filter("ID_MATERIA_PRIMA", record[0].get('ID_MATERIA_PRIMA'));

//            me.AgregarItem();
        });
         me.cbx_molde.on('select', function (cmb, record, index) {
            me.molde  = record[0];
//            me.AgregarItem();
        });
        
    },
    EliminarItem : function(){
        var me = this;
         var data = me.grid.getSelectionModel().getSelection()[0];
        if (data != null) {
            if (data.get('ID_CORTE') != 0) {
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
                me.store.remove(data);
                me.cambiarTotal();
            }

        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro para Eliminar');
        }
        
    },
    AgregarItem : function(){
        var me = this;
//        alert(me.material.get('NOMBRE'));
        if (me.item != null && me.material != null && me.molde != null) {
            var rec = Ext.create('App.Cortes.Model.Cortes', {
                ID_CORTE: 0,
                ID_MOLDE : me.molde.get('ID_MOLDE'),
                NRO_MOLDE : me.molde.get('NRO_MOLDE'),
                ID_DETALLE_ORDEN: me.item.get('ID_DETALLE_ORDEN'),
                ID_MATERIA_PRIMA : me.material.get('ID_MATERIA_PRIMA'),
                DETALLE_ITEM : me.item.get('DESC'),
                DETALLE : 'Sin Detalle',
                TALLA : me.item.get('TALLA'),
                DETALLE_MATERIAL : me.material.get('NOMBRE')+' - '+me.material.get('COLOR'),
                TELA : 1,
                HOJA : 1,
                CANTIDAD : 1,
                TOTAL_TELA: 1,
                TOTAL_CANTIDAD: 1
            });
            me.grid.store.insert(0, rec);
            me.grid.getView().refresh();

        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un Material o Item o Molde y vuelva a intentarlo...');
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
            return null;
        }
    }
    
});
