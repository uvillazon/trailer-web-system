/**
* Clase basica de ToolBar Para los menus Superiores de todos los Grid
*/
Ext.define('App.Utils.ToolBarMenu', {
    extend: 'Ext.toolbar.Toolbar',
    dock: 'top',
    opcion: '',
    initComponent: function () {
        var me = this;
        if (me.opcion == '') {
            me.MenuEquipos(false);
        }
        else if (me.opcion == 'izquierda') {
            me.MenuEquipos(true);
        }
        else {
            alert(me.opcion);
        }
        me.callParent();
    },
    MenuEquipos: function (bool) {
        var me = this;
        me.crear = Ext.create('Ext.Button', {
            text: 'Crear',
            iconCls: 'application_form_add',
            itemId: 'btn_crear',
            cls: 'botones',
            hidden: true

        });
        me.editar = Ext.create('Ext.Button', {
            text: 'Editar',
            iconCls: 'application_form_edit',
            itemId: 'btn_editar',
            cls: 'botones',
            hidden: true

        });
        me.eliminar = Ext.create('Ext.Button', {
            text: 'Eliminar',
            iconCls: 'application_form_delete',
            itemId: 'btn_baja',
            cls: 'botones',
            hidden: true
        });
        me.imagen = Ext.create('Ext.Button', {
            text: 'Imagen',
            iconCls: 'image_add',
            itemId: 'btn_imagen',
            cls: 'botones',
            hidden: true
        });
        me.ajuste = Ext.create('Ext.Button', {
            text: 'Ajuste',
            iconCls: 'application_form_add',
            itemId: 'btn_ajuste',
            cls: 'botones',
            hidden: true
        });
        
        if (bool) {
            me.items = [ me.crear, me.editar, me.eliminar, me.imagen, me.ajuste];
        } else {
            me.items = ['->', me.crear, me.editar, me.eliminar, me.imagen, me.ajuste];
        }
    }
});