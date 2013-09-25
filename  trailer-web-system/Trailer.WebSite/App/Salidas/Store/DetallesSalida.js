Ext.define('App.Salidas.Store.DetallesSalida', {
    extend: 'Ext.data.Store',
    model: 'App.Salidas.Model.DetallesSalida',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Salidas/GetAllDetallesSalida',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'ID_DETALLE_SALIDA',
            direction: 'DESC',
        }]
});