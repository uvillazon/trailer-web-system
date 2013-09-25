var columns = [
   { header: 'Nro', xtype: 'rownumberer', width: 30, sortable: false },
   { header: "Imagen", flex: 1, renderer: renderIcon, dataIndex: 'ID_EQ_MN_IMG', sortable: true },
   { header: 'Nombre', dataIndex: 'NOMBRE', width: 50 },
   { header: 'Fecha', dataIndex: 'FECHA_MDF_EST', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
   { header: 'Tamaño (kb)', dataIndex: 'RESPONSABLE', width: 50 },
   ];
   function renderIcon(val) {
       return '<img src="../Elemento/GetImage/53" alt="Staff Image" />';
}

Ext.define("App.Utils.GridFormArchivos", {
    extend: "Ext.grid.Panel",
    height: 400,
    //collapsible: true,
    // width: 520,
    margins: '0 2 0 0',

    disableSelection: false,
    initComponent: function () {
        var store = Ext.create('App.MandoSeccionador.Store.MandoSeccionadorInstal');
        this.win = Ext.create("App.Utils.Ventana", { height: 170, opcion: 'Botones' });
        this.form1 = Ext.create("App.Utils.FormArchivo");
        var me = this;
        me.win.getBotonGuardar().on('click', this.Guardar, this);
        this.win.add(this.form1);
        store.load();
        this.store = store;
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-add',
                text: 'Agregar',
                scope: this,
                handler: this.onCreate
            }, {
                iconCls: 'icon-delete',
                text: 'Eliminar',
                scope: this,
                handler: this.onReset
            }]
        }];
        this.columns = columns;
        this.callParent(arguments);
    },
    onCreate: function () {
        var me = this;
        me.win.show();
        //me.win.getBotonCerrar().on('click', CerrarBaja);
    },
    //    getForm: function () {
    //        return this.form1.getForm();
    //    },
    //    getButton: function () {
    //        return this.win.getBotonGuardar();
    //    },
    Guardar: function () {
        var me = this;
        var form1 = me.form1.getForm();

        if (form1.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Guardar Los cambios?', function (btn) {

                if (btn == 'yes') {
                    // form.el.mask('Procesando...', 'x-mask-loading');
                    form1.submit({
                        // submitEmptyText: false,
                        url: host+'Elemento/Upload',

                        scope: me.form1,
                        //params: { COD_ELEMENTO: formReconectador.getCodigoElemento() },
                        // waitMsg: 'Uploading your photo...',
                        success: function (form, action) {
                            Ext.MessageBox.alert('Exito', action.result.result);
                            me.win.hide();
                            form1.reset();
                        },
                        failure: function (form, action) {
                            Ext.MessageBox.alert('Error', action.result.result);
                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }


    }

});