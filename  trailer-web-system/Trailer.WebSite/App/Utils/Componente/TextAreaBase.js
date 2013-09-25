validaciones = Ext.create('App.Utils.Validaciones');
validaciones.cargarValidaciones();
Ext.define("App.Utils.Componente.TextAreaBase", {
    extend: "Ext.form.TextArea",
    alias: 'widget.TextArea',
    disabledCls: 'DisabledClase',
    emptyText: 'Introduzca...',
     width: 500,
     vtype : 'uppercase',
     //rowspan: 3,ç
     margin: '0 0 0 10',
     colspan: 2,
     columns: 1,
     selectOnFocus: true

});
