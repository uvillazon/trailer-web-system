Ext.define('App.OrdenesProduccion.Store.DetallesOrden', {
    extend: 'Ext.data.Store',
    model: 'App.OrdenesProduccion.Model.DetallesOrden',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'OrdenesProduccion/GetAllDetallesOrden',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'ID_DETALLE_ORDEN',
            direction: 'DESC',
        }]
});