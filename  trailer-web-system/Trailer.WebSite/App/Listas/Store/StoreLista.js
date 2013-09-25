Ext.define('App.Listas.Store.StoreLista', {
    extend: 'Ext.data.Store',
    model: 'App.Listas.Model.ListaAdm',
    remoteSort: false,
    autoLoad: false,
    pageSize: 50,
    proxy: {
         type: 'jsonp',
         url: host+'Listas/GetAllListas',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'DESCRIPCION',
            direction: 'ASC',
        }]
});