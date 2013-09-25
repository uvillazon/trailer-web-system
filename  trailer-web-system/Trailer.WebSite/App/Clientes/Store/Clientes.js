Ext.define('App.Clientes.Store.Clientes', {
    extend: 'Ext.data.Store',
    model: 'App.Clientes.Model.Clientes',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Clientes/GetAllClientes',
//         url : 'http://importmercado.com/buid/php/Cliente.php?funcion=ListarClientes&start=0&limit=100&_dc=1360114647052&callback=stcCallback1001',
         reader: {
                root: 'Rows',
//                root : 'resultado',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'NOMBRE',
            direction: 'ASC',
        }]
});