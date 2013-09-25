Ext.define('App.Bordados.Store.Bordados', {
    extend: 'Ext.data.Store',
    model: 'App.Bordados.Model.Bordados',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Bordados/GetAllBordados',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'DISENO',
            direction: 'ASC',
        }]
});