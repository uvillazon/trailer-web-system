Ext.define("App.Extjs.Model.Contactos", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_CONTACTO', type: 'int' },
        { name: 'NOMBRE', type: 'string' },
        { name: 'APELLIDO', type: 'string' },
        { name: 'DIRECCION', type: 'string' },
        { name: 'TELEFONO', type: 'int' },
        { name: 'CIUDAD', type: 'string' },
        { name: 'PAIS', type: 'string' },
        { name: 'DESCRIPCION', type: 'string' },
        { name: 'CI', type: 'string' },
        { name: 'DIRECCION', type: 'string' },
        { type: "date", name: "FECHA_NACIMIENTO", dateFormat: "d/m/Y", convert: Utils.Funciones.Fecha },
    ]
});