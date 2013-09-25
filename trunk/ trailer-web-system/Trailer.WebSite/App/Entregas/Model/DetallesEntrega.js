function DescripcionCompleto(v, record) {
    return '<p><b>' + record.data.ARTICULO + '</b></p></p>' +
            '<p><b>Detalle:</b> ' + record.data.DETALLE_ITEM + '</p>' +
            '<p><b>Bordado:</b> ' + record.data.DETALLE_BORDADO + '</p>' +
            '<p><b>Costura:</b> ' + record.data.DETALLE_COSTURA + '</p>' +
            '<p><b>Estado:</b> ' + record.data.ESTADO + '</p>';
}
Ext.define("App.Entregas.Model.DetallesEntrega", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_DETALLE_ENTREGA', type: 'int' },
        { name: 'NRO_ENTREGA', type: 'int' },
        { name: 'ID_ENTREGA', type: 'int' },
        { name: 'ID_DETALLE_ORDEN', type: 'int' },
        { name: 'ARTICULO', type: 'string' },
        { name: 'TELA', type: 'string' },
        { name: 'DETALLE_ITEM', type: 'string' },
        { name: 'DETALLE_BORDADO', type: 'string' },
        { name: 'DETALLE_COSTURA', type: 'string' },
        { name: 'OBSERVACION', type: 'string' },
        { name: 'CANTIDAD_ENTREGADA', type: 'float' },
        { name: 'TALLA', type: 'string' },
       { name: 'DESC', convert: DescripcionCompleto },
    ]
});

