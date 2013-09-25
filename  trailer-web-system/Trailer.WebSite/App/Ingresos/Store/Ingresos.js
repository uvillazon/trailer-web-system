Ext.define('App.Ingresos.Store.Ingresos', {
    extend: 'Ext.data.Store',
    model: 'App.Ingresos.Model.Ingresos',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Ingresos/GetAllIngresos',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'NRO_INGRESO',
            direction: 'DESC',
        }]
});