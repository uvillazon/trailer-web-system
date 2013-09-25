Ext.define('App.MateriasPrima.Store.MateriasPrima', {
    extend: 'Ext.data.Store',
    model: 'App.MateriasPrima.Model.MateriasPrima',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'MateriasPrima/GetAllMateriasPrima',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'NOMBRE',
            direction: 'ASC',
        }]
});