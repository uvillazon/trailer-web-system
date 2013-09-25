Ext.define("App.Cortes.Model.Cortes", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_CORTE', type: 'int' },
        { name: 'ID_ORDEN_PRODUCCION', type: 'int' },
        { name: 'ID_DETALLE_ORDEN', type: 'int' },
        { name: 'ID_MATERIA_PRIMA', type: 'int' },
        { name: 'ID_MOLDE', type: 'int' },
        { name: 'NRO_ORDEN', type: 'string' },
        { name: 'NRO_MOLDE', type: 'string' },
        { name: 'DETALLE_ITEM', type: 'string' },
        { name: 'DETALLE_ITEM_CORTO', type: 'string' },
        { name: 'TALLA', type: 'string' },
        { name: 'DETALLE_MATERIAL', type: 'string' },
        { name: 'DETALLE', type: 'string' },
        { name: 'RESPONSABLE', type: 'string' },
        { name: 'TELA', type: 'float' },
        { name: 'HOJA', type: 'float' },
        { name: 'CANTIDAD', type: 'float' },
        { name: 'TOTAL_TELA', type: 'float' },
        { name: 'TOTAL_CANTIDAD', type: 'float' },
    //        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate }

    ]
});