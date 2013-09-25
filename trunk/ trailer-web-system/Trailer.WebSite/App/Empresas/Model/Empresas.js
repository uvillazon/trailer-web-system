Ext.define("App.Empresas.Model.Empresas", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_EMPRESA', type: 'int' },
        { name: 'CODIGO', type: 'string' },
        { name: 'CIUDAD', type: 'string' },
        { name: 'NOMBRE', type: 'string' },
        { name: 'DIRECCION', type: 'string' },
        { name: 'TELEFONO', type: 'string' },
        { name: 'EMAIL', type: 'string' },
        { name: 'DESCRIPCION', type: 'string' },
        { name: 'NIT', type: 'string' },
        { name: 'RESPONSABLE', type: 'string' },
        { name: 'WEB', type: 'string' },
        { name: 'CELULAR', type: 'string' },
        { name: 'PAIS', type: 'string' },
        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate }
    ]
});