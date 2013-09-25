Ext.define('App.Listas.Store.StoreListaRel', {
    extend: 'Ext.data.Store',
    model: 'App.Listas.Model.ListaAdm',
    remoteSort: false,
    autoLoad: false,
    pageSize: 50,
    proxy: {
         type: 'jsonp',
         url: host+'Listas/GetAllListasRel',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'VALOR',
            direction: 'ASC',
        }]
});