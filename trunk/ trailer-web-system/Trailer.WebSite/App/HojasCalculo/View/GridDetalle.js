Ext.define("App.HojasCalculo.View.GridDetalle", {
    extend: "Ext.grid.Panel",
    title: 'Detalle Hoja de Calculo ',
    width: 480,
    height: 450,
    collapsible: true,
    split: true,
    height: '100%',
//    collapsible: true,
    useArrows: true,
    rootVisible: true,
    idIngreso: 0,
    estadoIngreso: '',
    gridDetalleEntrega : null,
    requires: ['App.Utils.ux.Printer'],
    opcion : '',
    initComponent: function () {
        var me = this;
        if(me.opcion==''){
            me.CargarComponentes();
        }
        else if (me.opcion == 'HojasCalculo'){
            me.CargarComponentesHojasCalculo()
        }
        else{
            alert("otra opcion");
        }
        

        this.callParent(arguments);

    },
    CargarComponentesHojasCalculo : function(){
        var me = this;
        this.store = Ext.create('App.HojasCalculo.Store.HojasCalculo', { pageSize: 3000 });
        //        this.store.load();
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: 'Nro <br> hoja', sortable: true, dataIndex: 'DESC', width: 80 },
            { header: "Nro <br> OP", width: 80, sortable: true, dataIndex: 'TALLA' },
            { header: "Arituclo", width: 200, sortable: true, dataIndex: 'CANTIDAD'},
            { header: "Estado", width: 100, sortable: true, dataIndex: 'COSTO'}];
            this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen Resultados."

        });
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [
                    {
                        pressed: true,
                        cls: 'botones',
                        iconCls: 'printer',
                        tooltip: 'Imprimir Datos',
                        enableToggle: true,
                        scope: this,
                        handler: function () {
                            App.Utils.ux.Printer.mainTitle = me.title;
                            App.Utils.ux.Printer.print(me);
                        }
                    },
                      {
                          iconCls: 'report',
                          tooltip: 'Ver Detalle de Op',
                          scope: this,
                          handler: function () {
                              me.VerDetalle()
                          }
                      },
           ]
        }
        ];
        me.bar = this.bbar;
    },
    CargarComponentes : function(){
        // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        var me = this;
        me.plugins = [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })];
   
        me.selType = 'cellmodel';
        this.store = Ext.create('App.OrdenesProduccion.Store.DetallesOrden', { pageSize: 3000 });
        //        this.store.load();
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { dataIndex: 'ID_DETALLE_ORDEN', hidden: true },
            { header: 'Descripcion', sortable: true, dataIndex: 'DESC', width: 200 },
            { header: "Talla", width: 50, sortable: true, dataIndex: 'TALLA' },
            { header: "Cantidad", width: 60, sortable: true, dataIndex: 'CANTIDAD',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 0,
                    maxValue: 100000,
                    allowNegative: true,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    selectOnFocus: true
                }

            },
            { header: "Costo <br>Unitario", width: 60, sortable: true, dataIndex: 'COSTO',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 0,
                    maxValue: 100000,
                    allowNegative: true,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    selectOnFocus: true
                }
            },
            { header: "Total", width: 60, sortable: true, dataIndex: 'TOTAL',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    me.cambiarTotal();
                    if (record != null) {
                        return '<b>' + Ext.util.Format.usMoney(record.get('COSTO') * record.get('CANTIDAD')) + '</b>';

                    }
                }
            },
        ];
        //////////
        me.txt_total = Ext.create("App.Utils.Componente.TextFieldBase", {
            //name: 'TOTAL',
            cls: 'DisabledClase',
            fieldLabel: 'Total',
            labelWidth: 35,
            width: 100,
            readOnly: true
        });
        me.txt_total_cant = Ext.create("App.Utils.Componente.TextFieldBase", {
            //name: 'TOTAL_CANT',
            cls: 'DisabledClase',
            fieldLabel: 'Total Cant',
            labelWidth: 35,
            width: 100,
            readOnly: true
        });

        ///////////
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [
                    {
                        pressed: true,
                        cls: 'botones',
                        iconCls: 'printer',
                        tooltip: 'Imprimir Datos',
                        enableToggle: true,
                        scope: this,
                        handler: function () {
                            App.Utils.ux.Printer.mainTitle = me.title;
                            App.Utils.ux.Printer.print(me);
                        }
                    },
                     {
                         iconCls: 'add',
                         tooltip: 'Agregar',
                         scope: this,
                         handler: function () {
                             this.Agregar();
                         }
                     },
                      {
                          iconCls: 'disk',
                          tooltip: 'Guardar',
                          scope: this,
                          handler: function () {
                              this.GuardarCambios();
                          }
                      },
                      {
                          iconCls: 'arrow_refresh',
                          tooltip: 'Recargar',
                          scope: this,
                          handler: function () {
                              me.store.load();
                          }
                      },
                      {
                          iconCls: 'application_form_edit',
                          tooltip: 'Editar',
                          scope: this,
                          handler: function () {
                              this.Editar();
                          }
                      },
                      {
                          iconCls: 'delete',
                          tooltip: 'Eliminar',
                          scope: this,
                          handler: function () {
                              me.Eliminar()
                          }
                      },
                      {
                          iconCls: 'report',
                          tooltip: 'Ver Detalle de Op',
                          scope: this,
                          handler: function () {
                              me.VerDetalle()
                          }
                      },
                      '->', // same as { xtype: 'tbfill' }
                        me.txt_total, me.txt_total_cant
            //application_form_edit.png

           ]
        }
        ];
        //////////////////////////
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen Resultados."

        });
        me.bar = this.bbar;
        me.store.on('load', me.cambiarTotal, this);
        if (me.gridDetalleEntrega != null) {
            me.on('celldblclick', me.CargarGridEntrega, this);
        }
    },
    CargarDatos: function (record) {
        var me = this;
        //        alert(record.get('TIPO_LISTA'));
        me.setTitle("Detalle Orden Produccion   OP: " + record.get('NRO_ORDEN'));
        me.idIngreso = record.get('ID_ORDEN_PRODUCCION');
        me.estadoIngreso = record.get('ESTADO');
        me.store.setExtraParam('condicion', me.idIngreso);
        me.store.setExtraParam('Codigo', 'OP');
        me.txt_total.setValue('0');
        me.txt_total_cant.setValue('0');
        me.getStore().load();
    },
    Editar  : function(){

        var me = this;
        me.data = me.getSelectionModel().getSelection()[0];
         if (me.data != null) {
            me.winOP = Ext.create('App.Utils.Ventana', { y: 20, width: 550, height: 400, opcion: 'botones' });
            me.formOP = Ext.create('App.OrdenesProduccion.View.FormDetalleOp');
            me.formOP.CargarDatos(me.data);
            me.winOP.add(me.formOP);
            me.winOP.show();
            me.winOP.getBotonGuardar().on('click', me.GuardarDetalle, this);
        }
        else{
            Ext.MessageBox.alert('Aviso', 'Seleccione un registro <br> para Editar..');
        }
    },
    VerDetalle : function(){
        var me= this;
        me.data = me.getSelectionModel().getSelection()[0];
        if (me.data != null) {
            me.formOP = Ext.create('App.OrdenesProduccion.View.FormDetalleOp');
            me.formOP.CargarDatosWin(me.data);
         }
        else{
            Ext.MessageBox.alert('Aviso', 'Seleccione un registro <br> para Ver Detalle..');
        }
    },
    Eliminar: function () {
        var me = this;
        var data = this.getSelectionModel().getSelection()[0];

        if (data != null) {
            if (data.get('ID_DETALLE_INGRESO') != 0) {
                Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar este Registro?', function (btn) {
                    if (btn == 'yes') {
                        me.el.mask('Procesando...', 'x-mask-loading');
                        Ext.Ajax.request({
                            url: host+'OrdenesProduccion/EliminarDetalle',
                            params: { ID_DETALLE_ORDEN: data.get('ID_DETALLE_ORDEN') },
                            success: function (response) {
                                me.el.unmask();
                                r = Ext.decode(response.responseText);
                                if (!r.success) {
                                    Ext.MessageBox.alert('Error', r.msg);
                                    return;
                                } else {
                                    Ext.MessageBox.alert('Exito', r.msg);
                                    me.getStore().load();
                                }
                            },
                            failure: function (response) {
                                me.el.unmask();
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
            Ext.MessageBox.alert('Error', 'Seleccione Un registro');
        }
    }

    ,
    GuardarCambios : function(){
        var me = this;
        var resultArray = [];
        var modified = me.getStore().getModifiedRecords(); //step 1
        var count = 0;
        if (!Ext.isEmpty(modified)) {
            var recordsToSend = [];
            Ext.each(modified, function (record) { //step 2
                recordsToSend.push(Ext.apply({ ID_DETALLE_ORDEN: record.data.ID_DETALLE_ORDEN, CANTIDAD: record.data.CANTIDAD, COSTO: record.data.COSTO, TOTAL: record.data.TOTAL }));

            });
            recordsToSend = Ext.JSON.encode(recordsToSend);
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar Los Cambios?', function (btn) {
                if (btn == 'yes') {
                    me.el.mask('Procesando...', 'x-mask-loading');
                    Ext.Ajax.request({
                        url: host+'OrdenesProduccion/ModificarDetalles',
                        params: { Detalles: recordsToSend, ID_ORDEN_PRODUCCION: me.idIngreso },
                        success: function (result, request) {
                            var obj = Ext.decode(result.responseText);
                            me.el.unmask();
                            if (obj.success === true) {
                                Ext.MessageBox.alert('Exito', obj.msg);
                                me.getStore().load();
                            } else {
                                Ext.MessageBox.alert('Error', obj.msg);
                                me.getStore().load();
                            }

                        },
                        failure: function (result, request) {
                            me.el.unmask();
                            console.log('server-side failure with status code ' + response.status);
                        }

                    });
                }
            });
        }
        else {
            Ext.MessageBox.alert('Error', 'Ingrese un Valor Para modificar');
        }
    },
    cambiarTotal: function () {
        var me = this;
        var total = 0;
        var totalCantidad = 0;
        me.txt_total.setValue(total);
        me.txt_total_cant.setValue(totalCantidad);
        if (me.getStore().count() > 0) {
            me.getStore().each(function (record) {
                total += record.get('COSTO') * record.get('CANTIDAD');
                totalCantidad += record.get('CANTIDAD');
            });
        }
        //console.log(total);
        me.txt_total.setValue(total);
        me.txt_total_cant.setValue(totalCantidad);
    },
    Agregar: function () {
        var me = this;
        if (me.iidIngreso != 0) {
            me.win = Ext.create('App.Utils.Ventana', { y: 20, width: 550, height: 750, opcion: 'botones' });
            me.form = Ext.create('App.OrdenesProduccion.View.FormDetalle');
            me.win.add(me.form);
            me.win.show();
            me.win.getBotonGuardar().on('click', me.Guardar, this);
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione una Orden de Produccion');
        }
    },
    Guardar: function () {
        var me = this;
        var form = me.form.getForm();

        if (form.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar los cambios', function (btn) {

                if (btn == 'yes') {
                    me.form.el.mask('Procesando...', 'x-mask-loading');
                    form.submit({
                        submitEmptyText: false,
                        params: { tallas: me.form.enviarTallas(), ID_ORDEN_PRODUCCION: me.idIngreso },
                        url: host+'OrdenesProduccion/CrearDetallesOrden',
                        success: function (form, action) {
                            me.form.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.form.getForm().reset();
                            me.win.hide();
                            me.store.load();

                        },
                        failure: function (form, action) {
                            me.form.el.unmask();
                            Ext.MessageBox.alert('Error', action.result.msg);
                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    },
    GuardarDetalle: function () {
        var me = this;
        var formOP = me.formOP.getForm();

        if (formOP.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar los cambios', function (btn) {

                if (btn == 'yes') {
                    me.formOP.el.mask('Procesando...', 'x-mask-loading');
                    formOP.submit({
                        submitEmptyText: false,
                        url: host+'OrdenesProduccion/ModificarDetallesOrden',
                        success: function (formOP, action) {
                            me.formOP.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            me.formOP.getForm().reset();
                            me.winOP.hide();
                            me.store.load();

                        },
                        failure: function (formOP, action) {
                            me.formOP.el.unmask();
                            Ext.MessageBox.alert('Error', action.result.msg);
                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    },
    CargarGridEntrega: function (grid, cell, col, record) {
        var me = this;
            if (me.gridDetalleEntrega.idIngreso != 0 && me.gridDetalleEntrega.estadoIngreso != 'COMPLETADO') {
            var rec = Ext.create('App.Entregas.Model.DetallesEntrega', {
                ID_DETALLE_ENTREGA: 0,
                ID_DETALLE_ORDEN : record.data['ID_DETALLE_ORDEN'],
                ID_ENTREGA: me.gridDetalleEntrega.idIngreso,
                ARTICULO: record.data['ARTICULO'],
                NRO_ENTREGA : record.data['NRO_ENTREGA'],
                TALLA : record.data['TALLA'],
                DESC: record.data['DESC'],
                CANTIDAD_ENTREGADA: 1
               
//                { name: 'ID_DETALLE_ENTREGA', type: 'int' },
//        { name: 'NRO_ENTREGA', type: 'int' },
//        { name: 'ID_ENTREGA', type: 'int' },
//        { name: 'ID_DETALLE_ORDEN', type: 'int' },
//        { name: 'ARTICULO', type: 'string' },
//        { name: 'TELA', type: 'string' },
//        { name: 'DETALLE_ITEM', type: 'string' },
//        { name: 'DETALLE_BORDADO', type: 'string' },
//        { name: 'DETALLE_COSTURA', type: 'string' },
//        { name: 'OBSERVACION', type: 'string' },
//        { name: 'CANTIDAD_ENTREGADA', type: 'float' },
//        { name: 'TALLA', type: 'string' },
//        { name: 'DESC', type: 'string' }

            });
            me.gridDetalleEntrega.store.insert(0, rec);

        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Ptra Entrega o Verifique que la Entrega No Este Completado...');
        }
    },
    ////////////////////////// 
});
