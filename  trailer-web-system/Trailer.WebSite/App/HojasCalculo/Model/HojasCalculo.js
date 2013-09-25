Ext.define("App.HojasCalculo.Model.HojasCalculo", {
    extend: "Ext.data.Model",
    fields: [
        { type: "int", name: "ID_HOJA" },
        { type: "int", name: "ID_ORDEN_PRODUCCION" },
        { type: "string", name: "NRO_HOJA" },
        { type: "string", name: "NRO_OP" },
        { type: "string", name: "ESTADO" },
        { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: convertDate },
    ]
});


