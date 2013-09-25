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
    public class PagosCreditoManager : Repository<EE_PAGOS_CREDITO>
    {

        public PagosCreditoManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_PAGOS_CREDITO> GetAllPagosCredito(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_PAGOS_CREDITO> result = null;
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
                    result = from p in context.EE_PAGOS_CREDITO
                             where p.ID_PROVEEDOR == id && p.PROVEEDOR == "CREDITO"
                             select p;
                    Total = result.Count();
                    result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);
                }
                else
                {
                    var nro_ing = Convert.ToInt32(info.search);
                    result = from p in context.EE_PAGOS_CREDITO
                             where p.PROVEEDOR.Contains(info.search) || p.RESPONSABLE.Contains(info.search)
                             select p;
                    Total = result.Count();
                    result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);
                }
            }
            var resultado = new DataPaged<EE_PAGOS_CREDITO>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;

        }
        public EE_PAGOS_CREDITO GetIngresoById(int ID_INGRESO)
        {
            var context = (Entities)Context;
            var result = (from t in context.EE_PAGOS_CREDITO
                          where t.ID_PAGO_CREDITO == ID_INGRESO
                          select t).FirstOrDefault(); ;
            return result;
        }
        public DataPaged<EE_DETALLES_PAGO> GetAllDetallesPagoCredito(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_DETALLES_PAGO> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = from c in context.EE_DETALLES_PAGO
                         select c;
                Total = result.Count();

            }
            else
            {
                if (Codigo == "PAGOCREDITO")
                {
                    var nro_ing = Convert.ToInt32(info.search);
                    result = from p in context.EE_DETALLES_PAGO
                             where p.NRO_PAGO == nro_ing
                             select p;
                    Total = result.Count();
                }
                else
                {
                    var idmateria = Convert.ToInt32(info.search);
                    result = from p in context.EE_DETALLES_PAGO
                             where p.ID_INGRESO == idmateria
                             select p;
                    Total = result.Count();

                }



            }
            var resultado = new DataPaged<EE_DETALLES_PAGO>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;

        }

        public string CrearPagoCredito(EE_PAGOS_CREDITO c)
        {
            try
            {
                var context = (Entities)Context;

                if (c.ID_PAGO_CREDITO == 0)
                {
                    var v_resp = new ObjectParameter("p_res", typeof(Int32));
                    var result = context.P_EE_SECUENCIA("PAGO_CRE", v_resp);
                    var data = v_resp.Value.ToString();
                    c.ID_PAGO_CREDITO = Convert.ToInt32(data);
                    c.FECHA_REG = DateTime.Now;
                    context.EE_PAGOS_CREDITO.AddObject(c);
                    return data;
                    //this.Add(item);
                }
                else
                {
                    return "Exito";
                    var current = (from p in context.EE_PAGOS_CREDITO
                                   where p.ID_PAGO_CREDITO == c.ID_PAGO_CREDITO
                                   select p).FirstOrDefault();
                    if (current != null)
                    {
                        current.IMPORTE_TOTAL = c.IMPORTE_TOTAL;
                        current.FECHA_PAGO = c.FECHA_PAGO;
                        current.RESPONSABLE = c.RESPONSABLE;
                        current.OBSERVACION = c.OBSERVACION;
                        context.SaveChanges();
                    }

                }



            }
            catch (Exception e)
            {

                return e.ToString();
            }
        }
        public string CrearDetallesPagoCredito(string Detalles, int ID_PAGO)
        {
            try
            {
                var obj = JsonConvert.DeserializeObject<List<EE_DETALLES_PAGO>>(Detalles);
                var context = (Entities)Context;
                foreach (var item in obj)
                {
                    if (item.ID_DETALLE_PAGO == 0)
                    {

                        var v_resp = new ObjectParameter("p_res", typeof(Int32));
                        var result = context.P_EE_SECUENCIA("D_PAGO", v_resp);
                        var data = v_resp.Value.ToString();
                        var id_detalle = Convert.ToInt32(data);
                        item.ID_DETALLE_PAGO = id_detalle;
                        item.ID_PAGO_CREDITO = ID_PAGO;
                        item.FECHA_REG = DateTime.Now;
                        context.EE_DETALLES_PAGO.AddObject(item);
                        //this.Add(item);
                    }
                    else
                    {
                        var current = (from p in context.EE_DETALLES_PAGO
                                       where p.ID_DETALLE_PAGO == item.ID_DETALLE_PAGO
                                       select p).FirstOrDefault();
                        if (current != null)
                        {
                            current.COMENTARIO = item.COMENTARIO;
                            current.IMPORTE_TOTAL = item.IMPORTE_TOTAL;
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
