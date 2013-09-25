Ext.define('App.Moldes.Store.Moldes', {
    extend: 'Ext.data.Store',
    model: 'App.Moldes.Model.Moldes',
    remoteSort: true,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Moldes/GetAllMoldes',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'NRO_MOLDE',
            direction: 'ASC',
        }]
});