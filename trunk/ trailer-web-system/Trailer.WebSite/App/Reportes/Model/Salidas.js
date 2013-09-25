function ConvertImagen(value, record) {
    if (record.data.ESTADO == 'CONTABILIZADO') {    // Evalua si el valor campo “estado” es “A”
        str = "<img data-qtip='Ingreso Contabilizado' src='"+host+"Content/Iconos/tick.png'/>";    // Asigna imagen en código html a una variable
    }
    else {        // En caso el estado no sea “A”
        //alert(record.data.FUNCIONES_OK);
        str = "<img data-qtip='Ingreso Sin Contabilizar' src='" + host + "Content/Iconos/error.png'/";     // Asigna imagen en código html a una variable
    }
    return str;
    //return record.data.MARCA; 
}
Ext.define("App.Salidas.Model.Salidas", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_SALIDA', type: 'int' },
        { name: 'IMAGEN', convert: ConvertImagen},
        { name: 'NRO_SALIDA', type: 'int' },
        { name: 'ID_ORDEN_PRODUCCION', type: 'int' },
        { name: 'NRO_ORDEN', type: 'int' },
        { name: 'RESPONSABLE', type: 'string' },
        { name: 'OBSERVACION', type: 'string' },
        { name: 'ESTADO', type: 'string' },
        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate },
        { name: 'FECHA_SALIDA', type: 'date', dateFormat: 'd-m-Y', convert: convertDate }
    ]
});