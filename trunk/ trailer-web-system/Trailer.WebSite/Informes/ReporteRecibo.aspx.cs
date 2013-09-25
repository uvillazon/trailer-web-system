using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using Trailer.Model;

namespace Trailer.WebSite.Informes
{
    public partial class ReporteRecibo : System.Web.UI.Page
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

            var query = from c in context.EE_RECIBOS
                        where c.ID_RECIBO == id
                        select c;

            var query1 = from c in context.EE_DETALLES_RECIBO
                         where c.ID_RECIBO == id
                         select c;
            ReportDataSource dataSource = new ReportDataSource("Recibo", query);
            e.DataSources.Add(new ReportDataSource("DetalleRecibo", query1));
            e.DataSources.Add(dataSource);
        }
    }
}