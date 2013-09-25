function CantidadFaltante(v, record) {
    return record.data.CANTIDAD - record.data.CANTIDAD_ENTREGADA;
}
function TotalFaltante(v, record) {
    return record.data.TOTAL - record.data.TOTAL_CANCELADO;
}

Ext.define("App.Designaciones.Model.Designaciones", {
    extend: "Ext.data.Model",
    fields: [
            { type: "int", name: "ID_DESIGNACION" },
            { type: "int", name: "ID_ORDEN_PRODUCCION" },
            { type: "int", name: "ID_DETALLE_ORDEN" },
            { type: "int", name: "ID_EMPLEADO" },
            { type: "string", name: "NRO_ORDEN" },
            { type: "string", name: "DETALLE_ITEM" },
            { type: "string", name: "TALLA" },
            { type: "string", name: "OPERARIO" },
            { type: "string", name: "RESPONSABLE" },
            { type: "string", name: "OBSERVACION" },
            { type: "float", name: "CANTIDAD" },
            { type: "float", name: "CANTIDAD_ENTREGADA" },
            { name: 'CANTIDAD_FALTANTE', convert: CantidadFaltante },
            { name: 'TOTAL_FALTANTE', convert: TotalFaltante },
            { type: "float", name: "SASTRE" },
            { type: "float", name: "HILO" },
            { type: "float", name: "TOTAL" },
            { type: "float", name: "TOTAL_CANCELADO" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: convertDate },
            { type: "date", name: "FECHA_ENTREGA", dateFormat: "d/m/Y", convert: convertDate },
    //Detalle Designacion 
            {type: "int", name: "ID_DETALLE" },
            { type: "int", name: "ID_MATERIA_PRIMA" },
            { type: "string", name: "DETALLE" },
            { type: "string", name: "UNIDAD" },
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: convertDate },

    ]
});