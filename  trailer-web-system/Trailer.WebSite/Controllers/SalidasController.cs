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
    public class SalidasController : Controller
    {
        //
        // GET: /Clientes/


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllSalidas(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
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
            var service = new SalidasService();
            var jsondata = service.GetAllSalidas(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllDetallesSalida(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
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
            var service = new SalidasService();
            var jsondata = service.GetAllDetallesSalida(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }
        #region sp para Ingresos
        
        
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult CrearSalida(EE_SALIDAS c)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                DateTime date = (DateTime)c.FECHA_SALIDA;
                date = date.Add(DateTime.Now.TimeOfDay);
                //var data = context.P_EE_ALTA_INGRESO(c.ID_INGRESO, c.PROVEEDOR, c.RESPONSABLE, c.DOCUMENTO, c.NRO_DOCUMENTO, c.CARACTERISTICA, c.ESTADO, date, v_resp);
                var data = context.P_EE_ALTA_SALIDA(c.ID_SALIDA, c.NRO_SALIDA, c.ID_ORDEN_PRODUCCION, c.NRO_ORDEN, c.RESPONSABLE, c.OBSERVACION, c.ESTADO, date, v_resp);
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
        public ActionResult EliminarSalida(int ID_SALIDA)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_ELIMINAR_SALIDA(ID_SALIDA, v_resp);
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
        public ActionResult EliminarDetalleSalida(int ID_DETALLE_SALIDA)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_ELIMINAR_DETALLE_SALIDA(ID_DETALLE_SALIDA, v_resp);
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
        public ActionResult ContabilidadSalida(int ID_SALIDA)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_CONTABILIDAD_SALIDA(ID_SALIDA, v_resp);
                string valor = v_resp.Value.ToString();
                if (valor == "1")
                {
                    result.success = true;
                    result.msg = "Se Contabilizo Exitosamente";
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
        public ActionResult DescontabilidadSalida(int ID_SALIDA)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_DESCONTABILIDAD_SALIDA(ID_SALIDA, v_resp);
                string valor = v_resp.Value.ToString();
                if (valor == "1")
                {
                    result.success = true;
                    result.msg = "Se DesContabilizo Exitosamente";
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
        public ActionResult CrearDetallesSalida(string Detalles,int ID_SALIDA)
        {
            var service = new SalidasService();

            var result = service.CrearDetallesSalida(Detalles, ID_SALIDA);

            return Json(result);
        }
        #endregion
    }
}
