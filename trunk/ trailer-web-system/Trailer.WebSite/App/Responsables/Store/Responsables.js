Ext.define('App.Responsables.Store.Responsables', {
    extend: 'Ext.data.Store',
    model: 'App.Responsables.Model.Responsables',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Responsables/GetAllResponsables',
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