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
    public class RecibosController : Controller
    {
        //
        // GET: /Clientes/


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllRecibos(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
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
            var service = new RecibosService();
            var jsondata = service.GetAllRecibos(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }
        #region sp para Recibos

        [HttpPost,ValidateInput(false)]
        public ActionResult CrearRecibo(string detalles , EE_RECIBOS c , string NRO_ORDEN)
        {
            var context = new Entities();
            var result = new ErrorPaged();
            var v_resp = new ObjectParameter("p_res", typeof(Int32));

            context.P_EE_ALTA_RECIBO(c.ID_CLIENTE, c.ID_EMPRESA, c.CLIENTE, c.EMPRESA,c.ENTREGADO, c.FECHA, c.MONTO, c.NRO_CHEQUE, c.BANCO, c.TIPO,c.DEPOSITO,c.DESCRIPCION, c.RECIBIDO_POR, v_resp);
            int id_salida;
            bool esNumero = int.TryParse(v_resp.Value.ToString(), out id_salida);
            if (esNumero)
            {
                try
                {
                    var obj = JsonConvert.DeserializeObject<List<EE_DETALLES_RECIBO>>(detalles);


                    int idusuario = Convert.ToInt32(Session["ID_USR"]);
                    string valor = "Error";
                    //var data = context.P_EE_ALTA_BORDADO(c.ID_BORDADO, c.CANAL, c.KARDEX, c.DISENO, c.EMPRESA, c.DESCRIPCION, c.PUNTADA, c.ANCHO, c.ALTO, c.ORDEN_PRODUCCION, v_resp);
                    foreach (var item in obj)
                    {
                        context.P_EE_ALTA_DETALLE_RECIBO(id_salida, item.ID_ORDEN_PRODUCCION, item.A_CUENTA, 0, v_resp);
                        valor = v_resp.Value.ToString();
                        if (valor != "1")
                        {
                            break;
                        }
                    }
                   
                    if (valor == "1")
                    {
                        result.success = true;
                        result.msg = "Se inserto Correctamente";
                        result.datos = id_salida.ToString();
                    }
                    else
                    {
                        var query = from r in context.EE_RECIBOS
                                    where r.ID_RECIBO == id_salida
                                    select r;
                        context.EE_RECIBOS.DeleteObject(query.FirstOrDefault());
                        context.SaveChanges();
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

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EliminarRecibo(int ID_RECIBO)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_ANULAR_RECIBO(ID_RECIBO, v_resp);
                string valor = v_resp.Value.ToString();
                if (valor == "1")
                {
                    result.success = true;
                    result.msg = "Se Anulo Correctamente";
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
