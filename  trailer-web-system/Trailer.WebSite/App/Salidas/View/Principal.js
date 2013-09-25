Ext.define("App.Salidas.View.Principal", {
    extend: "Ext.panel.Panel",
    alias: "widget.PanelPrincipal",
    width: 980,
    resizable: true,
    height: 550,
    frame: true,
    layout: 'border',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;

        me.grid = Ext.create("App.OrdenesProduccion.View.GridOrdenesProduccion", {
            width: '50%',
            region : 'west',
            height: 500
        });

        me.gridDetalle = Ext.create('App.OrdenesProduccion.View.GridDetalle');
       // me.grid.getDockedItems('toolbar[dock="top"]').disable();
        var tb = me.grid.getDockedComponent('mainToolbar');
        
        me.button = Ext.create('Ext.Button', {
            iconCls: 'application_form_magnify',
            tooltip: 'Ver Detalle Orden de Produccion',
//            scope: this,
            handler: function () {

                me.VerDetalle();
            }        
            
        });
        //tb.remove(btnToAdd);
        tb.add(me.button);
    
//        tool.add(me.button);
        me.gridDetalleSalida = Ext.create("App.Salidas.View.GridDetalleSalida");
        me.gridSalidas = Ext.create("App.Salidas.View.GridSalidas");
       
       

        
        
        me.tabpanelIngreso = Ext.create("App.Utils.TabPanel", {
            width: '50%',
            height: 500,
            region : 'center',
            items: [me.gridSalidas, me.gridDetalleSalida]
        })
    

        this.items = [me.grid,me.tabpanelIngreso];
        me.grid.on('cellclick', me.CargarDatos, this);
        me.gridSalidas.on('cellclick', me.CargarDetalles, this);
        this.callParent(arguments);
    },
    CargarDatos : function(grid, cell, col, record){
        var me = this;
        me.gridSalidas.CargarDatos(record);
    },
    CargarDetalles : function(grid, cell, col, record){
        var me = this;
        me.gridDetalleSalida.CargarDatos(record);
    },
     Recargar: function () {
        var me = this;
        alert('cargando Store ');
        me.grid.getStore().load();
    } ,
    VerDetalle : function()
    {
        var me = this;
        var data = me.grid.getSelectionModel().getSelection()[0];
        if (data != null) {
             me.win = Ext.create('App.Utils.Ventana',{items : me.gridDetalle}).show();
             me.gridDetalle.CargarDatos(data);
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro <br> Para Ver detalle');
        }
    }  
});