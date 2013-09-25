Ext.define('App.Entregas.Store.DetallesEntrega', {
    extend: 'Ext.data.Store',
    model: 'App.Entregas.Model.DetallesEntrega',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Entregas/GetAllDetallesEntrega',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'ID_DETALLE_ENTREGA',
            direction: 'DESC',
        }]
});