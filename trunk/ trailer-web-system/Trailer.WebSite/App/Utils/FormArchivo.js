
Ext.define("App.Utils.FormArchivo", {
    extend: "Ext.form.Panel",
    width: 500,
    frame: true,
    title: 'Formulario de Archivos',
    bodyPadding: '10 10 0',
    equipo : '',
    defaults: {
        anchor: '100%',
        allowBlank: false,
        labelWidth: 80,
    },
    initComponent: function () {
        var me = this;
        me.txt_equipo = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: 'TABLA',
            hidden: true
        });
        me.txt_equipo.setValue(me.equipo);
        me.txt_desc = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Descripción',
            name: 'DESCRIPCION',
            //margin: '5',
            //afterLabelTextTpl: c_requerido,
            //allowBlank: false
        });
        this.items = [me.txt_equipo,me.txt_desc, {
            xtype: 'filefield',
            emptyText: 'Seleccione una Imagen o Archivo',
            fieldLabel: 'Archivo',
            name: 'IMAGEN',
            buttonText : 'Buscar Archivo.',
            buttonConfig: {
                iconCls: 'image_add'
            }
            
        }];

        this.callParent(arguments);
    },
    limpiarFormulario : function()
    {
        this.getForm().reset();
        this.txt_equipo.setValue(this.equipo);
    }

});