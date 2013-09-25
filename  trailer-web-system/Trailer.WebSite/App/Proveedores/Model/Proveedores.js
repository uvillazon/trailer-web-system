Ext.define("App.Proveedores.Model.Proveedores", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_PROVEEDOR', type: 'int' },
        { name: 'NOMBRE', type: 'string' },
        { name: 'PAIS', type: 'string' },
        { name: 'DIRECCION', type: 'string' },
        { name: 'TELEFONO', type: 'string' },
        { name: 'EMAIL', type: 'string' },
        { name: 'WEB', type: 'string' },
        { name: 'DESCRIPCION', type: 'string' },
        { name: 'NIT', type: 'string' },
        { name: 'CIUDAD', type: 'string' },
        { name: 'REPRESENTANTE', type: 'string' },
        { name: 'ESTADO', type: 'string' },
        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate }

    ]
});