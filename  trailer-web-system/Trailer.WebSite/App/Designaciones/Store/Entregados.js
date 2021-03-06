﻿Ext.define('App.Designaciones.Store.Entregados', {
    extend: 'Ext.data.Store',
    model: 'App.Designaciones.Model.Designaciones',
    remoteSort: true,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Designaciones/GetAllEntregados',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'ID_DETALLE',
            direction: 'DESC',
        }]
});