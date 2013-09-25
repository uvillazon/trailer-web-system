Ext.define("App.Utils.Model.EstadoEquipo", {
    extend: "Ext.data.Model",
    fields: [
        { type: 'string', name: 'ID_TABLA' },
        { type: 'string', name: 'COD_EQU' },
        { type: 'string', name: 'EQUIPO' },
        { type: 'string', name: 'CODIGO' },
        { type: 'string', name: 'VALOR' },
        { type: 'string', name: 'DESCRIP' },
        { type: 'string', name: 'ESTADO' }
    ]
});