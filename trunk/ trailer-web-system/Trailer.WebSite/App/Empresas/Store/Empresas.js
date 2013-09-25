Ext.define('App.Empresas.Store.Empresas', {
    extend: 'Ext.data.Store',
    model: 'App.Empresas.Model.Empresas',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Empresas/GetAllEmpresas',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'NOMBRE',
            direction: 'ASC',
        }]
});