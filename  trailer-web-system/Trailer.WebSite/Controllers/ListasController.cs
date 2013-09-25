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
    public class ListasController : Controller
    {
        //
        // GET: /Listas/

        public ActionResult Index()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllListas(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
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
            var service = new ListasService();
            var jsondata = service.GetAllListas(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllListasRel(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
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
            var service = new ListasService();
            var jsondata = service.GetAllListasRel(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }

        #region sp de listas
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult CrearLista(EE_LISTAS c)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                if (c.ID_TABLA == 0)
                {
                    var data = context.P_EE_ALTA_TIPO_LISTA(c.TIPO_LISTA, c.DESCRIPCION, v_resp);
                  }
                else
                {
                    //var data = context.P_EE_MODIFICAR_CAPACITORES(c.ID_CAPACITOR, c.COD_CAPACITOR, c.MARCA, c.SERIE, c.MODELO, c.TIPO, c.FASE, c.POT_NOMINAL, c.TENS_NOMINAL, c.TENS_OPER, c.CAPACIDAD_IMPULSO, c.ANIO_FABR, c.PROPIEDAD, c.NOMBRE_PROP, idusuario, v_resp);
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

            //return null;
            return Json(result);

        }


        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult CrearListaRel(EE_LISTAS_ADM c)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_ALTA_LISTA(c.ID_TABLA, c.LISTA, c.CODIGO, c.VALOR, c.ESTADO, v_resp);
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
        public ActionResult EliminarListaRel( int ID_TABLA)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_ELIMINAR_LISTA(ID_TABLA, v_resp);
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
