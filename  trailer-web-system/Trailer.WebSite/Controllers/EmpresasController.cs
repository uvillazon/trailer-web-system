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
    public class EmpleadosController : Controller
    {
        //
        // GET: /Clientes/


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllEmpleados(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
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
            var service = new EmpleadosService();
            var jsondata = service.GetAllEmpleados(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }
        #region sp para Empresas
        
        
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult CrearEmpleado(EE_EMPLEADOS c)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_ALTA_EMPLEADO(c.ID_EMPLEADO, c.NOMBRE, c.APELLIDO, c.DIRECCION, c.TELEFONO, c.CI, c.EMAIL, c.DESCRIPCION, c.CIUDAD, c.CARGO, v_resp);
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
        public ActionResult EliminarEmpleado(int ID_EMPLEADO)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_ELIMINAR_EMPLEADO(ID_EMPLEADO, v_resp);
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
