Ext.define('App.Listas.Store.StoreDinamico', {
    extend: 'Ext.data.Store',
    model: 'App.Listas.Model.ListaAdm',
    remoteSort: false,
    autoLoad: true,
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