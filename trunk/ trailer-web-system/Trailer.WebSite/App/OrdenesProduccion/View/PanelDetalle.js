Ext.define('App.OrdenesProduccion.View.PanelDetalle', {
    extend: 'Ext.Panel',
    // register the App.BookDetail class with an xtype of bookdetail
    //alias: 'widget.bookdetail',
    // add tplMarkup as a new property
    tplMarkup: [
            'Title: <a href="{DetailPageURL}" target="_blank">{DETALLE_ITEM}</a><br/>',
            'Author: {Author}<br/>',
            'Manufacturer: {Manufacturer}<br/>',
            'Product Group: {ESTADO}<br/>'
        ],
    // startingMarup as a new property
    startingMarkup: 'Please select a book to see additional details',

    bodyPadding: 7,
    // override initComponent to create and compile the template
    // apply styles to the body of the panel and initialize
    // html to startingMarkup
    initComponent: function () {
        this.tpl = Ext.create('Ext.Template', this.tplMarkup);
        this.html = this.startingMarkup;

        this.bodyStyle = {
            background: '#ffffff'
        };
        // call the superclass's initComponent implementation
       // App.BookDetail.superclass.initComponent.call(this);
    },
    // add a method which updates the details
    updateDetail: function (data) {
        this.tpl.overwrite(this.body, data);
    }
});