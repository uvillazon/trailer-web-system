﻿Ext.define("App.Salidas.Model.Salidas", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_SALIDA', type: 'int' },
        { name: 'IMAGEN', convert: ConvertImagen},
        { name: 'NRO_SALIDA', type: 'int' },
        { name: 'ID_ORDEN_PRODUCCION', type: 'int' },
        { name: 'NRO_ORDEN', type: 'int' },
        { name: 'RESPONSABLE', type: 'string' },
        { name: 'OBSERVACION', type: 'string' },
        { name: 'ESTADO', type: 'string' },
        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate },
        { name: 'FECHA_SALIDA', type: 'date', dateFormat: 'd-m-Y', convert: convertDate }
    ]
});