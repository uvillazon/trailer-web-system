Ext.define("App.Listas.Model.ListaAdm", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_TABLA', type: 'string' },
        { name: 'TIPO_LISTA', type: 'string' },
        { name: 'DESCRIPCION', type: 'string' },
        { name: 'VALOR', type: 'string' },
        { name: 'CODIGO', type: 'string' },
        { name: 'LISTA', type: 'string' },
        { name: 'ESTADO', type: 'string' }
       
    ]
});