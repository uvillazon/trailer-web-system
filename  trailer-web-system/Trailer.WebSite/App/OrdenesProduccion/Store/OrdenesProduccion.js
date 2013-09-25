Ext.define('App.OrdenesProduccion.Store.OrdenesProduccion', {
    extend: 'Ext.data.Store',
    model: 'App.OrdenesProduccion.Model.OrdenesProduccion',
    remoteSort: true,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'OrdenesProduccion/GetAllOrdenesProduccion',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'NRO_ORDEN',
            direction: 'DESC',
        }]
});