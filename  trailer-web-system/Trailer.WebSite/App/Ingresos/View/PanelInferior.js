Ext.define("App.Ingresos.View.PanelInferior", {
    extend: "Ext.form.Panel",
    alias: "widget.PanelInferiorCompra",
    title: '',
    vendedor: '',
    sucursal: '',
    bodyPadding: '5 10 10',

    collapsible: false,

    initComponent: function () {

        this.items = [{
            xtype: 'panel',
            baseCls: 'x-plain',

            layout: {
                type: 'table',
                columns: 3,
                tableAttrs: {
                    style: {
                        width: '98%',
                        bodyStyle: 'padding:5px'
                    }
                },
                tdAttrs: {
                    style: {
                        align: 'center',
                        width: '60%'
                    }
                }
            },

            items: [{
                xtype: 'fieldset',
                collapsible: false,
                border: 0,
                colspan: 2,
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'VENDEDOR',
                    value: this.vendedor
                }]
            }, {
                xtype: 'fieldset',
                collapsible: false,
                rowspan: 2,
                defaults: {
                    labelWidth: 89,
                    hideTrigger: true,
                    //anchor: '100%',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {
                            top: 0,
                            right: 5,
                            bottom: 0,
                            left: 0
                        }
                    }
                },
                items: [{
                    xtype: 'numberfield',
                    id: 'totalParcialCantidad',
                    itemId: 'totalCantidad',
                    fieldLabel: 'TOTAL CANTIDAD',
                    name: 'data[Compra][compra_cantidad]',
                    value: '0'

                }, {
                    xtype: 'numberfield',
                    id: 'totalParcial',
                    itemId: 'totalParcial',
                    fieldLabel: 'TOTAL PARCIAL',
                    value: '0',
                    listeners: {
                        'change': function () {
                            var valor = this.getValue() + Ext.getCmp('valorRecargo').getValue() - Ext.getCmp('valorDescuento').getValue();
                            Ext.getCmp('valorDescuento').setValue(Ext.getCmp('procentajeDescuento').getValue() * this.getValue() / 100);
                            Ext.getCmp('valorTotalFinal').setValue(Ext.util.Format.usMoney(valor));
                            Ext.getCmp('val-compra_precio_total').setValue(valor);

                        }
                    }

                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'DESCUENTO',
                    combineErrors: true,


                    msgTarget: 'under',
                    defaults: {
                        hideLabel: true,
                        hideTrigger: true
                    },
                    items: [

                    {
                        xtype: 'numberfield',
                        id: 'procentajeDescuento',
                        itemId: 'procentajeDescuento',
                        fieldLabel: '%',
                        name: 'pocentaje',
                        width: 29,
                        value: '0',
                        allowBlank: false,
                        listeners: {
                            'change': function (field, newValue, oldValue) {
                                Ext.getCmp('val-compra_descuento_porcentaje').setValue(newValue);
                                Ext.getCmp('valorDescuento').setValue(Ext.getCmp('totalParcial').getValue() * this.getValue() / 100);
                                var valor = Ext.getCmp('totalParcial').getValue() + Ext.getCmp('valorRecargo').getValue() - Ext.getCmp('valorDescuento').getValue();
                                Ext.getCmp('valorTotalFinal').setValue(Ext.util.Format.usMoney(valor));
                                Ext.getCmp('val-compra_precio_total').setValue(valor);
                            }
                        }
                    },

                    {
                        xtype: 'displayfield',
                        value: '%'
                    },

                    {
                        xtype: 'numberfield',
                        id: 'valorDescuento',
                        itemId: 'valorDescuento',
                        fieldLabel: 'Descuento',
                        name: 'data[Compra][compra_descuento]',
                        value: 0,
                        width: 100,
                        margins: '0 5 0 0',
                        listeners: {
                            change: function (field, newValue, oldValue) {

                                Ext.getCmp('val-compra_descuento').setValue(newValue);

                            }
                        }
                    }
                    ]
                },
                {
                    xtype: 'numberfield',
                    id: 'valorRecargo',
                    hidden: true,
                    fieldLabel: 'RECARGOS',
                    value: 0,
                    listeners: {
                        'change': function () {
                            var valor = Ext.getCmp('totalParcial').getValue() + this.getValue() - Ext.getCmp('valorDescuento').getValue();
                            Ext.getCmp('val-compra_precio_total').setValue(valor);
                            Ext.getCmp('valorTotalFinal').setValue(Ext.util.Format.usMoney(valor));
                        }
                    }

                }, {
                    xtype: 'textfield',
                    id: 'valorTotalFinal',
                    itemId: 'valorTotalFinal',
                    name: 'data[Compra][compra_precio_total]',
                    value: 0,
                    fieldLabel: 'TOTAL FINAL'
                }]
            }



            ]
        }
        ];

        this.callParent(arguments);
    }
});