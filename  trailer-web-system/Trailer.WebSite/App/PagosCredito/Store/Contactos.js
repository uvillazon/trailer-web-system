Ext.define('App.Extjs.Store.Contactos', {
    extend: 'Ext.data.Store',
    model: 'App.Extjs.Model.Contactos',
    remoteSort: true,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: Utils.Constantes.HOST+'Contactos/GetAllContactos',
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