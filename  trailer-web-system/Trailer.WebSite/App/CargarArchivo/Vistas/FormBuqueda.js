//Definicion los items del formulario general
Ext.define("App.Busqueda.Vistas.FormBuqueda", {

    extend: "Ext.form.Panel",//"Ext.Window",
    layout: {
        type: 'table',
        columns: 2
    },
    fieldDefaults: {
        margin: '2',
        align: 'left'
    },
    data:'',
    bodyPadding: '10 10 0',
    initComponent: function () {
        var me = this;
        me.store_estado = Ext.create("App.Listas.Store.EstadoEquipo");
        me.store_estado.load({ params: { where: 'RECONECTADOR'} }); //Definimos campo para codigo
        me.txt_codigo = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Codigo',
            labelWidth: 94,
            width: 190,
            name: 'codigobuscar',
            maxLength: 20,
            selectOnFocus: false,
            value:me.data,
        });
        //Definimos Inicial
        me.dat_fechaInicial = Ext.create("App.Utils.Componente.DateFieldBase", {
            fieldLabel: 'Fecha Alta Inicial',
            itemId: 'FECHA_INICIAL',
            name: 'FECHA_INICIAL',
            labelWidth: 94,
            width: 190,
            opcion : 'blanco'
        });
        //Definimos Final
        me.dat_fechaFinal = Ext.create("App.Utils.Componente.DateFieldBase", {
            fieldLabel: 'Fecha Alta Fin',
            itemId: 'FECHA_FINAL',
            name: 'FECHA_FINAL',
            opcion : 'blanco'
        });

        //Definimos datacombo para campo estado
        me.cbx_estado = Ext.create("App.Utils.Componente.ComboBase", {
            fieldLabel: 'Estado',
            displayField: 'VALOR',
            name: 'ESTADO',
            itemId: 'ESTADO',
            store: me.store_estado
        });

        this.items = [
        me.txt_codigo,
        me.cbx_estado,
        me.dat_fechaInicial,
        me.dat_fechaFinal
        ];
        this.callParent(arguments);
    }
});
