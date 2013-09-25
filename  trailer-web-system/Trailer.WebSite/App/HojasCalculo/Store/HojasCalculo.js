Ext.define('App.HojasCalculo.Store.HojasCalculo', {
    extend: 'Ext.data.Store',
    model: 'App.HojasCalculo.Model.HojasCalculo',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'OrdenesProduccion/GetAllHojasCalculo',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'ID_HOJA',
            direction: 'DESC',
        }]
});