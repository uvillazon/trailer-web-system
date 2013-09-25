Ext.define('App.Productos.Store.Productos', {
    extend: 'Ext.data.Store',
    model: 'App.Productos.Model.Productos',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Productos/GetAllProductos',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'NRO_ORDEN',
            direction: 'ASC',
        }]
});