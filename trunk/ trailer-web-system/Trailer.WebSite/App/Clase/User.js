/**
* @class ClasesExtJs.Ventana
* @extends Ext.window.Window
* requires requires
* @autor Erika Ballesteros
* @date 21/08/2012
*
* Description
* Ext Js Ventana Emergente usando libreria de clases con ext js y mvc3
*
**/
//Definicion del modelo para listas dinamicas
Ext.define("Clase.User", {
    config: {
        name: "John",
        lastname: "Doe"
    },

    constructor: function (options) {
        this.initConfig(options);
    }
});
