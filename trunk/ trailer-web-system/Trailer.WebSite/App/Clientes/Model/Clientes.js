Ext.define("App.Clientes.Model.Clientes", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_CLIENTE', type: 'int' },
        { name: 'NOMBRE', type: 'string' },
        { name: 'APELLIDO', type: 'string' },
        { name: 'DIRECCION', type: 'string' },
        { name: 'TELEFONO', type: 'string' },
        { name: 'EMAIL', type: 'string' },
        { name: 'DESCRIPCION', type: 'string' },
        { name: 'NIT', type: 'string' },
        { name: 'CIUDAD', type: 'string' },
        { name: 'ESTADO', type: 'string' },
        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate },
        { name: 'idcliente', type: 'int' },
        { name: 'codigo', type: 'string' },
        { name: 'nombre', type: 'string' },
        { name: 'direccion', type: 'string' },
        { name: 'ciudad', type: 'string' }

    ]
});