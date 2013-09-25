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
    public class OrdenesProduccionController : Controller
    {
        //
        // GET: /Clientes/


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllOrdenesProduccion(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
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
            var service = new OrdenesProduccionService();
            var jsondata = service.GetAllOrdenesProduccion(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllDetallesOrden(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
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
            var service = new OrdenesProduccionService();
            var jsondata = service.GetAllDetallesOrden(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllHojasCalculo(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
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
            var service = new OrdenesProduccionService();
            var jsondata = service.GetAllHojasCalculo(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }
        
        #region sp para Bordados
        
        
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult CrearOrdenProduccion(EE_ORDENES_PRODUCCION c)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_ALTA_ORDEN_PRODUCCION(c.ID_ORDEN_PRODUCCION, c.NRO_ORDEN, c.CLIENTE, c.EMPRESA, c.RESPONSABLE, c.RESPONSABLE_RECEPCION, c.CANTIDAD, c.COSTO, c.TOTAL, c.FECHA_RECEPCION, c.FECHA_ENTREGA, c.OBSERVACION, v_resp);
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
        public ActionResult EliminarBordado(int ID_BORDADO)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_ELIMINAR_BORDADO(ID_BORDADO, v_resp);
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
        //ModificarDetallesOrden
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ModificarDetallesOrden(EE_DETALLES_ORDEN c)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                context.P_EE_ALTA_EE_DETALLES_ORDEN(c.ID_DETALLE_ORDEN, c.ID_ORDEN_PRODUCCION, c.ARTICULO, c.TELA, c.DETALLE_ITEM, c.DETALLE_BORDADO, c.DETALLE_COSTURA, c.ESTADO, c.CANTIDAD, c.CANTIDAD_ENTREGADA, c.TALLA, c.COSTO, c.TOTAL, c.FECHA_REG, c.COLOR, idusuario, v_resp);
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
        #endregion


        #region insertar con c#
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult CrearDetallesOrden(EE_DETALLES_ORDEN orden,string tallas, int ID_ORDEN_PRODUCCION)
        {
            var service = new OrdenesProduccionService();

            var result = service.CrearDetallesOrden(orden,tallas, ID_ORDEN_PRODUCCION);
            //IQueryable result = null;
            return Json(result);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ModificarDetalles(string Detalles, int ID_ORDEN_PRODUCCION)
        {
            var service = new OrdenesProduccionService();

            var result = service.ModificarDetalles(Detalles, ID_ORDEN_PRODUCCION);
            //IQueryable result = null;
            return Json(result);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EliminarDetalle(int ID_DETALLE_ORDEN)
        {
            var service = new OrdenesProduccionService();

            var result = service.EliminarDetalle(ID_DETALLE_ORDEN);
            //IQueryable result = null;
            return Json(result);
        }
        #endregion

    }
}
