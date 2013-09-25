Ext.define('App.Imagen.Store.ImagenEquipo', {
    extend: 'Ext.data.Store',
    model: 'App.Imagen.Model.ImagenEquipo',
    remoteSort: false,
    autoLoad: false,
    proxy : {
         type: 'jsonp',
         url: host+'Imagen/GetAllImagen',
         extraParams:{
                        codigo:'EQUIPO',
                        },
        
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
           simpleSortMode: true
        },
    sorters: [{
            property: 'FECHA_REG',
            direction: 'DESC',
        }]
    
     
});

