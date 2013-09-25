Ext.define('App.Proveedores.Store.Proveedores', {
    extend: 'Ext.data.Store',
    model: 'App.Proveedores.Model.Proveedores',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Proveedores/GetAllProveedores',
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