Ext.define("App.Utils.Model.EstadoTransicion", {
    extend: "Ext.data.Model",
    fields: [
        { type: 'string', name: 'COD_EQU' },
        { type: 'string', name: 'ORIGEN' },
        { type: 'string', name: 'DESTINO' },
        { type: 'string', name: 'VALOR_ORG' },
        { type: 'string', name: 'VALOR_DEST' }
        ]
});