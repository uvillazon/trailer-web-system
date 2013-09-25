Ext.define("App.DetallesSalida.Model.DetallesSalidaAux", {
    extend: "Ext.data.Model",
    fields: [
            { type: "int", name: "ID_DETALLE" },

            { type: "int", name: "ID_ORDEN_PRODUCCION" },

            { type: "int", name: "ID_DETALLE_ORDEN" },

            { type: "int", name: "ID_MATERIA_PRIMA" },

            { type: "int", name: "ID_EMPLEADO" },

            { type: "string", name: "NRO_ORDEN" },

            { type: "string", name: "DETALLE_ITEM" },

            { type: "string", name: "TALLA" },

            { type: "string", name: "DETALLE_MATERIAL" },

            { type: "string", name: "DETALLE" },

            { type: "string", name: "UNIDAD" },

            { type: "float", name: "CANTIDAD" },

            { type: "string", name: "RESPONSABLE" },
            { type: "string", name: "ESTADO" },

    ]
});