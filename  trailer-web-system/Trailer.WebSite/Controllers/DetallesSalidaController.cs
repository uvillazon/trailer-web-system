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
    public class DetallesSalidaController : Controller
    {
        //
        // GET: /Clientes/


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
            var service = new DetallesSalidaService();
            var jsondata = service.GetAllDetallesSalida(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }
        #region sp para DetallesSalida

        [HttpPost, ValidateInput(false)]
        public ActionResult CrearDetallesSalida(string detalles, EE_SALIDAS c)
        {
            var context = new Entities();
            var result = new ErrorPaged();
            var v_resp = new ObjectParameter("p_res", typeof(Int32));
            DateTime date = (DateTime)c.FECHA_SALIDA;
            date = date.Add(DateTime.Now.TimeOfDay);
            context.P_EE_ALTA_SALIDA(c.ID_SALIDA, c.NRO_SALIDA, c.ID_ORDEN_PRODUCCION, c.NRO_ORDEN, c.RESPONSABLE, c.OBSERVACION, "SIN CONTABILIZAR", date, v_resp);
            int id_salida;
            bool esNumero = int.TryParse(v_resp.Value.ToString(), out id_salida);
            if (esNumero)
            {
                try
                {
                    var obj = JsonConvert.DeserializeObject<List<EE_DETALLES_SALIDA_OP>>(detalles);


                    int idusuario = Convert.ToInt32(Session["ID_USR"]);

                    //var data = context.P_EE_ALTA_BORDADO(c.ID_BORDADO, c.CANAL, c.KARDEX, c.DISENO, c.EMPRESA, c.DESCRIPCION, c.PUNTADA, c.ANCHO, c.ALTO, c.ORDEN_PRODUCCION, v_resp);
                    foreach (var item in obj)
                    {
                        context.P_EE_ALTA_SALIDAS(item.ID_DETALLE, id_salida, c.ID_ORDEN_PRODUCCION, item.ID_DETALLE_ORDEN, item.ID_MATERIA_PRIMA, item.DETALLE_ITEM, item.TALLA, item.DETALLE_MATERIAL, item.DETALLE, item.UNIDAD, item.CANTIDAD, c.RESPONSABLE, c.FECHA_SALIDA, v_resp);
                        //context.P_EE_ALTA_CORTE(item.ID_CORTE, ID_ORDEN_PRODUCCION, item.ID_DETALLE_ORDEN, item.ID_MATERIA_PRIMA,item.ID_MOLDE, item.DETALLE_ITEM, item.TALLA, item.DETALLE_MATERIAL, item.NRO_MOLDE,item.DETALLE, item.TELA, item.HOJA, item.CANTIDAD, item.TOTAL_TELA, item.TOTAL_CANTIDAD,item.RESPONSABLE,v_resp);
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
            }
            else
            {
                result.success = false;

                result.msg = "Error Al ejecturase el Procedimiento ";
            }



            return Json(result);
        }
        [HttpPost, ValidateInput(false)]
        public ActionResult ActualizarDetallesSalida(string detalles, EE_SALIDAS c)
        {
            var context = new Entities();
            var result = new ErrorPaged();
            var v_resp = new ObjectParameter("p_res", typeof(Int32));
            try
            {
                var obj = JsonConvert.DeserializeObject<List<EE_DETALLES_SALIDA_OP>>(detalles);


                int idusuario = Convert.ToInt32(Session["ID_USR"]);

                //var data = context.P_EE_ALTA_BORDADO(c.ID_BORDADO, c.CANAL, c.KARDEX, c.DISENO, c.EMPRESA, c.DESCRIPCION, c.PUNTADA, c.ANCHO, c.ALTO, c.ORDEN_PRODUCCION, v_resp);
                foreach (var item in obj)
                {
                    context.P_EE_ALTA_SALIDAS(item.ID_DETALLE, c.ID_SALIDA, item.ID_ORDEN_PRODUCCION, item.ID_DETALLE_ORDEN, item.ID_MATERIA_PRIMA, item.DETALLE_ITEM, item.TALLA, item.DETALLE_MATERIAL, item.DETALLE, item.UNIDAD, item.CANTIDAD, item.RESPONSABLE, c.FECHA_SALIDA, v_resp);
                    //context.P_EE_ALTA_CORTE(item.ID_CORTE, ID_ORDEN_PRODUCCION, item.ID_DETALLE_ORDEN, item.ID_MATERIA_PRIMA,item.ID_MOLDE, item.DETALLE_ITEM, item.TALLA, item.DETALLE_MATERIAL, item.NRO_MOLDE,item.DETALLE, item.TELA, item.HOJA, item.CANTIDAD, item.TOTAL_TELA, item.TOTAL_CANTIDAD,item.RESPONSABLE,v_resp);
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
        public ActionResult EliminarDetalleSalida(int ID_DETALLE)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_ELIMINAR_DETALLE_SALIDA(ID_DETALLE, v_resp);
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
