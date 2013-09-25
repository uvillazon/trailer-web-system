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
    public class IngresosManager : Repository<EE_INGRESOS>
    {


        public IngresosManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_INGRESOS> GetAllIngresos(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_INGRESOS> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start, info.sort, info.dir);
                Total = Query().Count();

            }
            else
            {
                if (Codigo == "COMPRASPROVEEDORDEUDA")
                {
                    int id = Convert.ToInt32(info.search);
                    result = from p in context.EE_INGRESOS
                             where p.ID_PROVEEDOR == id && p.TIPO_INGRESO=="CREDITO" && p.TOTAL_ADEUDADO != 0
                             select p;
                    Total = result.Count();
                    result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);
                }
                else
                {
                    //var nro_ing = Convert.ToInt32(info.search);
                    result = from p in context.EE_INGRESOS
                             where p.PROVEEDOR.Contains(info.search) || p.RESPONSABLE.Contains(info.search) || p.DOCUMENTO.Contains(info.search) ||p.NRO_ORDEN.Contains(info.search)
                             select p;
                    Total = result.Count();
                    result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);
                }
            }
            var resultado = new DataPaged<EE_INGRESOS>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;

        }
        public EE_INGRESOS GetIngresoById(int ID_INGRESO)
        {
            var context = (Entities)Context;
            var result = (from t in context.EE_INGRESOS
                          where t.ID_INGRESO == ID_INGRESO
                          select t).FirstOrDefault(); ;
            return result;
        }
        public DataPaged<EE_DETALLES_INGRESO> GetAllDetallesIngreso(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_DETALLES_INGRESO> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = from c in context.EE_DETALLES_INGRESO
                         select c;
                Total = result.Count();

            }
            else
            {
                if (Codigo == "INGRESO")
                {
                    var nro_ing = Convert.ToInt32(info.search);
                    result = from p in context.EE_DETALLES_INGRESO
                             where p.ID_INGRESO == nro_ing
                             select p;
                    Total = result.Count();
                }
                else
                {
                    var idmateria = Convert.ToInt32(info.search);
                    result = from p in context.EE_DETALLES_INGRESO
                             where p.ID_MATERIA_PRIMA == idmateria
                             select p;
                    Total = result.Count();

                }



            }
            var resultado = new DataPaged<EE_DETALLES_INGRESO>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;

        }

        public string CrearDetallesIngreso(string Detalles, int ID_INGRESO)
        {
            try
            {
                var obj = JsonConvert.DeserializeObject<List<EE_DETALLES_INGRESO>>(Detalles);
                var context = (Entities)Context;
                foreach (var item in obj)
                {
                    if (item.ID_DETALLE_INGRESO == 0)
                    {
                        
                        var v_resp = new ObjectParameter("p_res", typeof(Int32));
                        var result = context.P_EE_SECUENCIA("D_ING", v_resp);
                        var data = v_resp.Value.ToString();
                        var id_detalle = Convert.ToInt32(data);
                        item.ID_DETALLE_INGRESO = id_detalle;
                        item.ID_INGRESO = ID_INGRESO;
                        item.TOTAL = item.CANTIDAD * item.COSTO;
                        item.FECHA_REG = DateTime.Now;
                        context.EE_DETALLES_INGRESO.AddObject(item);
                        //this.Add(item);
                    }
                    else
                    {
                        var current = (from p in context.EE_DETALLES_INGRESO
                                       where p.ID_DETALLE_INGRESO == item.ID_DETALLE_INGRESO
                                       select p).FirstOrDefault();
                        if (current != null)
                        {
                            current.COSTO = item.COSTO;
                            current.TOTAL = item.COSTO * item.CANTIDAD;
                            current.CANTIDAD = item.CANTIDAD;
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
