
//Definiendo columnas para el grid que muestra datos de los equipos
var columns = [
        { xtype: 'rownumberer', width: 30, sortable: false },
        { header: "Equipo/Elemento", width: 70, sortable: true, dataIndex: 'EQUIPOELEMENTO' },
        { header: "Cod. Equipo/Elemento",width: 90,sortable: true,dataIndex: 'CODIGO'/*,renderer: renderTopic*/},
        { header: "Marca", width: 90, sortable: true, dataIndex: 'MARCA' },
        { header: "Serie", width: 60, sortable: true, dataIndex: 'SERIE' },
        { header: "Modelo", width: 60, sortable: true, dataIndex: 'MODELO' },
        { header: "Año<br>Fabricación", width: 50, sortable: true, dataIndex: 'ANIO_FABR' },
        { header: "Tension<br> Nominal", width: 70, sortable: true, dataIndex: 'TENS_NOMINAL' },
        { header: "Tension<br> Operación", width: 70, sortable: true, dataIndex: 'TENS_OPER' },
        { header: "Sistema <br>Elemento", width: 70, sortable: true, dataIndex: 'AREA_UBIC' },
        { header: "Ubicación", width: 70, sortable: true, dataIndex: 'UBICACION' },
        { header: "Fecha <br> Alta", width: 70, sortable: true, dataIndex: 'FECHA_ALTA', renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        { header: 'Estado', dataIndex: 'ESTADO', width: 70 }    
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
        Ext.define("App.Busqueda.Vistas.Grid", {
            extend: "Ext.grid.Panel",
            title: 'Equipos/Elementos Registradoss',
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
                var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
                    groupHeaderTpl: '{name} ({rows.length} Resultado{[values.rows.length > 1 ? "s" : ""]})',
                    hideGroupedHeader: true
                });
                //  me.busqueda = Ext.define("App.Utils.Componente.TextFieldBase"/*, {}*/);
                var me = this;
                var store = Ext.create("App.Busqueda.Store.EquiposElemento");
                this.store = store;
                this.columns = columns;
                this.features = [groupingFeature];
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
                    iconCls: 'report',
                    tooltip: 'Consultar por Equipo o Elemento',
                    cls: 'botones',
                    enableToggle: true,
                    scope: this,
                    handler: function () {
                        this.ConsultaEquipo();
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
            ConsultaEquipo: function () {
                var me = this;
                var data = this.getSelectionModel().getSelection()[0]
                if (data != null) {
                    alert(data.get("EQUIPOELEMENTO"));
                    if (data.get("EQUIPOELEMENTO") == "CAPACITOR") {
                        me.ConsultaCapacitor(data.get('ID'));
                    }
                    else if (data.get("EQUIPOELEMENTO") == "INTERRUPTOR") {
                        me.ConsultaInterruptor(data.get('ID'));
                    }
                    else if (data.get("EQUIPOELEMENTO") == "EQUIPOS MANIOBRA") {
                        me.ConsultaEquipoManiobra(data.get('ID'));
                    }
                    else if (data.get("EQUIPOELEMENTO") == "RECONECTADOR") {
                        me.ConsultaReconectador(data.get('ID'));
                    }
                    else if (data.get("EQUIPOELEMENTO") == "CONTROLADOR RECONECTADOR") {
                        me.ConsultaControladorReconectador(data.get('ID'));
                    }
                    else if (data.get("EQUIPOELEMENTO") == "REGULADORES TENSION") {
                        me.ConsultaRegulador(data.get('ID'));
                    }
                    else if (data.get("EQUIPOELEMENTO") == "CONTROLADOR REGULADOR") {
                        me.ConsultaControladorRegulador(data.get('ID'));
                    }
                    else if (data.get("EQUIPOELEMENTO") == "SECCIONADOR BC") {
                        me.ConsultaSeccionador(data.get('ID'));
                    }
                    else if (data.get("EQUIPOELEMENTO") == "MANDO SECCIONADOR BC") {
                        me.ConsultaMandoSeccionador(data.get('ID'));
                    }
                    else if (data.get("EQUIPOELEMENTO") == "ELEMENTO") {
                        me.ConsultaElemento(data.get('ID'));
                    }
                    else if (data.get("EQUIPOELEMENTO") == "TRANSFORMADOR") {
                        me.ConsultaTransformador(data.get('ID'));
                    }
                    else if (data.get("EQUIPOELEMENTO") == "PUESTO") {
                        me.ConsultaPuesto(data.get('ID'));
                    }
                    //CONTROLADOR REGULADOR
                }
                else {
                    Ext.MessageBox.alert('Aviso', 'Seleccione Un registro <br> Para ver la consulta');
                }
            },
            ConsultaCapacitor: function (id) {
                var win = Ext.create("App.Utils.Ventana", { title: "Consulta de Equipo", width: 770, height: 500, y: 20 });
                var tapconsultaequipoCapacitor = Ext.create("App.Capacitores.View.TabPanelConsultaEquipo", { opcion: "CAPACITOR" });
                // tapconsultaequipoReconectador.CargarReconectador(data);
                win.add(tapconsultaequipoCapacitor);
                tapconsultaequipoCapacitor.GetDataById(id);
                win.show();

            },
            ConsultaInterruptor: function (id) {
                var win = Ext.create("App.Utils.Ventana", { title: "Consulta de Equipo", width: 770, height: 500, y: 20 });
                var tapconsultaequipoCapacitor = Ext.create("App.Interruptores.View.TabPanelConsultaEquipo", { opcion: "INTERRUPTORES" });
                // tapconsultaequipoReconectador.CargarReconectador(data);
                win.add(tapconsultaequipoCapacitor);
                tapconsultaequipoCapacitor.GetDataById(id);
                win.show();

            },
            ConsultaEquipoManiobra: function (id) {
                var win = Ext.create("App.Utils.Ventana", { title: "Consulta de Equipo", width: 770, height: 500, y: 20 });
                var tapconsultaequipoCapacitor = Ext.create("App.Equipos.View.TabPanelConsultaEquipo", { opcion: "EQUIPOS DE MANIOBRA" });
                // tapconsultaequipoReconectador.CargarReconectador(data);
                win.add(tapconsultaequipoCapacitor);
                tapconsultaequipoCapacitor.GetDataById(id);
                win.show();
            },
            ConsultaReconectador: function (id) {
                var win = Ext.create("App.Utils.Ventana", { title: "Consulta de Equipo", width: 770, height: 500, y: 20 });
                var tapconsultaequipoCapacitor = Ext.create("App.Reconectadores.View.TabPanelConsultaReconectador", { opcion: "EQUIPOS DE MANIOBRA" });
                // tapconsultaequipoReconectador.CargarReconectador(data);
                win.add(tapconsultaequipoCapacitor);
                tapconsultaequipoCapacitor.GetDataById(id);
                win.show();
            },
            ConsultaControladorReconectador: function (id) {
                var win = Ext.create("App.Utils.Ventana", { title: "Consulta de Equipo", width: 770, height: 500, y: 20 });
                var tapconsultaequipoCapacitor = Ext.create("App.ControladorReconectador.View.TabPanelConsultaEquipo", { opcion: "EQUIPOS DE MANIOBRA" });
                // tapconsultaequipoReconectador.CargarReconectador(data);
                win.add(tapconsultaequipoCapacitor);
                tapconsultaequipoCapacitor.GetDataById(id);
                win.show();
            },
            ConsultaRegulador: function (id) {
                var win = Ext.create("App.Utils.Ventana", { title: "Consulta de Equipo", width: 770, height: 500, y: 20 });
                var tapconsultaequipoCapacitor = Ext.create("App.Reguladores.View.TabPanelConsultaEquipo", { opcion: "EQUIPOS DE MANIOBRA" });
                // tapconsultaequipoReconectador.CargarReconectador(data);
                win.add(tapconsultaequipoCapacitor);
                tapconsultaequipoCapacitor.GetDataById(id);
                win.show();
            },
            ConsultaControladorRegulador: function (id) {
                var win = Ext.create("App.Utils.Ventana", { title: "Consulta de Equipo", width: 770, height: 500, y: 20 });
                var tapconsultaequipoCapacitor = Ext.create("App.ControladorRegulador.View.TabPanelConsultaEquipo", { opcion: "EQUIPOS DE MANIOBRA" });
                // tapconsultaequipoReconectador.CargarReconectador(data);
                win.add(tapconsultaequipoCapacitor);
                tapconsultaequipoCapacitor.GetDataById(id);
                win.show();
            },
            ConsultaSeccionador: function (id) {
                var win = Ext.create("App.Utils.Ventana", { title: "Consulta de Equipo", width: 770, height: 500, y: 20 });
                var tapconsultaequipoCapacitor = Ext.create("App.SeccionadorBajoCarga.View.TabPanelConsultaEquipo", { opcion: "SECCIONADORBC" });
                // tapconsultaequipoReconectador.CargarReconectador(data);
                win.add(tapconsultaequipoCapacitor);
                tapconsultaequipoCapacitor.GetDataById(id);
                win.show();
            },
            ConsultaMandoSeccionador: function (id) {
                var win = Ext.create("App.Utils.Ventana", { title: "Consulta de Equipo", width: 770, height: 500, y: 20 });
                var tapconsultaequipoCapacitor = Ext.create("App.MandoSeccionador.View.TabPanelConsultaEquipo", { opcion: "SECCIONADORBC" });
                // tapconsultaequipoReconectador.CargarReconectador(data);
                win.add(tapconsultaequipoCapacitor);
                tapconsultaequipoCapacitor.GetDataById(id);
                win.show();
            },
            ConsultaElemento: function (id) {
                var win = Ext.create("App.Utils.Ventana", { title: " Consulta de Elemento", width: 550, height: 500, y: 20 });
                var tapconsultaequipoCapacitor = Ext.create("App.Elemento.View.PanelElementoMovimiento", { idelemento: id});
                // tapconsultaequipoReconectador.CargarReconectador(data);
                win.add(tapconsultaequipoCapacitor);
               // tapconsultaequipoCapacitor.GetDataById(id);
                win.show();
            },
            ConsultaTransformador: function (id) {
                var win = Ext.create("App.Utils.Ventana", { title: "Consulta del Transformador", width: 770, height: 500, y: 20 });
                var tapconsultaequipoCapacitor = Ext.create("App.Transformadores.View.TabPanelConsultaEquipo", { opcion: "TRANSFORMADOR" });
                
                win.add(tapconsultaequipoCapacitor);
                tapconsultaequipoCapacitor.GetDataById(id);
                win.show();
            },
            ConsultaPuesto: function (id) {
                var win = Ext.create("App.Utils.Ventana", { title: "Consulta del Puesto de Transformador", width: 770, height: 500, y: 20 });
                var tapconsultaequipoCapacitor = Ext.create("App.PuestoTransformador.View.TabPanelConsultaEquipo", { opcion: "TRANSFORMADOR" });

                win.add(tapconsultaequipoCapacitor);
                tapconsultaequipoCapacitor.GetDataById(id);
                win.show();
            }

        });
