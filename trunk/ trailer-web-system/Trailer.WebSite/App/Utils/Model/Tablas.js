Ext.define("App.Utils.Model.Tablas", {
    extend: "Ext.data.Model",
    fields: [
        { type: 'string', name: 'TABLA' },
        { type: 'int', name: 'ID_TABLA' },
        { type: 'string', name: 'COLUMNA' },
        { type: 'int', name: 'TAMANO' },
        { type: 'string', name: 'TIPO' },
        { type: 'int', name: 'PRECISION' },
        { type: 'int', name: 'ESCALA' },
        { type: 'string', name: 'REQUERIDO' },
        { type: 'string', name: 'COMENTARIO' }
    ]
});