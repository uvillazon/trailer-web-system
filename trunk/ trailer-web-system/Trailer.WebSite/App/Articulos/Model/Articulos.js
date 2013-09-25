Ext.define("App.Articulos.Model.Articulos", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_ARTICULO', type: 'int' },
        { name: 'CODIGO', type: 'string' },
        { name: 'CATEGORIA', type: 'string' },
        { name: 'NOMBRE', type: 'string' },
        { name: 'DESCRIPCION', type: 'string' },
        { name: 'MEDIDA', type: 'string' },
        { name: 'TELA', type: 'string' },
        { name: 'ESTADO', type: 'string' },
        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate },
    ]
});