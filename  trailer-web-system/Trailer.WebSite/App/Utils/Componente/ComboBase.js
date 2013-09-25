Ext.define("App.Utils.Componente.ComboBase", {
    extend: "Ext.form.ComboBox",
    alias: 'widget.comboBase',
    typeAhead: true,
    queryMode: 'local',
    editable: true, //permite controlar lo de la lista dinamica para busqueda inteligente
    forceSelection: false,
    margin: '0 0 0 10',
    emptyText: 'Seleccione...',
    disabledCls: 'DisabledClase',
    displayField: 'VALOR',
    width: 240,
    queryParam : 'condicion',
    minChars : 1,
    selectOnFocus: true,
    labelWidth: 80,
    matchFieldWidth : false,
    mensaje: '',
    titulo: '',
    requerido: '',
    opcion : '',
    initComponent: function () {
        var me = this;
        if (me.queryMode != 'local') {
            //            alert(me.name);
            me.matchFieldWidth = false;
            me.forceSelection = true;
            me.editable = true;
            me.vtype = "uppercase";
        }
        else {
            me.matchFieldWidth = true;
            me.forceSelection = false;
            me.editable = false;
        }
        me.on('assertValue', function () {
            var me = this;
            if (!me.forceSelection) {
                me.collapse();
            } else {
                me.callParent();
            }
        });
        me.on('expand', function () {
            this.clearValue();
        });
        me.on('focus', function () {
            this.store.load();
        })
        me.callParent(arguments); //y
    },
    setDisabled: function (disabled) {
        //        alert(disabled);
        if (disabled) {
            this.forceSelection = false;
        }
        return this[disabled ? 'disable' : 'enable']();
    }
});
