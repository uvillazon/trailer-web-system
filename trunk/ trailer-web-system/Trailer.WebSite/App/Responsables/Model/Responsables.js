Ext.define("App.Responsables.Model.Responsables", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_RESPONSABLE', type: 'int' },
        { name: 'ID_EMPRESA', type: 'int' },
        { name: 'NOMBRE', type: 'string' },
        { name: 'CIUDAD', type: 'string' },
        { name: 'APELLIDO', type: 'string' },
        { name: 'DIRECCION', type: 'string' },
        { name: 'TELEFONO', type: 'string' },
        { name: 'EMAIL', type: 'string' },
        { name: 'DESCRIPCION', type: 'string' },
        { name: 'EMPRESA', type: 'string' },
        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate }
    ]
});