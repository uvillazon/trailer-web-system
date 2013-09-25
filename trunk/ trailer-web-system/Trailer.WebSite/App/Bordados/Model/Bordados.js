Ext.define("App.Bordados.Model.Bordados", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_BORDADO', type: 'int' },
        { name: 'ID_IMAGEN', type: 'int' },
        { name: 'CANAL', type: 'string' },
        { name: 'KARDEX', type: 'string' },
        { name: 'DISENO', type: 'string' },
        { name: 'EMPRESA', type: 'string' },
        { name: 'DESCRIPCION', type: 'string' },
        { name: 'PUNTADA', type: 'string' },
        { name: 'DESCRIPCION', type: 'string' },
        { name: 'ANCHO', type: 'float' },
        { name: 'ALTO', type: 'float' },
        { name: 'ESTADO', type: 'string' },
        { name: 'ORDEN_PRODUCCION', type: 'string' },
        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate },
    ]
});