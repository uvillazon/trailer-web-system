Ext.define('App.Empleados.Store.Empleados', {
    extend: 'Ext.data.Store',
    model: 'App.Empleados.Model.Empleados',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Empleados/GetAllEmpleados',
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