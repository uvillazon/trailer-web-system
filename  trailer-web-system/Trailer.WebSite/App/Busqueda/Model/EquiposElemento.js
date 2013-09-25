Ext.define("App.Busqueda.Model.EquiposElemento", {
    extend: "Ext.data.Model",
    fields: [
            { name: 'ID', type: 'int' },
            { name: 'CODIGO', type: 'string' },
            { name: 'MARCA', type: 'string' },
            { name: 'SERIE', type: 'string' },
            { name: 'MODELO', type: 'string' }, //TIPO
            { name: 'TENS_NOMINAL', type: 'float' },
            { name: 'TENS_OPER', type: 'float' },
            {name: 'ANIO_FABR', type: 'int' },
            { name: 'AREA_UBIC', type: 'string' },
            { name: 'UBICACION', type: 'string' },
            { name: 'FECHA_ALTA', type: 'date', dateFormat: 'd/m/Y',

                convert: function (value, record) {
                    if (value == null) {
                        return null;
                    }
                    else {
                        var v_milli = value.replace(/\/Date\((-?\d+)\)\//, '$1');
                        var v_d = new Date(parseInt(v_milli));

                        return v_d;
                    }
                }
            },
            { name: 'EQUIPOELEMENTO', type: 'string' },
            { name: 'ESTADO', type: 'string' }
        ]
});