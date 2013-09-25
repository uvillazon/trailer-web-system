Ext.define('App.Reportes.Store.MovimientoMateriales', {
    extend: 'Ext.data.Store',
    model: 'App.Reportes.Model.MovimientoMateriales',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Reportes/GetAllMovimientoMateriales',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'ID_MOVIMIENTO_MATERIA',
            direction: 'DESC',
        }]
});