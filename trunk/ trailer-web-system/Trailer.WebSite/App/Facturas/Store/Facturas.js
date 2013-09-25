Ext.define('App.Facturas.Store.Facturas', {
    extend: 'Ext.data.Store',
    model: 'App.Facturas.Model.Facturas',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Facturas/GetAllFacturas',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'NRO_FACTURA',
            direction: 'DESC',
        }]
});