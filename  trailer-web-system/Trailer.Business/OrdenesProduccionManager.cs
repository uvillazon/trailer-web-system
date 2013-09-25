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
using Trailer.Business.Infrastructure;

namespace Trailer.Business
{
    public class OrdenesProduccionManager : Repository<EE_ORDENES_PRODUCCION>
    {
        public OrdenesProduccionManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_ORDENES_PRODUCCION> GetAllOrdenesProduccion(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_ORDENES_PRODUCCION> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                Total = Query().Count();
                result = QueryPaged(Query(), info.limit, info.start, info.sort, info.dir);

            }
            else
            {
                if (Codigo == "CODIGO")
                {
                    result = from p in context.EE_ORDENES_PRODUCCION
                             where p.TIPO_CLIENTE.Contains(info.search) || p.NRO_ORDEN1.Contains(info.search)
                             select p;
                }
                else if (Codigo == "RECIBO")
                {
                    result = from p in context.EE_ORDENES_PRODUCCION
                             where p.TIPO_CLIENTE.Contains(info.search) && p.TOTAL_POR_COBRAR > 0
                             select p;
                }
                else
                {
                    //var id = Convert.ToInt32(info.search);
                    result = from p in context.EE_ORDENES_PRODUCCION
                             where p.TIPO_CLIENTE.Contains(info.search) || p.NRO_ORDEN1.Contains(info.search)
                             select p;
                }
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);
            }
            var resultado = new DataPaged<EE_ORDENES_PRODUCCION>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;
        }
        public DataPaged<EE_DETALLES_ORDEN> GetAllDetallesOrden(PagingInfo info, string codigo)
        {
            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_DETALLES_ORDEN> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = from c in context.EE_DETALLES_ORDEN
                         select c;
                Total = result.Count();
                result = result.OrderBy(x => x.ID_DETALLE_ORDEN).Skip(info.start).Take(info.limit);

            }
            else
            {
                var id = Convert.ToInt32(info.search);
                result = from p in context.EE_DETALLES_ORDEN
                         where p.ID_ORDEN_PRODUCCION == id
                         select p;
                Total = result.Count();
            }
            var resultado = new DataPaged<EE_DETALLES_ORDEN>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;
        }

        public DataPaged<EE_HOJAS_CALCULO> GetAllHojasCalculo(PagingInfo info, string codigo)
        {
            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_HOJAS_CALCULO> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = from c in context.EE_HOJAS_CALCULO
                         select c;
                Total = result.Count();
                result = result.OrderBy(x => x.ID_HOJA).Skip(info.start).Take(info.limit);

            }
            else
            {
                var id = Convert.ToInt32(info.search);
                result = from p in context.EE_HOJAS_CALCULO
                         where p.ID_ORDEN_PRODUCCION == id
                         select p;
                Total = result.Count();
            }
            var resultado = new DataPaged<EE_HOJAS_CALCULO>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;
        }

        public string CrearDetallesOrden(EE_DETALLES_ORDEN orden, string tallas, int ID_ORDEN_PRODUCCION)
        {
            try
            {
                var obj = JsonConvert.DeserializeObject<List<Tallas>>(tallas);
                var context = (Entities)Context;
                decimal? total = 0;
                foreach (var item in obj)
                {
                    //if (item.ID_DETALLE_INGRESO == 0)
                    //{
                    var v_resp = new ObjectParameter("p_res", typeof(Int32));
                    var result = context.P_EE_SECUENCIA("D_ORD", v_resp);
                    var data = v_resp.Value.ToString();
                    var id_detalle = Convert.ToInt32(data);

                    EE_DETALLES_ORDEN detalle = new EE_DETALLES_ORDEN()
                    {
                        ID_DETALLE_ORDEN = id_detalle,
                        TELA = orden.TELA,
                        DETALLE_BORDADO = orden.DETALLE_BORDADO,
                        DETALLE_COSTURA = orden.DETALLE_COSTURA,
                        DETALLE_ITEM = orden.DETALLE_ITEM,
                        ESTADO = orden.ESTADO,
                        ID_ORDEN_PRODUCCION = ID_ORDEN_PRODUCCION,
                        ARTICULO = orden.ARTICULO,
                        TALLA = item.talla,
                        COLOR = orden.COLOR,
                        CANTIDAD = item.cantidad,
                        CANTIDAD_A_PRODUCIR = item.cantidad,
                        CANTIDAD_ENTREGADA = 0,
                        COSTO = 0,
                        TOTAL = 0,
                        TOTAL_A_CANCELAR = 0,
                        SASTRE = 0,
                        HILO = 0,
                        FECHA_REG = DateTime.Now

                    };
                    total = total + item.cantidad;
                    context.AddToEE_DETALLES_ORDEN(detalle);

                }
                var current1 = (from p in context.EE_ORDENES_PRODUCCION
                                where p.ID_ORDEN_PRODUCCION == ID_ORDEN_PRODUCCION
                                select p).FirstOrDefault();
                current1.CANTIDAD = total;
                current1.TOTAL_POR_COBRAR = total;
                //context.SaveChanges();
                var v_resp1 = new ObjectParameter("p_res", typeof(Int32));
                context.P_EE_ACTUALIZAR_CANTIDAD_OP(ID_ORDEN_PRODUCCION, v_resp1);
                return "Exito";

            }
            catch (Exception e)
            {

                return e.ToString();
            }
        }



        public string ModificarDetalles(string Detalles, int ID_ORDEN_PRODUCCION)
        {
            try
            {
                var obj = JsonConvert.DeserializeObject<List<EE_DETALLES_ORDEN>>(Detalles);
                var context = (Entities)Context;
                decimal? total = 0;
                decimal? totalbs = 0;
                var recibo = from d in context.EE_DETALLES_RECIBO
                             join r in context.EE_RECIBOS on d.ID_RECIBO equals r.ID_RECIBO
                             where r.ESTADO == "ALTA" && d.ID_ORDEN_PRODUCCION == ID_ORDEN_PRODUCCION
                             select d;
                if (recibo.Count() > 0)
                {
                    return "esta Op tienen Registros de Recibos .. Por Favor Anular los Registros de Recibo";
                }
                else
                {
                    foreach (var item in obj)
                    {
                        if (item.ID_DETALLE_ORDEN == 0)
                        {
                            return "Exito";
                        }
                        else
                        {
                            var current = (from p in context.EE_DETALLES_ORDEN
                                           where p.ID_DETALLE_ORDEN == item.ID_DETALLE_ORDEN
                                           select p).FirstOrDefault();
                            if (current != null)
                            {
                                current.COSTO = item.COSTO;
                                current.TOTAL = (item.COSTO * item.CANTIDAD);
                                current.TOTAL_A_CANCELAR = (item.COSTO * item.CANTIDAD);
                                current.CANTIDAD = item.CANTIDAD;
                                total = total + item.CANTIDAD;
                                totalbs = totalbs + (item.COSTO * item.CANTIDAD);

                            }
                        }
                    }

                    var current1 = (from p in context.EE_ORDENES_PRODUCCION
                                    where p.ID_ORDEN_PRODUCCION == ID_ORDEN_PRODUCCION
                                    select p).FirstOrDefault();
                    current1.CANTIDAD = total;
                    current1.TOTAL = totalbs;
                    context.SaveChanges();

                    var v_resp1 = new ObjectParameter("p_res", typeof(Int32));
                    context.P_EE_ACTUALIZAR_CANTIDAD_OP(ID_ORDEN_PRODUCCION, v_resp1);
                    return "Exito";
                }

            }
            catch (Exception e)
            {

                return e.ToString();
            }
        }

        public string EliminarDetalle(int ID_DETALLE_ORDEN)
        {
            try
            {
                var context = (Entities)Context;

                
                    var current = (from p in context.EE_DETALLES_ORDEN
                                   where p.ID_DETALLE_ORDEN == ID_DETALLE_ORDEN
                                   select p).FirstOrDefault();

                    if (current != null)
                    {
                        var recibo = from d in context.EE_DETALLES_RECIBO
                                     join r in context.EE_RECIBOS on d.ID_RECIBO equals r.ID_RECIBO
                                     where r.ESTADO == "ALTA" && d.ID_ORDEN_PRODUCCION == current.ID_ORDEN_PRODUCCION
                                     select d;
                        if (recibo.Count() > 0)
                        {
                            return "esta Op tienen Registros de Recibos .. Por Favor Anular los Registros de Recibo";
                        }
                        else
                        {
                            var current1 = (from p in context.EE_ORDENES_PRODUCCION
                                            where p.ID_ORDEN_PRODUCCION == current.ID_ORDEN_PRODUCCION
                                            select p).FirstOrDefault();
                            current1.CANTIDAD = current1.CANTIDAD - current.CANTIDAD;
                            current1.TOTAL = current1.TOTAL - (current.COSTO * current.CANTIDAD);

                            context.EE_DETALLES_ORDEN.DeleteObject(current);
                            context.SaveChanges();
                            var v_resp1 = new ObjectParameter("p_res", typeof(Int32));
                            context.P_EE_ACTUALIZAR_CANTIDAD_OP(current.ID_ORDEN_PRODUCCION, v_resp1);
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
