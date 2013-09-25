Ext.define("App.DetallesSalida.Model.DetallesSalida", {
    extend: "Ext.data.Model",
    fields: [
            { type: "int", name: "ID_DETALLE" },

            { type: "int", name: "ID_SALIDA" },

            { type: "int", name: "ID_ORDEN_PRODUCCION" },

            { type: "int", name: "ID_DETALLE_ORDEN" },

            { type: "int", name: "ID_MATERIA_PRIMA" },

            { type: "int", name: "ID_EMPLEADO" },

            { type: "string", name: "NRO_ORDEN" },

            { type: "string", name: "NRO_SALIDA" },

            { type: "string", name: "DETALLE_ITEM" },

            { type: "string", name: "TALLA" },

            { type: "string", name: "DETALLE_MATERIAL" },

            { type: "string", name: "DETALLE" },

            { type: "string", name: "UNIDAD" },

            { type: "float", name: "CANTIDAD" },

            { type: "string", name: "RESPONSABLE" },

            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: convertDate },

            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: convertDate },

            { type: "string", name: "ESTADO" },

    ]
});