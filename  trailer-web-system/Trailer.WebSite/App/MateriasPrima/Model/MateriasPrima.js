Ext.define("App.MateriasPrima.Model.MateriasPrima", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_MATERIA_PRIMA', type: 'int' },
        { name: 'CODIGO', type: 'string' },
        { name: 'CATEGORIA', type: 'string' },
        { name: 'COLOR', type: 'string' },
        { name: 'UNIDAD', type: 'string' },
        { name: 'NOMBRE', type: 'string' },
        { name: 'CARACTERISTICA', type: 'string' },
        { name: 'STOCK_MINIMO', type: 'float' },
        { name: 'CANTIDAD_DISP', type: 'float' },
        { name: 'INVENTARIO', type: 'float' },
        { name: 'CALIDAD', type: 'string' },
        { name: 'ESTADO', type: 'string' },
        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate },
    ]
});