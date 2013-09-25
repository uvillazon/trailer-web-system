Ext.define('App.Utils.Validaciones', {
    cargarValidaciones: function () {
        Ext.apply(Ext.form.VTypes, {
            validacionNumero: function (value, field) {
                return /[0-9]/.test(value);
            },
            validacionNumeroText: 'Los datos ingresado no son válidos. Solo números',
            validacionNumeroMask: /[0-9]/i,

            validacionLetrasConEspacios: function (value, field) {
                return /[A-Za-z]/.test(value);
            },
            validacionLetrasConEspaciosText: 'Datos ingresados no válidos. Solo letras',
            validacionLetrasConEspaciosMask: /[A-Za-z]/,

            CodigoEquiposMask: /^[a-z0-9]*[@]?$/i,
            CodigoEquipos: function (val, field) {
                var texto = val;
                if (texto.length == 1) {
                    texto = texto + "-";
                }
                texto = Ext.util.Format.uppercase(texto);

                field.setRawValue(texto);
                return true;
            },
            //convierte a mayuscula
            //CodigoEquiposMask: /^[0-9]*[:]?$/i,
            //HoraMask: /^[0-9]*[:]?$/i,
            HoraMask: /[\d\s:]/i,
            HoraText: "No es una hora valida. Este es el formato 0:00 - 23:59 ",
            Hora: function (value, field) {
                var texto = value;
                if (texto.length == 2) {
                    texto = texto + ":";
                }

                field.setRawValue(texto);
                return /^(1|01|2|02|3|03|4|04|5|05|6|06|7|07|8|08|9|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|00|0):(([0-5][0-9]|[0-9])|([0-5][0-9]|[0-9]):[0-5][0-9])$/.test(value);
            },

            HoraSegMask: /[\d\s:]/i,
            HoraSegText: "No es una hora valida. Este es el formato 00:00:00 - 23:59:59 ",
            HoraSeg: function (value, field) {
                var texto = value;
                if (texto.length == 2 || texto.length ==5) {
                    texto = texto + ":";
                }

                field.setRawValue(texto);
                return /^(1|01|2|02|3|03|4|04|5|05|6|06|7|07|8|08|9|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|00|0):(([0-5][0-9]|[0-9])|([0-5][0-9]|[0-9]):[0-5][0-9])$/.test(value);
            },
            //            Hora: function (val, field) {
            //                var texto = val;
            //                if (texto.length == 2) {
            //                    texto =texto+":";
            //                }
            //                texto = Ext.util.Format.uppercase(texto);

            //                field.setRawValue(texto);
            //                return true;
            //            },


            uppercase: function (value, field) {
                texto = Ext.util.Format.uppercase(value);

                field.setRawValue(texto);
                return true;
            }
        });
    }
});