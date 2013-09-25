Ext.define("App.Recibos.Model.Recibos", {
    extend: "Ext.data.Model",
    fields: [
        { type: "int", name: "ID_RECIBO" },
        { type: "int", name: "ID_CLIENTE" },
        { type: "int", name: "ID_EMPRESA" },
        { type: "string", name: "CLIENTE" },
        { type: "string", name: "EMPRESA" },
        { type: "string", name: "NRO_RECIBO" },
        { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: convertDate },
        { type: "string", name: "OPS" },
        { type: "string", name: "NRO_FACTURA" },
        { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: convertDate },
        { type: "float", name: "MONTO" },
        { type: "float", name: "SALDO_PAGAR" },
        { type: "string", name: "NRO_CHEQUE" },
        { type: "string", name: "BANCO" },
        { type: "string", name: "TIPO" },
        { type: "string", name: "DEPOSITO" },
        { type: "string", name: "ENTREGADO" },
        { type: "string", name: "DESCRIPCION" },
        { type: "string", name: "RECIBIDO_POR" },
        { type: "string", name: "ESTADO" },
    //        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate }

    ]
});