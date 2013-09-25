Ext.define("App.Salidas.Model.DetallesSalida", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_SALIDA', type: 'int' },
        { name: 'ID_DETALLE_SALIDA', type: 'int' },
        { name: 'ID_MATERIA_PRIMA', type: 'int' },
        { name: 'DESCRIPCION', type: 'string' },
        { name: 'UNIDAD', type: 'string' },
        { name: 'CANTIDAD', type: 'float' },
        { name: 'OBSERVACION', type: 'string' },
    ]
});