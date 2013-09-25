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

            Ext.define("App.Utils.MainPanel", {
                extend: "Ext.Viewport",
                layout: 'border',
                monitorResize: false,
                frame: true,
                padding:'0 0 18 0',
                labelAlign: 'rigth',
            });