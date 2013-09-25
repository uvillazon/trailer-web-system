
//Definiendo columnas para el grid que muestra datos de los equipos
var columns = [
        { xtype: 'rownumberer', width: 30, sortable: false },
        { header: "Nit", width: 70, sortable: true, dataIndex: 'nit' },
        { header: "Nro Factura", width: 90, sortable: true, dataIndex: 'nrofactura'/*,renderer: renderTopic*/ },
        { header: "Nro Autorizacion", width: 90, sortable: true, dataIndex: 'nroautorizacion' },
        { header: "Fecha", width: 60, sortable: true, dataIndex: 'fecha' },
        { header: "Importe", width: 50, sortable: true, dataIndex: 'importe' },
       ];
//Definimos enlace del codigo
/*  function renderTopic(value, p, record) {
return Ext.String.format(
'<a href="http://google.com/" target="_blank">{0}</a>',
value,
record.data.forumtitle,
record.getId(),
record.data.forumid
);
}*/
        Ext.define("App.CargarArchivo.Vistas.Grid", {
            extend: "Ext.grid.Panel",
            title: 'Archivos Cargados',
            // width: 450,
            //margins: '0 20 0 0',
            // region: 'west',

            loadMask: true,
            // collapsible: true,
            fieldSet: '',
            equipo: '',
            split: true,
            disableSelection: false,
            value: '',
            initComponent: function () {
                //                var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
                //                    groupHeaderTpl: '{name} ({rows.length} Resultado{[values.rows.length > 1 ? "s" : ""]})',
                //                    hideGroupedHeader: true
                //                });
                //  me.busqueda = Ext.define("App.Utils.Componente.TextFieldBase"/*, {}*/);
                var me = this;
                var store = Ext.create("App.Busqueda.Store.EquiposElemento");
                this.store = store;
                this.columns = columns;
                //this.features = [groupingFeature];
                me.txt_busqueda = Ext.create("App.Utils.Componente.TextFieldBase", { fieldLabel: "Cod. Equipo/Elemento", width: 250, labelWidth: 120 })
                me.button = Ext.create('Ext.Button', {
                    //text: 'Click me',
                    text: 'Buscar',
                    pressed: true,
                    iconCls: 'zoom',
                    tooltip: 'Buscar por Codigo',
                    cls: 'botones',
                    enableToggle: true,
                    scope: this
                });
                ////////////////////////
                me.buttonConsulta = Ext.create('Ext.Button', {
                    //text: 'Consulta Equipo/Elemento',
                    pressed: true,
                    iconCls: 'add',
                    tooltip: 'Cargar Archivo',
                    cls: 'botones',
                    enableToggle: true,
                    scope: this,
                    handler: function () {
                        this.CargarArchivo();
                        //alert(this.getSelectionModel().getSelection()[0]);
                    }

                });
                /////////////////////////
                this.dockedItems = [{
                    xtype: 'toolbar',
                    items: [
                    me.txt_busqueda,
                    me.button,
                    {
                        pressed: true,
                        cls: 'botones',
                        iconCls: 'building_add',
                        tooltip: 'Introducir Criterios de Busqueda',
                        enableToggle: true,
                        scope: this,
                        handler: function () {
                            this.Criterios();
                        }
                    },
                     me.buttonConsulta
                    ]
                }];
                me.txt_busqueda.on('specialkey', this.CodMay, this);
                me.button.on('click', this.CodMay1, this);
                /*this.bbar = Ext.create('Ext.PagingToolbar', {
                store: this.store,
                displayInfo: true,
                displayMsg: 'TOTAL: {2}',
                emptyMsg: "No existen Equipos/Elementos Registrados."

                });*/
                this.callParent(arguments);
            },
            Criterios: function () {
                var me = this;
                me.ventanaCriterio = Ext.create("App.Busqueda.Vistas.VentanaCriterios", { title: " Criterios de Busqueda", height: 160, width: 410, storeBuscar: me.getStore(), gridBuscar: me, data: me.txt_busqueda.getValue() });
                me.ventanaCriterio.show();
            },
            CodMay: function (f, e) {
                var me = this;
                me.store.load({
                    params: {
                        codigobuscar: f.value,
                        codigo: 'BUSQUEDA', condicion: 'BUSQUEDA'
                    }
                });

            },
            CodMay1: function () {
                var me = this;

                me.store.load({
                    params: {
                        codigobuscar: me.txt_busqueda.getValue(),
                        codigo: 'BUSQUEDA', condicion: 'BUSQUEDA'
                    }
                });

            },
            CargarArchivo: function () {
                var me = this;
                me.win = Ext.create("App.Utils.Ventana", { height: 190, opcion: 'Botones' });
                me.form1 = Ext.create("App.Utils.FormArchivo", { equipo: "ArchivoExcel" });
                me.win.add(me.form1);
                me.win.getBotonGuardar().on('click', this.Guardar, this);
                me.win.show();
            },
             Guardar: function () {
        var me = this;
        var form1 = me.form1.getForm();
        //alert(me.id);
        if (form1.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar Los cambios?', function (btn) {

                if (btn == 'yes') {
                    form1.submit({
                        // submitEmptyText: false,
                        url: host+'Imagen/CargarArchivo',

                        scope: me.form1,
                        waitMsg: 'Guardando ...',
                        success: function (form, action) {
                            Ext.MessageBox.alert('Exito', action.result.result);
                            me.win.hide();
                            //me.CargarImagen(me.data,me.idequipo);
                        },
                        failure: function (form, action) {
                            me.win.hide();
                            Ext.MessageBox.alert('Error', action.result.result);
                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }


    },

        });
