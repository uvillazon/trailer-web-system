Ext.define("App.Listas.Model.ListaAdmRel", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_LST_1', type: 'string' },
        { name: 'ID_TABLA', type: 'string' },
        { name: 'LISTA', type: 'string' },
        { name: 'CODIGO', type: 'string' },
        { name: 'VALOR', type: 'string' },
        { name: 'ESTADO', type: 'string' }
       
    ]
});