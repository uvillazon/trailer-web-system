Ext.define('App.Cortes.Store.Cortes', {
    extend: 'Ext.data.Store',
    model: 'App.Cortes.Model.Cortes',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Cortes/GetAllCortes',
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