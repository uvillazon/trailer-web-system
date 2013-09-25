Ext.define("App.Utils.Componente.DateFieldBase", {
    extend: "Ext.form.DateField",
    renderer: Ext.util.Format.dateRenderer('d/m/Y  H:i:s'),
    dateFormat: 'd/m/Y  H:i:s',
    margin: '0 0 0 10',
    opcion: '',
    limite: true,
    titulo: '',
    mensaje: '',
    initComponent: function () {

        var me = this;
        if (this.opcion == '') {
            this.value = new Date();
        }
        this.minValue = new Date('01/01/1900'); //fecha de la creacion de elfec
        if (me.limite) {
            this.maxValue = new Date();
        }

        if (me.titulo != '') {
            me.on('render', function (obj) {
                obj.tip = Ext.create('Ext.tip.ToolTip', {
                    target: me.getEl(),
                    title: me.titulo,
                    html: me.mensaje
                });
            });
        }



        this.callParent(arguments);

    },
    //emptyText: 'Seleccione...',
    disabledCls: 'DisabledClase',
    width: 180,
    labelWidth: 80
});
