c_requerido = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
c_BsRequerido = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[Bs]</span>';
c_UnidadPCorriente = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[A]</span>'
c_UnidadCorriente = '<span style="color:blue" data-qtip="Required">[A]</span>';
c_UnidadCapImpulso = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[kV]</span>';
c_UnidadCapRuptura = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[kA]</span>';
c_UnidadTiempo = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[s]</span>';
c_UnidadCapRupturaN = '<span style="color:blue" data-qtip="Required">[kA]</span>';
c_UnidadPTensionN = '<span style="color:blue" data-qtip="Required">[kV]</span>';
c_UnidadLitros = '<span style="color:blue" data-qtip="Required">[L]</span>'; //litros
c_UnidadAceiteR = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[L]</span>';
c_UnidadOhmioRequerido = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[ohm Ω]</span>';
c_UnidadOhmio = '<span style="color:blue" data-qtip="Required">[ohm Ω]</span>';
c_UnidadTensionRefRequerido = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[V]</span>';
c_UnidadPorcentajeRequerido = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[%]</span>';
c_UnidadOhmioSiglaRequerido = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[Ω]</span>';
c_UnidadPotenciaRequerido = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[kVAr]</span>';
c_UnidadPotencia = '<span style="color:blue" data-qtip="Required">[KVA]</span>';
c_UnidadPeso = '<span style="color:blue" data-qtip="Required">[Kg]</span>';
c_UnidadCCircuito = '<span style="color:blue" data-qtip="Required">[%]</span>';
c_UnidadPerdidas = '<span style="color:blue" data-qtip="Required">[W]</span>';
//ohmio, Ω
//Meotodo para Habilitar los metodos del store 
//setExtraParams
host = 'http://192.168.30.34/Trailer/';
//host = '../';
function convertDate(value, record) {
    if (value == null) {
        return null;
    }
    else {
        var milli = value.replace(/\/Date\((-?\d+)\)\//, '$1');
        var d = new Date(parseInt(milli));
        return d;
    }
}
function ConvertImagen(value, record) {
    if (record.data.ESTADO == 'CONTABILIZADO') {    // Evalua si el valor campo “estado” es “A”
        str = "<img data-qtip='Ingreso Contabilizado' src='" + host + "Content/Iconos/tick.png'/>";    // Asigna imagen en código html a una variable
    }
    else {        // En caso el estado no sea “A”
        //alert(record.data.FUNCIONES_OK);
        str = "<img data-qtip='Ingreso Sin Contabilizar' src='" + host + "Content/Iconos/error.png'/";     // Asigna imagen en código html a una variable
    }
    return str;
    //return record.data.MARCA; 
}
Ext.override(Ext.data.Store, {
    setExtraParams: function (params) {
        this.proxy.extraParams = this.proxy.extraParams || {};
        for (var x in params) {
            this.proxy.extraParams[x] = params[x];
        }
        this.proxy.applyEncoding(this.proxy.extraParams);
    },
    setExtraParam: function (name, value) {
        this.proxy.extraParams = this.proxy.extraParams || {};
        //        this.proxy.extraParams = {};
        //        alert(value);
        //        this.proxy.extraParams = null;
        //this.proxy.extraParams.clear();
        this.proxy.extraParams[name] = value;
        this.proxy.applyEncoding(this.proxy.extraParams);
    }
});

Ext.override(Ext.grid.Panel, {
    VerReporte: function () {
        var me = this;
        window.open(host + 'Informes/'+me.reporte+'');
    }
});
 function BloquearForm (form){
     var els = form.query('.field');
//     alert('entro');
        Ext.each(els, function (o) {
            if (o.hidden == false) {
                o.setDisabled(true);
            }
        });
    }
function DesbloquearForm  (form){
        var els=form.query('.field');
        Ext.each(els,function(o){
            o.setDisabled(false);
        });
    }

    Ext.override(Ext.window.MessageBox, {
        alert: function (cfg, msg, fn, scope) {
            var icono = null;
            if (cfg == 'Exito') {
                icono = this.INFO;
            }
            else if (cfg == 'Aviso') {
                icono = this.WARNING;
            }
            else {
                icono = this.ERROR;
            }
            if (Ext.isString(cfg)) {
                cfg = {
                    title: cfg,
                    msg: msg,
                    buttons: this.OK,
                    icon: icono,
                    fn: fn,
                    scope: scope,
                    minWidth: this.minWidth
                };
            }
            return this.show(cfg);
        }
    });