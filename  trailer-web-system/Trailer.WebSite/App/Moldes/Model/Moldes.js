Ext.define("App.Moldes.Model.Moldes", {
    extend: "Ext.data.Model",
    fields: [
        { type: "int", name: "ID_MOLDE" },
        { type: "int", name: "ID_IMAGEN" },
        { type: "string", name: "NRO_MOLDE" },
        { type: "string", name: "CATEGORIA" },
        { type: "string", name: "EMPRESA" },
        { type: "string", name: "MODELO" },
        { type: "string", name: "DETALLE" },
        { type: "string", name: "TALLA" },
        { type: "float", name: "SASTRE" },
        { type: "float", name: "HILO" },
        { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: convertDate },
    ]
});