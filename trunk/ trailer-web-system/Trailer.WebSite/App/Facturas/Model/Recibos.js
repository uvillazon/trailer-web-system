Ext.define("App.Facturas.Model.Facturas", {
    extend: "Ext.data.Model",
    fields: [
            { type: "int", name: "ID_FACTURA" },
            { type: "int", name: "ID_CLIENTE" },
            { type: "int", name: "ID_EMPRESA" },
            { type: "string", name: "CLIENTE" },
            { type: "string", name: "EMPRESA" },
            { type: "string", name: "NIT" },
            { type: "int", name: "NRO_FACTURA" },
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: convertDate },
            { type: "string", name: "OPS" },
            { type: "string", name: "NRO_RECIBOS" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: convertDate },
            { type: "float", name: "MONTO" },
            { type: "float", name: "MONTO_CANCELADO" },
            { type: "string", name: "ESTADO" },
            { type: "string", name: "EMITIDO_POR" },
            { type: "int", name: "TIEMPO_APROX" },
            { type: "date", name: "FECHA_APROX", dateFormat: "d/m/Y", convert: convertDate },
            { type: "string", name: "NRO_FACTURA1" },
    //        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate }

    ]
});