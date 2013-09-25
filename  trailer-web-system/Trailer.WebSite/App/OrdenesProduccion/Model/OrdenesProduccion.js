function CantidadFaltante(v, record) {
    return record.data.CANTIDAD - record.data.CANTIDAD_ENTREGADA;
}
function Saldo(v, record) {
    return record.data.TOTAL_POR_COBRAR - record.data.A_CUENTA;
}
Ext.define("App.OrdenesProduccion.Model.OrdenesProduccion", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_ORDEN_PRODUCCION', type: 'int' },
        { name: 'NRO_ORDEN', type: 'int' },
        { name: 'TIPO_CLIENTE', type: 'string' },
        { name: 'CLIENTE', type: 'string' },
        { name: 'EMPRESA', type: 'string' },
        { name: 'RESPONSABLE', type: 'string' },
        { name: 'RESPONSABLE_RECEPCION', type: 'string' },
        { name: 'OBSERVACION', type: 'string' },
        { name: 'CANTIDAD', type: 'float' },
        { name: 'CANTIDAD_ENTREGADA', type: 'float' },
        { name: 'COSTO', type: 'float' },
        { name: 'TOTAL_POR_COBRAR', type: 'float' },
        { name: 'TOTAL', type: 'float' },
        { name: 'ESTADO', type: 'string' },
        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate },
        { name: 'FECHA_RECEPCION', type: 'date', dateFormat: 'd-m-Y', convert: convertDate },
        { name: 'FECHA_ENTREGA', type: 'date', dateFormat: 'd-m-Y', convert: convertDate },
        { name: 'CANTIDAD_FALTANTE', convert: CantidadFaltante },
        { name: 'A_CUENTA', type: 'float' },
        { name: 'SALDO', convert: Saldo },
    ]
});