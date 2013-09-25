Ext.define('App.Entregas.Store.Entregas', {
    extend: 'Ext.data.Store',
    model: 'App.Entregas.Model.Entregas',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Entregas/GetAllEntregas',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'NRO_ENTREGA',
            direction: 'DESC',
        }]
});