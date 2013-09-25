function Mega(v, record) { 
    var res = v / 1048576;
//    return record.data.TAMANO / 1048576;
    return res;
}
Ext.define("App.Imagen.Model.ImagenEquipo", {
    extend: "Ext.data.Model", 
     fields: [
        { type: 'int', name: 'ID_EQUIPO' },
        { type: 'int', name: 'ID' },
        { type: 'string', name: 'NOMBRE_IMG' },
        { name: 'FECHA_REG', type: 'date', dateFormat: 'd/m/Y',
           
             convert: function(value, record) {
             if(value == null){
              return null;
             }
             else{
                var v_milli = value.replace(/\/Date\((-?\d+)\)\//, '$1');
                var v_d = new Date(parseInt(v_milli));
              
                return  v_d ;}
            }
       },
       { type: 'string', name: 'EXTENSION' },
       { type: 'string', name: 'DESCRIPCION' },
       { type: 'float', name: 'TAMANO', convert : Mega }
      
       ]
});