Ext.define("App.Busqueda.Vistas.VentanaCriterios", {
    extend: "Ext.Window",
    layout: 'fit',
    width: 550,
    height: 390,
    resizable: false,
    draggable: false,
    modal: true,
    closable: false,
    storeBuscar: '',
    gridBuscar: '',
    data: '',
    initComponent: function () {
        this.form = Ext.create("App.Busqueda.Vistas.FormBuqueda", { data: this.data});
        this.bto_cerrar = Ext.create('Ext.Button', {
            text: 'Cerrar',
            width: 120,
            itemId: 'cerrar',
            textAlign: 'center',
            margin: 10,
            iconCls: 'cross',
            handler: function () {
                this.up('window').hide();
            }
        });
        this.bto_buscar = Ext.create('Ext.Button', {
            text: 'Buscar',
            width: 120,
            itemId: 'buscar',
            textAlign: 'center',
            iconCls: 'zoom',
            margin: 10,
            scope: this,
            handler: function () {

                this.Buscar();
            }
        });
        this.items = this.form;
        this.buttons = [this.bto_buscar, this.bto_cerrar];
        this.callParent(arguments);
    },
    Buscar: function () {
        var me = this;
        var form = me.form;
        me.storeBuscar.load({ params: { codigobuscar: me.form.getForm().findField("codigobuscar").getValue(),
            estado: me.form.getForm().findField("ESTADO").getValue(),
            fecha_inicial: me.form.getForm().findField("FECHA_INICIAL").getValue(),
            fecha_final: me.form.getForm().findField("FECHA_FINAL").getValue(), codigo: 'BUSQUEDA', condicion: 'BUSQUEDA'
        }
        });
        me.gridBuscar.getStore().loadData(me.storeBuscar);
        me.form.getForm().reset();
        me.hide();
    }
});