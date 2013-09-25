Ext.define("App.Utils.GridPrincipal", {
    extend: "Ext.grid.Panel",
    title: 'Grid Generico',
    width: 450,
    margins: '0 2 0 0',
    loadMask: true,
    fieldSet: '',
    equipo: '',
    value: '',
    split: true,
    stateful: true,
    requires: ['App.Utils.ux.Printer'],
    stateId: null,
    store: null,
    disableSelection: false,
    equipo: '',
    imprimir: false,
    criterios: false,
    busqueda: false,
    ventanaCriterio: null,
    tituloImpresion: '',
    textBusqueda: '',
    //datos para cargar las imagenes
    equipoImagen: '',
    equipoId: '',
    CargarComponentes: function () {
        var me = this;
        if (me.stateId != null) {
            Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        }
        if (me.store != null) {
            this.store.load();
        }

        me.txt_busqueda = Ext.create("App.Utils.Componente.TextFieldBase", { fieldLabel: me.textBusqueda, width: 250, labelWidth: 120, hidden: me.busqueda })
        me.button = Ext.create('Ext.Button', {
            pressed: true,
            text: 'Buscar',
            hidden: me.busqueda,
            iconCls: 'zoom',
            tooltip: 'Buscar por Nombre',
            cls: 'botones',
            enableToggle: true,
            scope: this

        });
        //////////
        me.btn_imprimir = Ext.create('Ext.Button', {
            pressed: true,
            cls: 'botones',
            iconCls: 'printer',
            tooltip: 'Imprimir Datos',
            enableToggle: true,
            scope: this,
            hidden: me.imprimir,
            tooltipType: 'qtip',
            handler: me.ImprimirReporte


        });

        me.btn_criterios = Ext.create('Ext.Button', {
            pressed: true,
            cls: 'botones',
            iconCls: 'building_add',
            tooltip: 'Introducir Criterios de Busqueda',
            enableToggle: true,
            scope: this,
            hidden: me.criterios,
            handler: function () {
                this.Criterios();
            }
        });
        ///////////
        me.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
            me.txt_busqueda,
            me.button,
            me.btn_imprimir,
            me.btn_criterios
            ]
        });
        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;
        //////////////////////////
        me.txt_busqueda.on('specialkey', this.buscarEnterCodigo, this);
        me.button.on('click', this.buscarBotonCodigo, this);
        //////////////////////////
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.equipo + "."

        });
        me.bar = me.bbar;
    },
    buscarEnterCodigo: function (f, e) {

        var me = this;
        if (e.getKey() == e.ENTER) {
            me.store.setExtraParam('codigo', 'CODIGO');
            me.store.setExtraParam('condicion', me.txt_busqueda.getValue());
            me.bar.moveFirst();
        }

    },
    buscarBotonCodigo: function () {
        var me = this;
        me.store.setExtraParam('codigo', 'CODIGO');
        me.store.setExtraParam('condicion', me.txt_busqueda.getValue());
        me.bar.moveFirst();

    },
    Criterios: function () {
        var me = this;
        if (me.ventanaCriterio == null) {
            me.ventanaCriterio = Ext.create("App.Busqueda.Vistas.VentanaCriterios", { title: " Criterios de Busqueda", height: 160, width: 410, storeBuscar: me.getStore(), gridBuscar: me, data: me.txt_busqueda.getValue(), equipo: me.equipo, tmp: me.bar });
        }
        me.ventanaCriterio.show();
    },
    ImprimirReporte: function () {
        var me = this;
        // alert(me.tituloImpresion);
        App.Utils.ux.Printer.filtros = me.tituloImpresion;
        App.Utils.ux.Printer.print(me);

    },
    CargarStore: function () {
        var me = this;
        me.funciones.CargarStoreEquiposConImagen(me.equipoImagen);
    },
    renderImagen: function (val, metaData, record) {
        //  alert(record.data.ID)
        if (record.data.ID_IMAGEN == 0) {
            return '<img src="' + host + 'Content/Iconos/no-imagen.jpg" />';
        }
        else {
            return '<img src="' + host + 'Imagen/GetImage/?id=' + val + '&tamano=140"/>';
        }
    }

});
