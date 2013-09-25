Ext.define("App.HojasCalculo.View.Principal", {
    extend: "Ext.panel.Panel",
    alias: "widget.PanelPrincipal",
    width: 950,
    resizable: true,
    height: 550,
    frame: true,
    layout: 'border',
    
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        me.grid = Ext.create("App.OrdenesProduccion.View.GridDetalle", {
            width: 450,
            height: 450,
            opcion : 'HojaCalculo',
            region : 'west',
        });
        me.formOp = Ext.create('App.HojasCalculo.View.FormOrdenProduccion',{
             width: '100%',
            height: 120,
            grid : me.grid,
            region : 'north',
        });
        me.FormOrden = Ext.create("App.OrdenesProduccion.View.FormOrdenProduccion",{height: 500});
        me.FormOrden.Bloquear();

        me.gridDetalle = Ext.create("App.HojasCalculo.View.GridDetalle",{
            width: 450,
            height: 450,
             region : 'center',
            opcion : 'HojasCalculo',
        });
        //me.detalle = Ext.create('App.OrdenesProduccion.View.PanelDetalle');
       // me.gridDetalle.add(me.detalle);
      
       

        this.items = [me.formOp,me.grid,me.gridDetalle];
        me.grid.Generar.on('click', me.CargarDatos, this);
        this.callParent(arguments);
    },
    CargarDatos : function(){
        var me = this;
        var data = me.grid.getSelectionModel().getSelection();
        if (!Ext.isEmpty(data)) {
//            me.form.el.mask('Procesando...', 'x-mask-loading');
//            me.form.getForm().submit({
//            
//                submitEmptyText: false,
//                url: host+'Subestaciones/GenerarReporte',
//                params : { detalles : me.form.JsonSeleccionados() },
//                success: function (form, action) {
//                    me.form.el.unmask();
//                    Ext.MessageBox.alert('Exito', action.result.msg);
                    me.createGrid();
//                },
//                failure: function (form, action) {
//                    me.form.el.unmask();
//                    Ext.MessageBox.alert('Error', 'error');
//                }
//            });
        }
        else{
            Ext.MessageBox.alert('Aviso', 'Seleccione una Columna...');
        }
//        alert('saludosss');
       

    },
    createGrid : function(){
        var me = this;
//        me.formDerecha.removeAll(true);
        var cm = [];
        var fields = [];
        var i = 1;
        cm.push({header:"Detalle",dataIndex:'DETALLE',sortable:false});
        cm.push({header:"Cantidad<br>Utilizada",dataIndex:'CANTIDAD',sortable:false});
        cm.push({header:"Unidad",dataIndex:'UNIDAD',sortable:false});
        Ext.each(me.grid.getSelectionModel().getSelection(), function (record) { 
            
                    cm.push({header:record.data.ARTICULO + "<br>"+record.data.TALLA + "<br>"+ record.data.CANTIDAD,dataIndex:record.data.TALLA ,sortable:true});
                
        });
//		var store_reporte = Ext.create('App.Utils.Store.AuxReporte');
//        store_reporte.load();
//        me.btn_imprimir = Ext.create('Ext.Button', {
//            pressed: true,
//            cls: 'botones',
//            iconCls: 'printer',
//            scope: this,
//            hidden : true,
//            handler: me.ImprimirReporte


//        });
//        
//        me.btn_reportes = Ext.create('Ext.Button', {
//            pressed: true,
//            cls: 'botones',
//            iconCls: 'page_excel',
//            scope: this,
//            handler: me.ImprimirReporteEquipo


//        });
//        me.toolBar = Ext.create('Ext.toolbar.Toolbar', {
//            items: [
//            me.btn_imprimir,
//            me.btn_reportes
////            exportButton
//            ]
//        });
		this.grid1 = new Ext.grid.GridPanel({
//			store 		: store_reporte,
			columns 	: cm,
            height      : 600,
            width       : 700,
           
//            dockedItems : me.toolBar
           
		});
        var win = Ext.create('App.Utils.Ventana',{
            height      : 600,
            width       : 700,
            title       : 'Hoja de Calculo'
        });
        win.add(this.grid1);
        win.show();
//		me.formDerecha.add(me.grid);
	},
});