Ext.define('App.DetallesSalida.Store.DetallesSalida', {
    extend: 'Ext.data.Store',
    model: 'App.DetallesSalida.Model.DetallesSalida',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'DetallesSalida/GetAllDetallesSalida',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'ID_DETALLE',
            direction: 'DESC',
        }]
});