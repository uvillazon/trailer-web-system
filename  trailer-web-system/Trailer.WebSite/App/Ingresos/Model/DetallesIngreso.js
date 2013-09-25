Ext.define("App.Ingresos.Model.DetallesIngreso", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_INGRESO', type: 'int' },
        { name: 'ID_DETALLE_INGRESO', type: 'int' },
        { name: 'ID_MATERIA_PRIMA', type: 'int' },
        { name: 'DESCRIPCION', type: 'string' },
        { name: 'UNIDAD', type: 'string' },
        { name: 'COLOR', type: 'string' },
        { name: 'CANTIDAD', type: 'float' },
        { name: 'COSTO', type: 'float' },
        { name: 'TOTAL', type: 'float' }
    ]
});