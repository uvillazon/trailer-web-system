Ext.define("App.Designaciones.View.Grids", {
    extend: "Ext.grid.Panel",
    title: 'Detalle ',
    collapsible: true,
    split: true,
    height: '100%',
    useArrows: true,
    rootVisible: true,
    requires: ['App.Utils.ux.Printer'],
    width: 770,
    height: 300,
    opcion : '',
    initComponent: function () {
        var me = this;
        if(me.opcion==''){
            me.CargarComponentes();
        }
        else if (me.opcion == 'DetalleCancelado'){
            me.CargarComponentesDetalleCancelado()
        }
        else if (me.opcion == 'DetalleEntrega') {
            me.CargarComponentesDetalleEntrega()
        }
        else{
            alert("otra opcion");
        }
        

        this.callParent(arguments);

    },
    CargarComponentesDetalleOp : function(){
        var me = this;
        
    },
    CargarComponentes : function(){
        // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        var me = this;
        this.store = Ext.create('App.Designaciones.Store.Materiales');
        //        this.store.load();
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: "Material", width: 150, sortable: true, dataIndex: "DETALLE" },
            { header: "Unidad", width: 70, sortable: true, dataIndex: "UNIDAD" },
            { header: "Responsable", width: 100, sortable: true, dataIndex: "RESPONSABLE" },
            { header: "Cantidad", width: 70, sortable: true, dataIndex: "CANTIDAD" },
            { header: "Fecha<br>Entregada", width: 100, sortable: true, dataIndex: "FECHA" , renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Observacion", width: 170, sortable: true, dataIndex: "OBSERVACION" },
            
        ];
        //////////
       me.Crear = Ext.create('Ext.Button', {
            text: 'Crear',
            tooltip: 'Agregar Material a Designacion',
            iconCls: 'add',
            cls: 'botones',
            scope: this

        });
        me.Editar = Ext.create('Ext.Button', {
            text: 'Editar',
            iconCls: 'application_form_edit',
            cls: 'botones',
            scope: this

        });
        me.Eliminar = Ext.create('Ext.Button', {
            text: 'Eliminar',
            iconCls: 'delete',
            cls: 'botones',
            scope: this

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
                    },me.Crear,me.Editar,me.Eliminar

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
//        me.store.on('load', me.cambiarTotal, this);
//        if (me.gridDetalleEntrega != null) {
//            me.on('celldblclick', me.CargarGridEntrega, this);
//        }
    },
    CargarComponentesDetalleCancelado : function(){
        // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        var me = this;
        this.store = Ext.create('App.Designaciones.Store.Cancelados');
        //        this.store.load();
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: "Responsable", width: 100, sortable: true, dataIndex: "RESPONSABLE" },
            { header: "Monto<br>Cancelado", width: 70, sortable: true, dataIndex: "CANTIDAD" },
            { header: "Fecha<br>Entregada", width: 100, sortable: true, dataIndex: "FECHA" , renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Observacion", width: 200, sortable: true, dataIndex: "OBSERVACION" },
            
        ];
        //////////
       me.Crear = Ext.create('Ext.Button', {
            text: 'Crear',
            tooltip: 'Cancelar a Designacion',
            iconCls: 'add',
            cls: 'botones',
            scope: this

        });
        me.Editar = Ext.create('Ext.Button', {
            text: 'Editar',
            iconCls: 'application_form_edit',
            cls: 'botones',
            scope: this

        });
        me.Eliminar = Ext.create('Ext.Button', {
            text: 'Eliminar',
            iconCls: 'delete',
            cls: 'botones',
            scope: this

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
                    },me.Crear,me.Editar,me.Eliminar

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
        
    },
    CargarComponentesDetalleEntrega: function () {
        // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        var me = this;
        this.store = Ext.create('App.Designaciones.Store.Entregados');
        //        this.store.load();
        this.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: "Responsable", width: 100, sortable: true, dataIndex: "RESPONSABLE" },
            { header: "Monto<br>Cancelado", width: 70, sortable: true, dataIndex: "CANTIDAD" },
            { header: "Fecha<br>Entregada", width: 100, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Observacion", width: 200, sortable: true, dataIndex: "OBSERVACION" },

        ];
        //////////
        me.Crear = Ext.create('Ext.Button', {
            text: 'Crear',
            tooltip: 'Cancelar a Designacion',
            iconCls: 'add',
            cls: 'botones',
            scope: this

        });
        me.Editar = Ext.create('Ext.Button', {
            text: 'Editar',
            iconCls: 'application_form_edit',
            cls: 'botones',
            scope: this

        });
        me.Eliminar = Ext.create('Ext.Button', {
            text: 'Eliminar',
            iconCls: 'delete',
            cls: 'botones',
            scope: this

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
                    }, me.Crear, me.Editar, me.Eliminar

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

    }
    ////////////////////////// 
});
