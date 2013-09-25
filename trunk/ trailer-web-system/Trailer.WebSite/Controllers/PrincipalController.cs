using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Trailer.Common;
using Trailer.Services;
using System.Web.Script.Serialization;
using Trailer.Model;
using System.Data.Objects;

namespace Trailer.WebSite.Controllers
{
    public class PrincipalController : Controller
    {
        //
        // GET: /Principal/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GetAllTablas(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
        {

            var context = new Entities();

            var query = from c in context.V_TABLAS_COLUMNAS
                        where c.TABLA == condicion
                        select c;

            query = query.OrderBy(x => x.ID_TABLA);
            DataPaged<V_TABLAS_COLUMNAS> result = new DataPaged<V_TABLAS_COLUMNAS>()
            {
                Total = query.Count(),
                Rows = query.ToList()
            };

            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            //javaScriptSerializer.MaxJsonLength = 50000000;
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(result) + ");";
            return JavaScript(callback1);

        }

    }
    
}
