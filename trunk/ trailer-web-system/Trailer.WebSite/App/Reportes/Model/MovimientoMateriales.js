Ext.define("App.Reportes.Model.MovimientoMateriales", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_MOVIMIENTO_MATERIA', type: 'int' },
        { name: 'ID_MATERIA_PRIMA', type: 'int' },
        { name: 'DETALLE', type: 'string' },
        { name: 'FECHA_MOV', type: 'date',dateFormat: 'd-m-Y', convert: convertDate },
        { name: 'ENTRADA', type: 'float' },
        { name: 'SALIDA', type: 'float' },
        { name: 'COSTO', type: 'float' },
        { name: 'SALDO', type: 'float' },
        { name: 'INGRESO', type: 'float' },
        { name: 'EGRESO', type: 'float' },
        { name: 'SALDOBS', type: 'float' },
        { name: 'OPERACION', type: 'string' },
        { name: 'ID_OPERACION', type: 'int' },
        { name: 'ID_MOVIMIENTO', type: 'int' },
        { name: 'FECHA_REG', type: 'date' , dateFormat: 'd-m-Y', convert: convertDate },
        { name: 'SALDO_CANTIDAD', type: 'int' },
    ]
});