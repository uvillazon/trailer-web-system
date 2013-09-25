Ext.define("App.Utils.Componente.TimeFieldBase", {
    extend: "Ext.form.TimeField",
    alias: 'widget.TimeFieldBase',
    margin: '10 0 10 0',           
    disabledCls: 'DisabledClase',              
    emptyText:'Introduzca...',
    //enforceMaxLength: true,
    width: 180,
    labelWidth: 80,
    format     : 'H:i',
    selectOnFocus: true,
    minValue: '0:00',
    maxValue: '23:59',
    increment: 1

});
