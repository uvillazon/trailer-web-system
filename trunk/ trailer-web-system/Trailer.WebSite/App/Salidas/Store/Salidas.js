Ext.define('App.Salidas.Store.Salidas', {
    extend: 'Ext.data.Store',
    model: 'App.Salidas.Model.Salidas',
    remoteSort: true,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Salidas/GetAllSalidas',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'NRO_SALIDA',
            direction: 'DESC',
        }]
});