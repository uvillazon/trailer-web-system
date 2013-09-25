//objeto formulario
Ext.define("App.OrdenesProduccion.View.FormDetalleOp", {
    extend: "Ext.form.Panel",
    alias: "widget.formpanelDetalleOp",
    collapsible: false,
    frame: false,
    title: 'Detalle Op',
    bodyPadding: 10,
    grid: '',
    opcion: '',
    fieldDefaults: {
        labelAlign: 'top',
        msgTarget: 'side'
    },
    layout: {
        type: 'table',
        columns: 2
    },
    initComponent: function () {
        var me = this;
        if (me.opcion == '') {
            me.CargarStore();
            me.CargarComponentes();
        }
        else {
            me.CargarComponentes();
        }
        this.callParent(arguments);
    },
    CargarStore: function () {
        var me = this;
         me.store_telas = Ext.create('App.Listas.Store.StoreDinamico');
        me.store_telas.setExtraParam('condicion', 'TELA');
         me.store_color = Ext.create('App.Listas.Store.StoreDinamico');
        me.store_color.setExtraParam('condicion', 'COLOR');
          me.store_articulos = Ext.create('App.Articulos.Store.Articulos',{pageSize:3000 }).load();
    },
    CargarComponentes: function () {
        var me = this;
        this.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: 'ID_DETALLE_ORDEN',
            hidden: true
        });
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

       
        me.cbx_color = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_color,
            fieldLabel: 'Color',
            name: 'COLOR',
            displayField : 'VALOR',
            width: 220,
            selectOnFocus: true
        });

      
        
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
       
        this.items =  [
            me.txt_id,
            me.cbx_articulos, 
            me.cbx_tela, 
            me.cbx_color,
            me.txt_detalle_item,
            me.txt_detalle_bordado,
            me.txt_detalle_costura,
            me.cbx_estados
        ];
//        comboProducto.on('select', function (cmb, record, index) {
//            this.cambiarValor(record[0].data.nombre);
//        }, this);

    },
    CargarDatos : function(data){
        var me = this;
        me.Desbloquear();
        me.loadRecord(data);
    },
    Bloquear: function () {
        var me = this;
        BloquearForm(me);
    },
    Desbloquear: function () {
        var me = this;
        DesbloquearForm(me);    
       
    },
    CargarDatosWin : function(data){
        var me = this;
        me.Bloquear();
        me.loadRecord(data);
        me.winOP = Ext.create('App.Utils.Ventana', { y: 20, width: 550, height: 400 });
        me.winOP.add(me);
        me.winOP.show();
    },

});