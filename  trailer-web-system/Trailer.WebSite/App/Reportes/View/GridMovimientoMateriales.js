Ext.define("App.Reportes.View.GridMovimientoMateriales", {
    extend: "Ext.grid.Panel",
    title: 'Movimiento de Materiales',
    width: 500,
    collapsible: true,
    split: true,
    height: '100%',
    iconCls: 'application_view_list',
    collapsible: true,
    useArrows: true,
    rootVisible: true,
    requires: ['App.Utils.ux.Printer'],
    form: null,
    record: null,
    gridDetalle : null,
    initComponent: function () {

        // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        var me = this;
        this.store = Ext.create('App.Reportes.Store.MovimientoMateriales');
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: "Fecha <br> Movimiento", width: 100, sortable: true, dataIndex: 'FECHA_MOV', renderer: Ext.util.Format.dateRenderer('m/d/Y H:i:s') },
            { header: "Detalle", width: 100, sortable: true, dataIndex: 'DETALLE' },
            { header: "Operacion", width: 100, sortable: true, dataIndex: 'OPERACION' },
            { header: "Entrada", width: 100, sortable: true, dataIndex: 'ENTRADA' },
            { header: "Salida", width: 100, sortable: true, dataIndex: 'SALIDA' },
            { header: "Saldo", width: 100, sortable: true, dataIndex: 'SALDO' },
            { header: "Costo <br> Unitario", width: 100, sortable: true, dataIndex: 'COSTO' },
            { header: "Ingreso", width: 100, sortable: true, dataIndex: 'INGRESO' },
            { header: "Egreso", width: 100, sortable: true, dataIndex: 'EGRESO' },
            { header: "Saldo <br> Bs", width: 100, sortable: true, dataIndex: 'SALDOBS' },
            { header: "Saldo <br> Disponible", width: 100, sortable: true, dataIndex: 'SALDO_CANTIDAD' }
        ];
        //////////
        me.txt_busqueda = Ext.create("App.Utils.Componente.TextFieldBase", { fieldLabel: "Buscar Movimiento", width: 200, labelWidth: 80 })
        me.button = Ext.create('Ext.Button', {
            //text: 'Click me',
            text: 'Buscar',
            pressed: true,
            iconCls: 'zoom',
            tooltip: 'Buscar Movimiento Por operacion',
            cls: 'botones',
            enableToggle: true,
            scope: this

        });
        ///////////
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [
            ////////////////
                    me.txt_busqueda,
                    me.button,
                            {
                                pressed: true,
                                cls: 'botones',
                                iconCls: 'printer',
                                tooltip: 'Imprimir Datos',
                                enableToggle: true,
                                scope: this,
                                handler: function () {
                                    App.Utils.ux.Printer.print(me);
                                }
                            }
           ]
        }];
        //////////////////////////
        me.txt_busqueda.on('specialkey', this.buscarEnterCodigo, this);
        me.button.on('click', this.buscarBotonCodigo, this);
        //////////////////////////
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} de {2}',
            emptyMsg: "No existen Resultados."

        });
        me.bar = this.bbar;
        this.callParent(arguments);

    },
    CargarDatos: function (record) {
        var me = this;
        me.record = record;
        //        alert(record.get('TIPO_LISTA'));
        me.setTitle("Salidas Registrados   OP: " + record.get('NRO_ORDEN'));
        me.idMaterial = record.get('ID_MATERIA_PRIMA');
        me.store.setExtraParam('condicion', me.idMaterial);
        me.store.setExtraParam('Codigo', 'MATERIA_PRIMA');
        me.bar.moveFirst();
    },
    buscarEnterCodigo: function (f, e) {
        var me = this;
        // me.store.setBaseParam('condicion', me.txt_busqueda.getValue());
        if (e.getKey() == e.ENTER) {
            me.store.setExtraParam('codigo', 'CODIGO');
            me.store.setExtraParam('condicion', me.txt_busqueda.getValue());
            me.bar.moveFirst();
            me.store.load();

        }
    },
    buscarBotonCodigo: function () {
        var me = this;

        me.store.setExtraParam('codigo', 'CODIGO');
        me.store.setExtraParam('condicion', me.txt_busqueda.getValue());
        me.bar.moveFirst();
        me.store.load();
    }
    ////////////////////////// 
});
