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
using Trailer.WebSite.Infrastructure;
using System.IO;

namespace Trailer.WebSite.Controllers
{
    public class ImagenController : Controller
    {
        //
        // GET: /Imagen/

        public ActionResult Index()
        {
            return View();
        }

        List<Imagen> listasEmergentes = new List<Imagen>();
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllImagen(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null,int ID =0)
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
            var service = new ImagenesService();
            var jsondata = service.GetAllImagenes(filter, codigo,ID);
            DataPaged<Imagen> paged = null;
            if (jsondata.Rows.Count > 0)
            {
                var lista = RenderImagen(jsondata.Rows);
                paged = new DataPaged<Imagen>() { Rows = lista, Total = lista.Count };

            }
            else
            {
                paged = new DataPaged<Imagen>() { Rows = null, Total = 0 };

            }

            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(paged) + ");";
            return JavaScript(callback1);

        }
        private List<Imagen> RenderImagen(IList<EE_IMAGENES> result)
        {
            if (result.Count() <= 0)
            {
                return null;
            }
            else
            {
                List<Imagen> list = new List<Imagen>();
                foreach (var c in result)
                {

                    Imagen equiposelemento = new Imagen()
                    {
                        ID = c.ID_IMAGEN,
                        NOMBRE_IMG = c.NOMBRE_IMG,
                        DESCRIPCION = c.DESCRIPCION,
                        TAMANO = Convert.ToInt32(c.TAMANO),
                        EXTENSION = c.EXTENSION,
                        FECHA_REG = c.FECHA_REG,
                        EQUIPO = c.TABLA,
                        ID_TABLA = c.ID_TABLA

                    };
                    list.Add(equiposelemento);
                }
                return list;
            }
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public FileContentResult GetImage(int id, int tamano)
        {
            using (var db = new Entities())
            {
                Imagen img = new Imagen();
                EE_IMAGENES staffvar = db.EE_IMAGENES.FirstOrDefault(p => p.ID_IMAGEN == id);
                if (staffvar != null)
                {
                    if (staffvar.EXTENSION != "application/pdf")
                    {
                        using (var input = new MemoryStream(staffvar.IMAGEN_T_REAL))
                        using (var output = new MemoryStream())
                        {
                            img.ResizeImage(input, output, tamano, tamano);
                            return File(output.ToArray(), staffvar.EXTENSION);
                        }
                    }
                    else
                    {
                        return null;
                    }

                }
                else
                {
                    return null;
                }
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Upload(EE_IMAGENES imagenes, int ID)
        {
            var context = new Entities();
            int idusuario = Convert.ToInt32(Session["ID_USR"]);
            HttpPostedFileBase postedFile = Request.Files["IMAGEN"];
            byte[] tempImage;
            JsonResult objResult = null;
            Imagen img = new Imagen();
            if (postedFile != null)
            {
                if (img.EsArchivoValido(postedFile))
                {

                    var fileName = Path.GetFileName(postedFile.FileName);
                    // var path = Path.Combine(Server.MapPath("~/App_Data/"), fileName);
                    tempImage = new byte[postedFile.ContentLength];
                    imagenes.IMAGEN_T_REAL = new byte[postedFile.ContentLength];
                    imagenes.EXTENSION = postedFile.ContentType;
                    imagenes.TAMANO = postedFile.ContentLength;
                    postedFile.InputStream.Read(tempImage, 0, postedFile.ContentLength);

                    var v_resp = new ObjectParameter("p_res", typeof(Int32));
                    var result = context.P_EE_SECUENCIA("IMG", v_resp);
                    var data = v_resp.Value.ToString();
                    imagenes.ID_TABLA = ID;
                    imagenes.NOMBRE_IMG = postedFile.FileName;
                    imagenes.ID_IMAGEN = Convert.ToInt32(data); ;
                    imagenes.IMAGEN_T_REAL = tempImage;
                    imagenes.FECHA_REG = DateTime.Now;
                    //aun no cuenta con login y usuario
                    imagenes.ID_USR = 0;
                    //postedFile.SaveAs(path);
                    context.EE_IMAGENES.AddObject(imagenes);
                    context.SaveChanges();
                    //context.p_EE_g
                    var v_resp1 = new ObjectParameter("p_res", typeof(Int32));
                    var data1 = context.P_EE_ACTUALIZAR_IMAGEN(imagenes.TABLA, ID, Convert.ToInt32(data), v_resp1);
                    var data2 = v_resp1.Value.ToString();
                    objResult = new JsonResult()
                    {
                        ContentType = "text/html",
                        Data = new { success = true, result = "Se guardo la Imegen o Archivo Con Exito" }
                    };
                }
                else
                {
                    objResult = new JsonResult()
                    {
                        ContentType = "text/html",
                        Data = new { success = true, result = "El Archivo No es Valido" }
                    };
                }


            }
            else
            {
                objResult = new JsonResult()
                {
                    ContentType = "text/html",
                    Data = new { success = false, error = "Ocurrio un Error" }
                };
            }

            return objResult;
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EliminarImagen(int ID, int ID_EQUIPO)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_EE_BORRAR_IMG(ID, ID_EQUIPO, v_resp);
                string valor = v_resp.Value.ToString();
                if (valor == "1")
                {
                    result.success = true;
                    result.msg = "Se Elimino Correctamente";
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

    }
}
