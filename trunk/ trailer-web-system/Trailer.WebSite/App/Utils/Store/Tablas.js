Ext.define('App.Utils.Store.Tablas', {
    extend: 'Ext.data.Store',
    model: 'App.Utils.Model.Tablas',
    remoteSort: false,
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: host + 'Principal/GetAllTablas',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    }
});