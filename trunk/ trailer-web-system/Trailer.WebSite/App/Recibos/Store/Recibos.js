Ext.define('App.Recibos.Store.Recibos', {
    extend: 'Ext.data.Store',
    model: 'App.Recibos.Model.Recibos',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Recibos/GetAllRecibos',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'ID_RECIBO',
            direction: 'DESC',
        }]
});