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
    public class EntregasController : Controller
    {
        //
        // GET: /Clientes/


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllEntregas(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
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
            var service = new EntregasService();
            var jsondata = service.GetAllEntregas(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllDetallesEntrega(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
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
            var service = new EntregasService();
            var jsondata = service.GetAllDetallesEntrega(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }
        #region sp para Entrega
        
        
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult CrearEntrega(EE_ENTREGAS c)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                DateTime date = (DateTime)c.FECHA_ENTREGA;
                date = date.Add(DateTime.Now.TimeOfDay);
                //var data = context.P_EE_ALTA_ENTREGA(c.od, c.PROVEEDOR, c.RESPONSABLE, c.DOCUMENTO, c.NRO_DOCUMENTO, c.CARACTERISTICA, c.ESTADO, date, v_resp);
                var data = context.P_EE_ALTA_ENTREGA(c.ID_ENTREGA, c.NRO_ENTREGA, c.ID_ORDEN_PRODUCCION, c.NRO_ORDEN, c.RESPONSABLE, c.QUIEN_RECIBE, c.OBSERVACION, c.FECHA_ENTREGA, v_resp);
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
        public ActionResult EliminarEntrega(int ID_ENTREGA)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_ELIMINAR_ENTREGA(ID_ENTREGA, v_resp);
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


        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EliminarDetalleEntrega(int ID_DETALLE_ENTREGA)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_ELIMINAR_DETALLE_ENTREGA(ID_DETALLE_ENTREGA, v_resp);
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

        #region insertar con c#
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ModificarDetalles(string Detalles, int ID_ENTREGA,int ID_ORDEN)
        {
            var service = new EntregasService();

            var result = service.ModificarDetalles(Detalles, ID_ENTREGA);
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_ACTUALIZAR_ENTREGA_OP(ID_ORDEN, v_resp);
            }
            catch (Exception)
            {
                
                result.msg = "Error";
                result.success = false;
            }
           

            return Json(result);
        }
        #endregion
    }
}
