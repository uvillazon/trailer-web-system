//objeto formulario
Ext.define("App.Entregas.View.FormEntrega", {
    extend: "Ext.form.Panel",
    alias: "widget.formpanelDetalle",
    collapsible: false,
    frame: false,
    title: 'Detalle',
    bodyPadding: '5 5 5 5',
    grid: '',
    fieldDefaults: {
        labelAlign: 'top',
        msgTarget: 'side'
    },

    initComponent: function () {
        var me = this;
        me.storeEstado = Ext.create('Ext.data.Store', {
            fields: ['id', 'estado'],
            data: [
            {
                "id": "completado",
                "estado": "COMPLETADO"
            },

            {
                "id": "pendiente",
                "estado": "PENDIENTE"
            },

            {
                "id": "anulado",
                "estado": "ANULADO"
            }
            ]
        });
        me.store_telas = Ext.create('App.Listas.Store.StoreDinamico');
        me.store_telas.setExtraParam('condicion', 'TELA');
        me.cbx_tela = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_telas,
            fieldLabel: 'Tela',
            name: 'TELA',
            displayField : 'VALOR',
            width: 220,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });
        me.store_articulos = Ext.create('App.Articulos.Store.Articulos',{pagesize:3000 }).load();
        
        me.cbx_articulos = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_articulos,
            fieldLabel: 'Producto',
            name: 'ARTICULO',
            displayField : 'NOMBRE',
            width: 220,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });

        me.cbx_estados = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.storeEstado,
            fieldLabel: 'Estado',
            name: 'ESTADO',
            width: 220,
            selectOnFocus: true,
            displayField : 'estado'
           // forceSelection: true,
      //      margin: '10'
        });

        me.txt_detalle_item= Ext.create("App.Utils.Componente.TextAreaBase", {
            name: 'DETALLE_ITEM',
            fieldLabel: 'Detalle Item',
            height: 80,
            width: 220,
            colspan: 1
            
        });

        me.txt_detalle_bordado= Ext.create("App.Utils.Componente.TextAreaBase", {
            name: 'DETALLE_BORDADO',
            fieldLabel: 'Detalle Bordado',
            height: 80,
           width: 220,
            colspan: 1
            
            
        });

        me.txt_detalle_costura= Ext.create("App.Utils.Componente.TextAreaBase", {
            name: 'DETALLE_COSTURA',
            fieldLabel: 'Detalle COSTURA',
            height: 80,
            width: 220,
            colspan: 1
            
        });
        me.fieldSetTallaLit = Ext.create('Ext.form.FieldSet',{
         title: 'Cantidad Tallas Literales',
         collapsible: true,
         layout: {
             type: 'table',
             columns: 8,
             tableAttrs: {
                 style: {
                     width: '100%'
                 }
             }
         },
         defaults: {
             frame: true,
             width: 50,
             bodyStyle: 'padding:20px'
         },
         defaultType: 'numberfield',
         items: [{
             fieldLabel: 'XS',
            
         }, {
             fieldLabel: 'S',
           
         }, {
             fieldLabel: 'M',
           
         }, {
             fieldLabel: 'L',
           
         },
            {
                fieldLabel: 'XL',
                
            }, {
                fieldLabel: 'XXL',
                
            }, {
                fieldLabel: 'XXXL',
                
            }, {
                fieldLabel: 'ESPECIALES',
              
            }, {
                fieldLabel: 'UNICA',
            }
            ]
        });
        me.fieldSettallaNum = Ext.create('Ext.form.FieldSet',{
         title: 'Cantidad Tallas Numericas',
                collapsible: true,
                layout: {
                    type: 'table',
                    columns: 8,
                    tableAttrs: {
                        style: {
                            width: '100%'
                        }
                    }
                },
                defaults: {
                    frame: true,
                    width: 50,
                    bodyStyle: 'padding:20px'
                },
                defaultType: 'numberfield',
                items: [{
                    fieldLabel: '2',
                    
                }, {
                    fieldLabel: '4',
                   
                }, {
                    fieldLabel: '6',
                  
                }, {
                    fieldLabel: '8',
                    
                },
            {
                fieldLabel: '10',
               
            }, {
                fieldLabel: '12',
                
            }, {
                fieldLabel: '14',
              
            }, {
                fieldLabel: '36',
               
            }, {
                fieldLabel: '38',
               
            }, {
                fieldLabel: '40',
                
            }, {
                fieldLabel: '42',
              
            }, {
                fieldLabel: '44',
               
            }, {
                fieldLabel: '46',
              
            }, {
                fieldLabel: '48',
               
            }, {
                fieldLabel: '50',
               
            }, {
                fieldLabel: '52',
               
            }, {
                fieldLabel: '54',
              
            }
            ]
            
        });
        this.items = [{
            xtype: 'fieldset',
            checkboxToggle: true,
            collapsed: false,
            title: 'Insertar Tallas',
            defaultType: 'textfield',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [
            me.fieldSettallaNum
               , //finaliza tallas numericas
               me.fieldSetTallaLit,
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Detalle',
            collapsible: true,
            layout: {
                type: 'table',
                columns: 2,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            defaults: {
                frame: true,
                bodyStyle: 'padding:20px'
            },
           items: [me.cbx_articulos, me.cbx_tela, 
                me.txt_detalle_item,me.txt_detalle_bordado,me.txt_detalle_costura,me.cbx_estados
            ]
        }];
//        comboProducto.on('select', function (cmb, record, index) {
//            this.cambiarValor(record[0].data.nombre);
//        }, this);

        this.callParent(arguments);
    },
    enviarTallas: function () {
        var me = this;
        var recordsToSend = [];
        
        var els=me.fieldSettallaNum.query('.field');
        Ext.each(els,function(o){
                 if(o.getValue() != null){
                    recordsToSend.push(Ext.apply({talla : o.getFieldLabel(), cantidad : o.getValue()}));
                 }
//              recordsToSend.push(Ext.apply({o.getFieldLabel() : 12}));    
        });
        var els1=me.fieldSetTallaLit.query('.field');
        Ext.each(els1,function(o){
                 if(o.getValue() != null){
                    recordsToSend.push(Ext.apply({talla : o.getFieldLabel(), cantidad : o.getValue()}));
                 }
//              recordsToSend.push(Ext.apply({o.getFieldLabel() : 12}));    
        });
          
        recordsToSend = Ext.JSON.encode(recordsToSend);
        return recordsToSend;
    }

});