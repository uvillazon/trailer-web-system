Ext.define("App.Busqueda.Model.EquiposElemento", {
    extend: "Ext.data.Model",
    fields: [
            
            { name: 'nit', type: 'string' },
            { name: 'nrofactura', type: 'string' },
            { name: 'nroautorizacion', type: 'string' },
            { name: 'importe', type: 'float' },
            { name: 'fecha', type: 'date', dateFormat: 'd/m/Y' }
           
        ]
});