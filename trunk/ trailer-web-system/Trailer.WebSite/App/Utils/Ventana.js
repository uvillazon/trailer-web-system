Ext.define("App.Utils.Ventana", {
    extend: "Ext.Window",
    layout: 'fit',
    width: 550,
    height: 390,
    resizable: false,
    draggable: false,
    modal: true,
    closable: false,
    opcion: '',
    buttons: '',
    bto_cerrar: '',
    bto_guardar : '',
    y :20,
    initComponent: function () {
        if (this.opcion == '') {
            if (this.buttons == '') {
                this.buttons = [{
                    xtype: 'button',
                    text: 'Cerrar',
                    iconCls: 'cross',
                    handler: function () {
                        //this.up('form').getForm().reset();
                        this.up('window').hide();

                    }

                }
         ];
            }
            else {
                this.buttons = this.buttons;
            }
        }
        else {
            this.bto_cerrar = Ext.create('Ext.Button', {
                text: 'Cerrar',
                width: 120,
                itemId: 'cerrar',
                textAlign: 'center',
                margin: 10,
                iconCls: 'cross',
                handler: function () {
                    //this.up('form').getForm().reset();
                    this.up('window').hide();


                }

            });
            this.bto_guardar = Ext.create('Ext.Button', {
                text: 'Guardar',
                width: 120,
                itemId: 'guardar',
                textAlign: 'center',
                iconCls: 'disk',
                margin: 10,

            });
            this.buttons = [this.bto_guardar, this.bto_cerrar];
        }
        this.callParent(arguments);
    },
    getBotonGuardar: function ()
    { return this.bto_guardar; },
    getBotonCerrar: function ()
    { return this.bto_cerrar; }

});