Ext.define("App.Utils.FormPanelTransicionEstado", {
    extend: "Ext.form.Panel",
    //defaultType: 'textfield',
     layout: {
        type: 'table',
        columns: 3,
        //layout: 'anchor'
    },
    bodyPadding: 10,
    operacion: '',
    estadoOrigen:'',
    valorequipo:'',
    estadoDestino:'',
    initComponent: function () {
        //Definiendo store
        store_estadoTransicion = Ext.create("App.Listas.Store.EstadoTransicion");
        botonCambiar = Ext.create('Ext.Button', {
             text: 'Cambiar Estado',
             width: 120,
             textAlign: 'center',
             margin : 10

        });
        if(this.operacion == ''){
        
        cbx_estadoActual = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Estado <br> Actual',
            name: 'ESTADO',
            itemId: 'ESTADO'
         
        });
        //Definiendo combo para el estado proximo
        cbx_estadoProximo = Ext.create("App.Utils.Componente.ComboBase", {
            store: store_estadoTransicion,
            fieldLabel: 'Estado <br>  Proximo',
            columns: 1,
            colspan: 2,
            width : 200,
            name: 'ESTADO_A',
            itemId: 'ESTADO_A',
            displayField  :'DESTINO'
                  });
        this.items = [
        cbx_estadoActual,
        cbx_estadoProximo
    ];
        }
        else{
        
        cbx_estadoActual = Ext.create("App.Utils.Componente.ComboBase", {
            //store: store_estado,
            fieldLabel: 'Estado <br> Actual',
            name: 'ESTADO',
            itemId: 'ESTADO',
            forceSelection: false,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            valueField: 'CODIGO',
            labelWidth: 50,
            autoShow: true,
            readOnly: true
            
        });
        //Definiendo combo para el estado proximo
        cbx_estadoProximo = Ext.create("App.Utils.Componente.ComboBase", {
            store: store_estadoTransicion,
            fieldLabel: 'Estado <br>  Proximo',
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            name: 'ESTADO_A',
            itemId: 'ESTADO_A',
            valueField: 'CODIGO',
            displayField  :'DESTINO',
            labelWidth: 50
           
        });
        this.items = [
             cbx_estadoActual,
              cbx_estadoProximo,
            botonCambiar
        
    ];
            }
          
        //this.buttons = this.botones;
        this.callParent(arguments);
    },
    getButton : function(){
        return botonCambiar;
    },
    cargarEstados : function (estado,equipo)
    {
            store_estadoTransicion.load({
            params : {
                condicion : equipo,
                EstadoOrgigen : estado
            }
            });
            cbx_estadoActual.setValue(estado);
    },
    getValorEstadoProximo : function ()
    {   
    return cbx_estadoProximo.getValue();
    }
   
});
