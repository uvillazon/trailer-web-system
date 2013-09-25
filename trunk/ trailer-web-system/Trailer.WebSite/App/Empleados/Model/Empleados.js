Ext.define("App.Empleados.Model.Empleados", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_EMPLEADO', type: 'int' },
        { name: 'NOMBRE', type: 'string' },
        { name: 'CARGO', type: 'string' },
        { name: 'APELLIDO', type: 'string' },
        { name: 'DIRECCION', type: 'string' },
        { name: 'TELEFONO', type: 'string' },
        { name: 'EMAIL', type: 'string' },
        { name: 'DESCRIPCION', type: 'string' },
        { name: 'CI', type: 'string' },
        { name: 'CIUDAD', type: 'string' },
        { name: 'ESTADO', type: 'string' },
        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate },
        { name: 'FECHA_BAJA', type: 'date', dateFormat: 'd-m-Y', convert: convertDate },


    ]
});