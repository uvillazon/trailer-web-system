function DescripcionCompleto(v, record) {
    return '<p><b>' + record.data.ARTICULO + '</b></p></p>' +
            '<p><b>Tela:</b> ' + record.data.TELA + '</p>' +
            '<p><b>Color:</b> ' + record.data.COLOR + '</p>' +
            '<p><b>Detalle:</b> ' + record.data.DETALLE_ITEM + '</p>' +
            '<p><b>Bordado:</b> ' + record.data.DETALLE_BORDADO + '</p>' +
            '<p><b>Costura:</b> ' + record.data.DETALLE_COSTURA + '</p>' +
            '<p><b>Estado:</b> ' + record.data.ESTADO + '</p>';
}
function CantidadFaltante(v, record) {
    return record.data.CANTIDAD - record.data.CANTIDAD_ENTREGADA;
}
Ext.define("App.OrdenesProduccion.Model.DetallesOrden", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_DETALLE_ORDEN', type: 'int' },
        { name: 'ID_ORDEN_PRODUCCION', type: 'int' },
        { name: 'ARTICULO', type: 'string' },
        { name: 'TELA', type: 'string' },
        { name: 'COLOR', type: 'string' },
        { name: 'DETALLE_ITEM', type: 'string' },
        { name: 'DETALLE_BORDADO', type: 'string' },
        { name: 'DETALLE_COSTURA', type: 'string' },
        { name: 'ESTADO', type: 'string' },
        { name: 'CANTIDAD', type: 'float' },
        { name: 'CANTIDAD_ENTREGADA', type: 'float' },
        { name: 'CANTIDAD_FALTANTE', convert: CantidadFaltante },
        { name: 'CANTIDAD_PRODUCIDA', type: 'float' },
        { name: 'CANTIDAD_A_PRODUCIR', type: 'float' },
         { name: 'TOTAL_POR_COBRAR', type: 'float' },
        { name: 'TALLA', type: 'string' },
        { name: 'COSTO', type: 'float' },
        { name: 'TOTAL', type: 'float' },
        { name: 'ESTADO', type: 'string' },
        { name: 'SASTRE', type: 'float' },
        { name: 'HILO', type: 'float' },
        { name: 'DESC', convert: DescripcionCompleto },
    ]
});


