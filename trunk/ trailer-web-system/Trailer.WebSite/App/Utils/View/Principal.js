Ext.define("App.Utils.View.Principal", {
    extend: "App.Utils.Principal",
    alias: "widget.PanelPrincipalUtils",
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentesUtils();
        this.callParent(arguments);
    },
    CargarComponentesUtils : function(){
        var me = this;
        me.crear = Ext.create('Ext.Button', {
            text: 'Generar',
            iconCls: 'icon-add',
            itemId: 'btn_crear_pend',
            cls: 'botones',
            hidden: false

        });
        me.txt_controlador = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: 'CONTROLADOR',
            width : 300, 
            fieldLabel : 'controlador'
        });
        me.txt_tabla = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: 'TABLA',
            width : 350,
            fieldLabel : 'Tabla'
        });
        me.filterPanel = Ext.create('Ext.panel.Panel', {
            bodyPadding: 5,  // Don't want content to crunch against the borders
            region: 'north',
            layout: {
                type: 'table',
                columns: 3
            },
            fieldDefaults : {
                margin: '2',
                align:'left',
                labelWidth: 110,
            },
            title: 'Parametros de Generacion',
            items: [me.txt_tabla,me.txt_controlador,me.crear
            ]
        });
        me.crear.on('click',me.Generar,this);
        me.panelmodel = Ext.create('Ext.panel.Panel', {
            title: 'modelos',
            bodyPadding: 10,
            autoScroll : true,
        });
//        me.editarStore = Ext.create('Ext.form.field.HtmlEditor',{
//            enableColors: false,
//            enableAlignments: false
//        });
        me.panelstore = Ext.create('Ext.panel.Panel', {
            title: 'Stores',
            bodyPadding: 10,
            autoScroll : true,
//            items : me.editarStore
        });
        me.panelgrid = Ext.create('Ext.panel.Panel', {
            title: 'Grids',
            bodyPadding: 10,
            autoScroll : true,
        });
        me.panelform = Ext.create('Ext.panel.Panel', {
            title: 'formulario',
            bodyPadding: 10,
            autoScroll : true,
        });
        me.panelSpAlta = Ext.create('Ext.panel.Panel', {
            title: 'SP Alta Oracle',
            bodyPadding: 10,
            autoScroll : true,
        });
        me.panelSpModif = Ext.create('Ext.panel.Panel', {
            title: 'SP Modif Oracle',
            bodyPadding: 10,
            autoScroll : true,
        });
        me.form = Ext.create('Ext.tab.Panel', {
            region: 'center',
            width: '50%',
            items : [me.panelmodel,me.panelstore,me.panelgrid,me.panelform,me.panelSpAlta,me.panelSpModif]
        });
        me.store = Ext.create('App.Utils.Store.Tablas');
        me.store.on('load',me.GenerarDatos,this);
        me.store.on('load',me.GenerarGrids,this);
        me.store.on('load',me.GenerarFormulario,this);
        me.store.on('load',me.GenerarStore,this);
        me.store.on('load',me.GenerarSpAlta,this);
        me.store.on('load',me.GenerarSpModif,this);
        this.items = [me.filterPanel,me.form];
    },
    GenerarDatos : function(records, operations, successful){
        var me = this;
//        me.GenerarGrids(records);
        var tpl = new Ext.XTemplate(
                '<p>Ext.define("App.controlador.Model.modelo",{</p>',
                 '<p>extend: "Ext.data.Model",</p>',
                 '<p>fields : [</p>',
                 '<tpl for=".">',
                  '<tpl for="data">',
                        '<tpl if="TIPO == \'NUMBER\'">',
                            '<tpl if="ESCALA == 0"><p>{ type: "int", name: "{COLUMNA}" },</p>',
                            '<tpl else>',
                                '<p>{ type: "float", name: "{COLUMNA}" },</p>',
                            '</tpl>',
                        '</tpl>',
                        '<tpl if="TIPO == \'VARCHAR2\'"><p>{ type: "string", name: "{COLUMNA}" },</p></tpl>',
                        '<tpl if="TIPO == \'CHAR\'"><p>{ type: "string", name: "{COLUMNA}" },</p></tpl>',
                        '<tpl if="TIPO == \'DATE\'"><p>{ type: "date", name: "{COLUMNA}",  dateFormat: "d/m/Y", convert: convertDate },</p></tpl>',
                  '</tpl>',
                '</tpl>',
                '<p>]</p>',
                '<p>});</p>',
                {
                    // XTemplate configuration:
                    disableFormats: true
                }
              );
                    tpl.overwrite(me.panelmodel.body, records);
//                    me.GenerarGrids(records);
    },
    GenerarStore : function(records, operations, successful){
        var me = this;
        var tpl2 = new Ext.XTemplate(
                 '<p>CargarStore: function () {</p>',
                 '<p>var me = this;</p>',
                 '<tpl for=".">',
                  '<tpl for="data">',
                       '<tpl if="this.esLista(COMENTARIO)">',
                            '<p>me.store_{[values.COLUMNA.toLowerCase()]}  = Ext.create("App.Listas.Store.StoreDinamico");</p>',
                            '<p>me.store_{[values.COLUMNA.toLowerCase()]}.proxy.extraParams["where"] = "{COLUMNA}";</p>',
                        '</tpl>',
                  '</tpl>',
                '</tpl>',
                '<p>};</p>',
                {
                    // XTemplate configuration:
                    disableFormats: true,
                    esLista: function(COMENTARIO){
//                        alert(COMENTARIO.search('listas'));
                        return COMENTARIO.search('lista') != -1;
                       
                    }
                }
              );
                    tpl2.overwrite(me.panelstore.body, records);
//                    me.editarStore.setValue("dada");
    },
    GenerarGrids : function(records, operations, successful){
        var me = this;
        var tpl1 = new Ext.XTemplate(
                 '<p>initComponent: function () {</p>',
                 '<p>var me = this;</p>',
                 '<p>me.store = Ext.create("App.Store");</p>',
                 '<p>me.CargarComponentes();</p>',
                 '<p>me.columns = [</p>',
                 '<p>&#123; xtype: "rownumberer", width: 30, sortable: false &#125;,</p>',
                 '<tpl for=".">',
                  '<tpl for="data">',
                       '<tpl if="this.esLista(COMENTARIO,COLUMNA)">',
                            '<tpl if="COLUMNA.substr(0,2) == \'ID\'"><p>{ header: " - ", width: 30, sortable: false, dataIndex: "{COLUMNA}", renderer: me.renderImagen },</p>',
                            '<tpl else>',
                                '<p>{ header: "{COLUMNA}", width: 70, sortable: true, dataIndex: "{COLUMNA}" },</p>',
                            '</tpl>',
                        '</tpl>',
                  '</tpl>',
                '</tpl>',
                '<p>];</p>',
                '<p>},</p>',
                {
                    // XTemplate configuration:
                    disableFormats: true,
                    esLista: function(COMENTARIO,COLUMNA){
//                        alert(COMENTARIO.search('listas'));
                        return COMENTARIO.search('grid') != -1 || COLUMNA.substr(0,2) == 'ID';
                       
                    }
                }
              );
                    tpl1.overwrite(me.panelgrid.body, records);
    },
    GenerarFormulario : function(records, operations, successful){
        var me = this;

        var friendsListTpl = new Ext.XTemplate(
            '<ol>',
            '<tpl for=".">',
            '<tpl for="data">',
                '<tpl switch="TIPO">',
                    '<tpl case="NUMBER">',
                        '<tpl if="COLUMNA.substr(0,2) == \'ID\'">',
                            '<p>me.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", &#123;</p>',
                            '<p> name: "{COLUMNA}",</p>',
                            '<p> hidden: true,</p>',
                            '<p> &#125;);</p>',
                        '<tpl elseif="COLUMNA.substr(0,4) == \'ANIO\'">',
                            '<p>me.num_{[values.COLUMNA.toLowerCase()]} = Ext.create("App.Utils.Componente.NumberFieldBase", &#123;</p>',
                            '<p> fieldLabel: "{COLUMNA}",</p>',
                            '<p> name: "{COLUMNA}",</p>',
                            '<p> width: 240,</p>',
                            '<p> maxValue: new Date().getFullYear(),</p>',
                            '<p> minValue: 1900,</p>',
                            '<p> maxLength: {PRECISION},</p>',
                            '<p> allowNegative: false,</p>',
                            '<p> allowDecimals: false,</p>',
                            '<tpl if="REQUERIDO == \'N\'">',
                                '<p> afterLabelTextTpl: c_requerido,</p>',
                                '<p> allowBlank: false,</p>',
                            '</tpl>',
                            '<p> &#125;);</p>',
                        '<tpl elseif="this.esLista(COMENTARIO)">',
                            '<p>me.cbx_{[values.COLUMNA.toLowerCase()]} = Ext.create("App.Utils.Componente.ComboBase", &#123;</p>',
                            '<p> fieldLabel: "{COLUMNA}",</p>',
                            '<p> name: "{COLUMNA}",</p>',
                            '<p> width: 240,</p>',
                            '<p> store : me.store_{[values.COLUMNA.toLowerCase()]},</p>',
                            '<p> selectOnFocus: true,</p>',
                            '<tpl if="REQUERIDO == \'N\'">',
                                '<p> afterLabelTextTpl: c_requerido,</p>',
                                '<p> allowBlank: false,</p>',
                            '</tpl>',
                            '<p> &#125;);</p>',
                        '<tpl elseif="ESCALA == 0">',
                            '<p> me.num_{[values.COLUMNA.toLowerCase()]} = Ext.create("App.Utils.Componente.NumberFieldBase", &#123;</p>',
                            '<p> fieldLabel: "{COLUMNA}",</p>',
                            '<p> name: "{COLUMNA}",</p>',
                            '<p> width: 240,</p>',
                            '<p> maxLength: {PRECISION},</p>',
                            '<p> allowNegative: false,</p>',
                            '<p> allowDecimals: false,</p>',
                            '<tpl if="REQUERIDO == \'N\'">',
                                '<p> afterLabelTextTpl: c_requerido,</p>',
                                '<p> allowBlank: false,</p>',
                            '</tpl>',
                            '<p> &#125;);</p>',
                        '<tpl elseif="ESCALA != 0">',
                            '<p> me.num_{[values.COLUMNA.toLowerCase()]} = Ext.create("App.Utils.Componente.NumberFieldBase", &#123;</p>',
                            '<p> fieldLabel: "{COLUMNA}",</p>',
                            '<p> name: "{COLUMNA}",</p>',
                            '<p> width: 240,</p>',
                            '<p> maxLength: {PRECISION +1},</p>',
                            '<p> decimalSeparator: ".",</p>',
                            '<p> decimalPrecision: {ESCALA},</p>',
                            '<p> allowNegative: false,</p>',
                            '<p> allowDecimals: true,</p>',
                            '<tpl if="REQUERIDO == \'N\'">',
                                '<p> afterLabelTextTpl: c_requerido,</p>',
                                '<p> allowBlank: false,</p>',
                            '</tpl>',
                            '<p> &#125;);</p>',
                        '<tpl else>',
                            '<p>No Existe Tipo Revisar por favor el campo {COLUMNA}</p>',
                        '</tpl>',
                     '<tpl case="VARCHAR2">',
                         '<tpl if="this.esLista(COMENTARIO)">',
                            '<p>me.cbx_{[values.COLUMNA.toLowerCase()]} = Ext.create("App.Utils.Componente.ComboBase", &#123;</p>',
                            '<p> fieldLabel: "{COLUMNA}",</p>',
                            '<p> name: "{COLUMNA}",</p>',
                            '<p> width: 240,</p>',
                            '<p> store : me.store_{[values.COLUMNA.toLowerCase()]},</p>',
                            '<p> selectOnFocus: true,</p>',
                            '<tpl if="REQUERIDO == \'N\'">',
                                '<p> afterLabelTextTpl: c_requerido,</p>',
                                '<p> allowBlank: false,</p>',
                            '</tpl>',
                            '<p> &#125;);</p>',
                         '<tpl else>',
                            '<p> me.txt_{[values.COLUMNA.toLowerCase()]} = Ext.create("App.Utils.Componente.TextFieldBase", &#123; </p>',
                            '<p> fieldLabel: "{COLUMNA}",</p>',
                            '<p> name: "{COLUMNA}",</p>',
                            '<p> width: 240,</p>',
                            '<p> maxLength: {TAMANO},</p>',
                            '<tpl if="REQUERIDO == \'N\'">',
                                '<p> afterLabelTextTpl: c_requerido,</p>',
                                '<p> allowBlank: false,</p>',
                            '</tpl>',
                            '<p> &#125;);</p>',
                         '</tpl>',
                     '<tpl case="DATE">',
                        '<p> me.dat_{[values.COLUMNA.toLowerCase()]} = Ext.create("App.Utils.Componente.DateFieldBase", &#123; </p>',
                        '<p> opcion :"sin fecha",</p>',
                        '<p> fieldLabel: "{COLUMNA}",</p>',
                        '<p> name: "{COLUMNA}",</p>',
                        '<p> width: 240,</p>',
                        '<tpl if="REQUERIDO == \'N\'">',
                                '<p> afterLabelTextTpl: c_requerido,</p>',
                                '<p> allowBlank: false,</p>',
                        '</tpl>',
                        '<p> &#125;);</p>',
                     
                     '<tpl case="CHAR">',
                         '<tpl if="this.esLista(COMENTARIO)">',
                            '<p>me.cbx_{[values.COLUMNA.toLowerCase()]} = Ext.create("App.Utils.Componente.ComboBase", &#123;</p>',
                            '<p> fieldLabel: "{COLUMNA}",</p>',
                            '<p> name: "{COLUMNA}",</p>',
                            '<p> width: 240,</p>',
                            '<p> store : me.store_{[values.COLUMNA.toLowerCase()]},</p>',
                            '<p> selectOnFocus: true,</p>',
                            '<tpl if="REQUERIDO == \'N\'">',
                                '<p> afterLabelTextTpl: c_requerido,</p>',
                                '<p> allowBlank: false,</p>',
                            '</tpl>',
                            '<p> &#125;);</p>',
                         '<tpl else>',
                            '<p> me.txt_{[values.COLUMNA.toLowerCase()]} = Ext.create("App.Utils.Componente.TextFieldBase", &#123; </p>',
                            '<p> fieldLabel: "{COLUMNA}",</p>',
                            '<p> name: "{COLUMNA}",</p>',
                            '<p> width: 240,</p>',
                            '<p> maxLength: {TAMANO},</p>',
                            '<tpl if="REQUERIDO == \'N\'">',
                                '<p> afterLabelTextTpl: c_requerido,</p>',
                                '<p> allowBlank: false,</p>',
                            '</tpl>',
                            '<p> &#125;);</p>',
                         '</tpl>',
                     '<tpl default>',
                         '<p>No Existe Tipo Revisar por favor el campo {COLUMNA}  {TIPO}</p>',
                '</tpl>',
            '</tpl>',
            '</tpl>',
            '<p> me.items = [</p>',
            '<tpl for=".">',
                '<tpl for="data">',
                    '<tpl switch="TIPO">',
                        '<tpl case="NUMBER">',
                            '<tpl if="this.esLista(COMENTARIO)">',
                                '<p>me.cbx_{[values.COLUMNA.toLowerCase()]},</p>',
                            '<tpl else>',
                                '<p>me.num_{[values.COLUMNA.toLowerCase()]},</p>',
                            '</tpl>',
                        '<tpl case="VARCHAR2">',
                            '<tpl if="this.esLista(COMENTARIO)">',
                                '<p>me.cbx_{[values.COLUMNA.toLowerCase()]},</p>',
                            '<tpl else>',
                                '<p>me.txt_{[values.COLUMNA.toLowerCase()]},</p>',
                            '</tpl>',
                        '<tpl case="DATE">',
                            '<p>me.dat_{[values.COLUMNA.toLowerCase()]},</p>',
                        '<tpl default>',
                             '<p>No Existe Tipo Revisar por favor el campo {COLUMNA}</p>',
                    '</tpl>',
                '</tpl>',
            '</tpl>',
            '<p> ];</p>',
            '</ol>',
            {
                disableFormats: true,
                esLista: function(COMENTARIO){
//                    alert(COMENTARIO.search('lista'));
                    return COMENTARIO.search('lista') != -1;
               }
            }
        );
        friendsListTpl.overwrite(me.panelform.body, records);
    },
    GenerarSpAlta : function(records, operations, successful){
        var me = this;
        var TplDeclarar = new Ext.XTemplate(
                '<tpl for=".">',
                '<tpl for="data">',
                       '<p> p_{[values.COLUMNA.toLowerCase()]}  TRAILER1.{TABLA}.{COLUMNA}%type,</p>',
                    '</tpl>',
                   '</tpl>');
        var TplDefinirVariables = new Ext.XTemplate(
            '<p>IS</p>',
            '<tpl for=".">',
                '<tpl for="data">',
                    '<tpl if="ID_TABLA == \'1\'">',
                        '<p> v_{[values.COLUMNA.toLowerCase()]}  TRAILER1.{TABLA}.{COLUMNA}%type;</p>',
                    '</tpl>',
                '</tpl>',
             '</tpl>',
            '<p>v_cnt NUMBER:=0;</p>',
            '<p>v_res VARCHAR2(100):=\'0\';</p>',
            '<p>v_errC EE_AUX_LOG_ERRORES.cod_error%type;</p>',
            '<p>v_errD EE_AUX_LOG_ERRORES.desc_error%type;</p>',
            '<p>v_id_log TRAILER1.ee_aux_log_errores.id_log%type;</p>',
            '<p>BEGIN</p>'
        );
        var TplInsertSql = new Ext.XTemplate(
            '<p>  IF v_res=\'0\' THEN</p>',
            '<p> INSERT INTO TRAILER1.'+me.tabla+' (',
            '<tpl for=".">',
                '<tpl for="data">',
                    '{[values.COLUMNA.toLowerCase()]} ,',
                '</tpl>',
             '</tpl>',
             ')</p>',
             '<p>VALUES(',
             '<tpl for=".">',
                '<tpl for="data">',
                    'p_{[values.COLUMNA.toLowerCase()]} ,',
                '</tpl>',
             '</tpl>',
             ');</p>',
            '<p>v_res := \'1\';</p>',
            '<p>END IF;</p>'            
        );
        var TplValidNotNull = new Ext.XTemplate(
            '<p>IF',
            '<tpl for=".">',
                '<tpl for="data">',
                    '<tpl if="REQUERIDO == \'N\'">',
                               ' p_{[values.COLUMNA.toLowerCase()]} IS NULL  OR',
                      '</tpl>',
                '</tpl>',
             '</tpl>',
             '<p>THEN</p>',
            '<p>v_res := \'Faltan parametros.\';</p>',
            '<p>END IF;</p>'
        );
        var mainTpl = new Ext.XTemplate(
            '<p> CREATE OR REPLACE PROCEDURE TRAILER1.P_EE_ALTA_'+me.tabla+'(</p>',
            '{[this.renderDeclararCampos(values)]}',
            '<p>p_id_usr   NUMBER,</p>',
            '<p>p_res OUT  VARCHAR2</p>',
            '<p>)</p>',
            '{[this.renderDeclararVariables(values)]}',
            '<p></p>',
            '{[this.renderNotNull(values)]}',
            '<p></p>',
            '{[this.renderInsertSQL(values)]}',
            '<p> p_res := v_res;</p>',
            '<p>EXCEPTION</p>',
            '<p> WHEN OTHERS THEN</p>',
            '<p> ROLLBACK;</p>',
            '<p> v_errC:=substr(sqlcode,1,20);</p>',
            '<p>v_errD:=substr(sqlerrm,1,200);</p>',
            '<p> p_ee_grabar_error_bd(v_errC,v_errD,\'P_EE_ALTA_'+me.tabla+'\',\'P_EE_ALTA_'+me.tabla+'\',\'-\',\'-\',v_id_log);</p>',
            '<p>  p_res :=\'ERROR. Avise a TI. LOG generado #\' || v_id_log;</p>',
            '<p> END;</p>',
            {
                esLista: function(COMENTARIO) {
                    return COMENTARIO.search('lista') != -1;
                },
                renderDeclararCampos : function(values){
                    return TplDeclarar.apply(values);
                },
                renderDeclararVariables : function(values){
                    return TplDefinirVariables.apply(values);
                },
                renderNotNull : function(values){
                    return TplValidNotNull.apply(values);
                },
                renderInsertSQL : function(values){
                    return TplInsertSql.apply(values);
                }
            }
        );
        mainTpl.overwrite(me.panelSpAlta.body, records);
            
    },
    GenerarSpModif : function(records, operations, successful){
        var me = this;
        
        var TplDeclararCamposM = new Ext.XTemplate(
                '<tpl for=".">',
                '<tpl for="data">',
                       '<p> p_{[values.COLUMNA.toLowerCase()]}  TRAILER1.{TABLA}.{COLUMNA}%type,</p>',
                    '</tpl>',
                '</tpl>',
                '<p>p_id_usr   NUMBER,</p>',
                '<p>p_res OUT  VARCHAR2</p>',
                '<p>)</p>'
                );
        var TplDefinirVariablesMod = new Ext.XTemplate(
            '<p>IS</p>',
            '<p>v_cnt NUMBER:=0;</p>',
            '<p>v_res VARCHAR2(100):=\'0\';</p>',
            '<p>v_errC EE_AUX_LOG_ERRORES.cod_error%type;</p>',
            '<p>v_errD EE_AUX_LOG_ERRORES.desc_error%type;</p>',
            '<p>v_id_log TRAILER1.ee_aux_log_errores.id_log%type;</p>',
            '<p>v_rg TRAILER1.'+me.tabla+'%rowtype;</p>',
            '<p>v_sql VARCHAR2(1000):=\'\'; </p>',
            '<p>v_sqlH1 VARCHAR2(1000):=\'\';</p>',
            '<p>v_sqlH2 VARCHAR2(1000):=\'\'; </p>',
            '<p>v_sqlDel1 VARCHAR2(100):=\'\'; </p>',
            '<p>v_sqlDel2 VARCHAR2(100):=\'\';</p>',
            '<p>BEGIN</p>'
        );
        var TplInsertSql = new Ext.XTemplate(
            '<p>  IF v_res=\'0\' THEN</p>',
            '<p> INSERT INTO TRAILER1.'+me.tabla+' (',
            '<tpl for=".">',
                '<tpl for="data">',
                    '{[values.COLUMNA.toLowerCase()]} ,',
                '</tpl>',
             '</tpl>',
             ')</p>',
             '<p>VALUES(',
             '<tpl for=".">',
                '<tpl for="data">',
                    'p_{[values.COLUMNA.toLowerCase()]} ,',
                '</tpl>',
             '</tpl>',
             ');</p>',
            '<p>v_res := \'1\';</p>',
            '<p>END IF;</p>'            
        );
        var TplValidNotNull = new Ext.XTemplate(
            '<p>IF',
            '<tpl for=".">',
                '<tpl for="data">',
                    '<tpl if="REQUERIDO == \'N\'">',
                               ' p_{[values.COLUMNA.toLowerCase()]} IS NULL  OR',
                      '</tpl>',
                '</tpl>',
             '</tpl>',
             '<p>THEN</p>',
            '<p>v_res := \'Faltan parametros.\';</p>',
            '<p>END IF;</p>'
        );
        var mainModifTpl = new Ext.XTemplate(
            '<p> CREATE OR REPLACE PROCEDURE TRAILER1.P_EE_MODIF_'+me.tabla+'(</p>',
            '{[this.renderDeclararCamposModif(values)]}',
            '{[this.renderDeclararVariablesMod(values)]}',
            '<p></p>',
            '{[this.renderNotNull(values)]}',
            '<p></p>',
            '{[this.renderInsertSQL(values)]}',
            '<p> p_res := v_res;</p>',
            '<p>EXCEPTION</p>',
            '<p> WHEN OTHERS THEN</p>',
            '<p> ROLLBACK;</p>',
            '<p> v_errC:=substr(sqlcode,1,20);</p>',
            '<p>v_errD:=substr(sqlerrm,1,200);</p>',
            '<p> p_ee_grabar_error_bd(v_errC,v_errD,\'P_EE_ALTA_'+me.tabla+'\',\'P_EE_ALTA_'+me.tabla+'\',\'-\',\'-\',v_id_log);</p>',
            '<p>  p_res :=\'ERROR. Avise a TI. LOG generado #\' || v_id_log;</p>',
            '<p> END;</p>',
            {
                esLista: function(COMENTARIO) {
                    return COMENTARIO.search('lista') != -1;
                },
                renderDeclararCamposModif : function(values){
                    return TplDeclararCamposM.apply(values);
                },
                renderDeclararVariablesMod : function(values){
                    return TplDefinirVariablesMod.apply(values);
                },
                renderNotNull : function(values){
                    return TplValidNotNull.apply(values);
                },
                renderInsertSQL : function(values){
                    return TplInsertSql.apply(values);
                }
            }
        );
        mainModifTpl.overwrite(me.panelSpModif.body, records);
            
    },
    Generar : function(e){
        var me = this;
        me.tabla = me.txt_tabla.getValue();
        if(me.txt_tabla.getValue()!= null){
            me.store.load({ params : { condicion : me.txt_tabla.getValue()}});
//                      load({ params: { codigo: 'EQUIPO', condicion: this.data.get('ID_TRANSF')} });
        }
//        alert(e);
    }
});
