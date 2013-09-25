using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using Trailer.Model;
using System.Data.Objects;

namespace Trailer.WebSite.Informes
{
    public partial class OrdenProduccionDetalles : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void ReportViewer1_SubreportProcessing(object sender, SubreportProcessingEventArgs e)
        {
            //DataSet dataSet = new DataSet();
            //dataSet.ReadXml(MapPath("Employee.xml"));
            int id = int.Parse(e.Parameters[0].Values[0]);
            var context = new Entities();

            var query = from c in context.EE_INGRESOS
                        join det in context.EE_DETALLES_INGRESO on c.ID_INGRESO equals det.ID_INGRESO
                        where c.ID_ORDEN_PRODUCCION == id
                        select det;
            
            var query1 = from c in context.EE_CORTES
                        where c.ID_ORDEN_PRODUCCION == id
                        select c;
            var query2 = from c in context.EE_DETALLES_SALIDA_OP
                        where c.ID_ORDEN_PRODUCCION == id
                        select c;
//            e.DataSources.Add(
//new
//ReportDataSource
//(
//"DataSetArticulos"
//,
//new
//ClaseLineas
//().Filtro(
//int
//.Parse(e.Parameters[0].Values[0])))); 
            ReportDataSource dataSource = new ReportDataSource("DataSet1", query);
            e.DataSources.Add(new ReportDataSource("DataSetCorte", query1));
            e.DataSources.Add(new ReportDataSource("DataSetSalida", query2));
            e.DataSources.Add(dataSource);
        }
        protected void ReportViewer1_SubreportProcessing2(object sender, SubreportProcessingEventArgs e)
        {
            //DataSet dataSet = new DataSet();
            //dataSet.ReadXml(MapPath("Employee.xml"));
            int id = int.Parse(e.Parameters[0].Values[0]);
            var context = new Entities();
            var query = from c in context.EE_CORTES
                        where c.ID_ORDEN_PRODUCCION == id
                        select c;
            //            e.DataSources.Add(
            //new
            //ReportDataSource
            //(
            //"DataSetArticulos"
            //,
            //new
            //ClaseLineas
            //().Filtro(
            //int
            //.Parse(e.Parameters[0].Values[0])))); 
            ReportDataSource dataSource = new ReportDataSource("DataSetCorte", query);
            e.DataSources.Add(dataSource);
        }

        public IEnumerable<ReportDataSource> listOfReportDataSource { get; set; }
    }
}