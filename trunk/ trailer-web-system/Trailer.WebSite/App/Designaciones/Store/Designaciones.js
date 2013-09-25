Ext.define('App.Designaciones.Store.Designaciones', {
    extend: 'Ext.data.Store',
    model: 'App.Designaciones.Model.Designaciones',
    remoteSort: true,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Designaciones/GetAllDesignaciones',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'ID_DESIGNACION',
            direction: 'DESC',
        }]
});