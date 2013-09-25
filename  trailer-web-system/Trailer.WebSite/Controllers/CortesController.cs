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
using Newtonsoft.Json;
namespace Trailer.WebSite.Controllers
{
    public class CortesController : Controller
    {
        //
        // GET: /Clientes/


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllCortes(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
        {
            var filter = new PagingInfo
            {
                page = page,
                start = start,
                limit = limit,
                sort = sort,
                dir = dir,
                _dc = _dc,
                callback = callback,
                search = condicion

            };
            var service = new CortesService();
            var jsondata = service.GetAllCortes(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }
        #region sp para Cortes

        [HttpPost,ValidateInput(false)]
        public ActionResult CrearDetallesCorte(string detalles , int ID_ORDEN_PRODUCCION)
        {
            var result = new ErrorPaged();
            try
            {
                var obj = JsonConvert.DeserializeObject<List<EE_CORTES>>(detalles);

                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                //var data = context.P_EE_ALTA_BORDADO(c.ID_BORDADO, c.CANAL, c.KARDEX, c.DISENO, c.EMPRESA, c.DESCRIPCION, c.PUNTADA, c.ANCHO, c.ALTO, c.ORDEN_PRODUCCION, v_resp);
                foreach (var item in obj)
                {
                    context.P_EE_ALTA_CORTE(item.ID_CORTE, ID_ORDEN_PRODUCCION, item.ID_DETALLE_ORDEN, item.ID_MATERIA_PRIMA,item.ID_MOLDE, item.DETALLE_ITEM, item.TALLA, item.DETALLE_MATERIAL, item.NRO_MOLDE,item.DETALLE, item.TELA, item.HOJA, item.CANTIDAD, item.TOTAL_TELA, item.TOTAL_CANTIDAD,item.RESPONSABLE,v_resp);
                }
                string valor = v_resp.Value.ToString();
                if (valor == "1")
                {
                    result.success = true;
                    result.msg = "Se inserto Correctamente";
                    result.datos = valor;
                }
                else
                {
                    result.success = false;
                    result.msg = valor;
                }

            }
            catch (Exception ex)
            {
                result.success = false;

                result.msg = "Error Al ejecturase el Procedimiento " + ex;


            }
            return Json(result);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult GetAllPruebas(int ID) {
            var filter = new PagingInfo
            {
                page = 1,
                start = 1,
                limit = 1,
                sort = "ID_CORTE",
                dir = "ASC",
                _dc = 123123123123123,
                callback = "sdaasd",
                search = null

            };
            var service = new CortesService();
            var jsondata = service.GetAllCortes(filter, null);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = filter.callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EliminarCorte(int ID_CORTE)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_ELIMINAR_CORTE(ID_CORTE, v_resp);
                string valor = v_resp.Value.ToString();
                if (valor == "1")
                {
                    result.success = true;
                    result.msg = "Se Elimino Correctamente";
                    result.datos = valor;
                }
                else
                {
                    result.success = false;
                    result.msg = valor;
                }

            }
            catch (Exception ex)
            {
                result.success = false;
                result.msg = "Error Al ejecturase el Procedimiento " + ex;
            }
            return Json(result);
        }
        #endregion
    }
}
