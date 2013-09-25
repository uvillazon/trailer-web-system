Ext.define("App.Extjs.View.Grid", {
    extend: "Ext.grid.Panel",
    title: 'Grid Ejemplo',
    width: '50%',
    margins: '0 2 0 0',
    // region: 'west',
    loadMask: true,
    collapsible: false,
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.Extjs.Store.Contactos");
        me.store.load();
        //this.columns = columns;
        me.columns = [
        { xtype: 'rownumberer', width: 30, sortable: false },
        { header: "Carnet<br>Identidad", width: 90, sortable: true, dataIndex: 'CI' },
        { header: "Nombre", width: 90, sortable: true, dataIndex: 'NOMBRE' },
        { header: "Apellido", width: 90, sortable: true, dataIndex: 'APELLIDO' },
        { header: "Direccion", width: 60, sortable: true, dataIndex: 'DIRECCION' },
        { header: "Telefono", width: 60, sortable: true, dataIndex: 'TELEFONO' },
        { header: "Ciudad", width: 50, sortable: true, dataIndex: 'CIUDAD' },
        { header: "Pais", width: 50, sortable: true, dataIndex: 'PAIS' },
        { header: "Descripcion", width: 100, sortable: true, dataIndex: 'DESCRIPCION' },
        { header: "Fecha<br>Nacimiento", width: 80, sortable: true, dataIndex: 'FECHA_NACIMIENTO', renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        ];

        me.btn_crear = Ext.create('Ext.Button', {
            pressed: true,
            cls: 'botones',
            iconCls: 'add',
            text: 'Crear',
            tooltip: 'Crear Contacto Desactivando Panel',
            enableToggle: true,
            scope: this
        });
        me.btn_verWin = Ext.create('Ext.Button', {
            pressed: true,
            cls: 'botones',
            text: 'Ver Windows',
            iconCls: 'add',
            tooltip: 'Ver Datos del  Contacto en Win Windows',
            enableToggle: true,
            scope: this
        });

        me.txt_busqueda = Ext.create("Ext.form.field.Text", {
            fieldLabel: 'Buscar',
            width: 170,
            labelWidth: 50
        });
        me.btn_guardar = Ext.create("Ext.Button", {
            pressed: true,
            cls: 'botones',
            text: 'Imagen',
            iconCls: 'add',
            tooltip: 'Convertir los Datos en Imagen',
            enableToggle: true,
            scope: this
        });
        me.btn_prueba = Ext.create("Ext.Button", {
            pressed: true,
            cls: 'botones',
            text: 'Prueba',
            iconCls: 'add',
            tooltip: 'Prueba',
            enableToggle: true,
            scope: this,
            handler: me.VerPrueba
        });
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
        //botones para la cebecera del grid
        me.dockedItems = [{
            xtype: 'toolbar',
            items: [
                me.txt_busqueda, me.button,
                me.btn_crear,
                me.btn_verWin,
                me.btn_guardar,
                me.btn_prueba
            //                me.btn_editar,
            //                me.btn_editarWin
          ]
        }];
        //botones para el pie del grid en este caso vamos a colocar un paginador
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} de {2}',
            emptyMsg: "No existen Contactos Registrados."

        });
        me.bar = this.bbar;
        //eventos para los botones de busqueda
        me.txt_busqueda.on('specialkey', this.buscarEnterCodigo, this);
        me.button.on('click', this.buscarBotonCodigo, this);
        this.callParent(arguments);
    },
    buscarEnterCodigo: function (f, e) {

        var me = this;
        if (e.getKey() == e.ENTER) {
            me.store.setExtraParam('codigo', 'CODIGO');
            me.store.setExtraParam('where', me.txt_busqueda.getValue());
            me.bar.moveFirst();
        }

    },
    buscarBotonCodigo: function () {
        var me = this;
        me.store.setExtraParam('codigo', 'CODIGO');
        me.store.setExtraParam('where', me.txt_busqueda.getValue());
        me.bar.moveFirst();

    },
    VerPrueba: function () {
        var me = this;
        me.winDis = Ext.create("App.Utils.Ventana", { opcion: 'botones', width: 800, height: 500 });
        me.FormPago = Ext.create("App.Extjs.View.FormPagoCredito");
        me.winDis.add(me.FormPago);
        me.winDis.show();
        //        me.winDis.getBotonGuardar().on('click', me.GuardarFormularioDis, this);

    }
    ////////////////////////// 
});
