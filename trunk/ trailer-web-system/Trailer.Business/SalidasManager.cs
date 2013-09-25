using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Common;
using Trailer.Common.Data;
using Trailer.Model;
using Trailer.Common.Data.Interfaces;
using System.Data.Objects;
using Newtonsoft.Json;

namespace Trailer.Business
{
    public class SalidasManager : Repository<EE_SALIDAS>
    {


        public SalidasManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_SALIDAS> GetAllSalidas(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_SALIDAS> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start, info.sort, info.dir);
                Total = Query().Count();

            }
            else
            {
                if (Codigo == "OP")
                {
                    
                    var nro_ing = Convert.ToInt32(info.search);
                    result = from p in context.EE_SALIDAS
                             where p.ID_ORDEN_PRODUCCION == nro_ing
                             select p;
                    
                    Total = result.Count();
                    result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);
               
                }
                else
                {
                    //var nro_salida = Convert.ToInt32(info.search);
                    result = from p in context.EE_SALIDAS
                             where p.RESPONSABLE.Contains(info.search) ||  p.NRO_ORDEN.Contains(info.search)
                             select p;
                    Total = result.Count();
                    result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);
                }
            }
            var resultado = new DataPaged<EE_SALIDAS>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;

        }
        public EE_SALIDAS GetSalidaById(int ID_SALIDA)
        {
            var context = (Entities)Context;
            var result = (from t in context.EE_SALIDAS
                          where t.ID_SALIDA == ID_SALIDA
                          select t).FirstOrDefault(); ;
            return result;
        }
        public DataPaged<EE_DETALLES_SALIDA> GetAllDetallesSalida(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_DETALLES_SALIDA> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = from c in context.EE_DETALLES_SALIDA
                         select c;
                Total = result.Count();

            }
            else
            {
                if (Codigo == "SALIDA")
                {
                    var nro_ing = Convert.ToInt32(info.search);
                    result = from p in context.EE_DETALLES_SALIDA
                             where p.ID_SALIDA == nro_ing
                             select p;
                    Total = result.Count();
                }
                
                else
                {
                    var idmateria = Convert.ToInt32(info.search);
                    result = from p in context.EE_DETALLES_SALIDA
                             where p.ID_MATERIA_PRIMA == idmateria
                             select p;
                    Total = result.Count();

                }



            }
            var resultado = new DataPaged<EE_DETALLES_SALIDA>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;

        }

        public string CrearDetallesSalida(string Detalles, int ID_SALIDA)
        {
            try
            {
                var obj = JsonConvert.DeserializeObject<List<EE_DETALLES_SALIDA>>(Detalles);
                var context = (Entities)Context;
                foreach (var item in obj)
                {
                    if (item.ID_DETALLE_SALIDA == 0)
                    {
                        
                        var v_resp = new ObjectParameter("p_res", typeof(Int32));
                        var result = context.P_EE_SECUENCIA("D_SAL", v_resp);
                        var data = v_resp.Value.ToString();
                        var id_detalle = Convert.ToInt32(data);
                        item.ID_DETALLE_SALIDA = id_detalle;
                        item.ID_SALIDA = ID_SALIDA;
                        item.FECHA_REG = DateTime.Now;
                        context.EE_DETALLES_SALIDA.AddObject(item);
                        //this.Add(item);
                    }
                    else
                    {
                        var current = (from p in context.EE_DETALLES_SALIDA
                                       where p.ID_DETALLE_SALIDA == item.ID_DETALLE_SALIDA
                                       select p).FirstOrDefault();
                        if (current != null)
                        {
                            current.CANTIDAD = item.CANTIDAD;
                            current.OBSERVACION = item.OBSERVACION;
                            context.SaveChanges();
                        }

                    }
                }

                return "Exito";

            }
            catch (Exception e)
            {

                return e.ToString();
            }
        }
    }
}
