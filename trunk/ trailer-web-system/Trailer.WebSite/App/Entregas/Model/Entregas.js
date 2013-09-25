Ext.define("App.Entregas.Model.Entregas", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_ENTREGA', type: 'int' },
        { name: 'NRO_ENTREGA', type: 'int' },
        { name: 'ID_ORDEN_PRODUCCION', type: 'int' },
        { name: 'NRO_ORDEN', type: 'int' },
        { name: 'RESPONSABLE', type: 'string' },
        { name: 'QUIEN_RECIBE', type: 'string' },
        { name: 'OBSERVACION', type: 'string' },
        { name: 'ESTADO', type: 'string' },
        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate },
        { name: 'FECHA_ENTREGA', type: 'date', dateFormat: 'd-m-Y', convert: convertDate }
    ]
});