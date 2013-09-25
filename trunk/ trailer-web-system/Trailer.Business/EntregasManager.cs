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
    public class EntregasManager : Repository<EE_ENTREGAS>
    {


        public EntregasManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_ENTREGAS> GetAllEntregas(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_ENTREGAS> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start, info.sort, info.dir);
                Total = Query().Count();

            }
            else
            {
                if (Codigo == "CODIGO")
                {
                    result = from p in context.EE_ENTREGAS
                             where p.RESPONSABLE.Contains(info.search) || p.QUIEN_RECIBE.Contains(info.search)
                             select p;
                    Total = result.Count();
                    result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);
                }
                else if (Codigo == "ORDEN_PRODUCCION")
                {
                    var nro_ing = Convert.ToInt32(info.search);
                    result = from p in context.EE_ENTREGAS
                             where p.ID_ORDEN_PRODUCCION == nro_ing
                             select p;
                    Total = result.Count();
                    result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);
                }
                else
                {
                    result = QueryPaged(Query(), info.limit, info.start, info.sort, info.dir);
                    Total = Query().Count();
                }

            }
            var resultado = new DataPaged<EE_ENTREGAS>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;

        }
        public EE_ENTREGAS GetEntregaById(int ID_ENTREGA)
        {
            var context = (Entities)Context;
            var result = (from t in context.EE_ENTREGAS
                          where t.ID_ENTREGA == ID_ENTREGA
                          select t).FirstOrDefault(); ;
            return result;
        }
        public EE_DETALLES_ORDEN GetDetalleOrdenById(int ID_DETALLE_ORDEN)
        {
            var context = (Entities)Context;
            var result = (from t in context.EE_DETALLES_ORDEN
                          where t.ID_DETALLE_ORDEN == ID_DETALLE_ORDEN
                          select t).FirstOrDefault(); ;
            return result;
        }
        public EE_ORDENES_PRODUCCION GetOrdenProduccionById(int id)
        {
            var context = (Entities)Context;
            var result = (from t in context.EE_ORDENES_PRODUCCION
                          where t.ID_ORDEN_PRODUCCION == id
                          select t).FirstOrDefault(); ;
            return result;
        }
        public DataPaged<EE_DETALLES_ENTREGA> GetAllDetallesEntrega(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_DETALLES_ENTREGA> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = from c in context.EE_DETALLES_ENTREGA
                         select c;
                Total = result.Count();

            }
            else
            {
                if (Codigo == "ENTREGA")
                {
                    var nro_ing = Convert.ToInt32(info.search);
                    result = from p in context.EE_DETALLES_ENTREGA
                             where p.ID_ENTREGA == nro_ing
                             select p;
                    Total = result.Count();
                }
                else
                {
                    var identrega = Convert.ToInt32(info.search);
                    result = from p in context.EE_DETALLES_ENTREGA
                             where p.ID_ENTREGA == identrega
                             select p;
                    Total = result.Count();

                }



            }
            var resultado = new DataPaged<EE_DETALLES_ENTREGA>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;

        }

        public string ModificarDetalles(string Detalles, int ID_ENTREGA)
        {
            try
            {
                var obj = JsonConvert.DeserializeObject<List<EE_DETALLES_ENTREGA>>(Detalles);
                var context = (Entities)Context;
                foreach (var item in obj)
                {
                    if (item.ID_DETALLE_ENTREGA == 0)
                    {
                        
                        var v_resp = new ObjectParameter("p_res", typeof(Int32));
                        var result = context.P_EE_SECUENCIA("D_ENT", v_resp);
                        var data = v_resp.Value.ToString();
                        var id_detalle = Convert.ToInt32(data);
                        var detalle = GetDetalleOrdenById(Convert.ToInt32(item.ID_DETALLE_ORDEN));
                        if (detalle.CANTIDAD - detalle.CANTIDAD_ENTREGADA < item.CANTIDAD_ENTREGADA)
                        {
                            return "No puedo Entregar mas de "+detalle.CANTIDAD;
                            break;
                        }
                        else
                        {
                            item.ID_DETALLE_ENTREGA = id_detalle;
                            item.ID_ENTREGA = ID_ENTREGA;
                            item.CANTIDAD_ENTREGADA = item.CANTIDAD_ENTREGADA;
                            item.DETALLE_BORDADO = detalle.DETALLE_BORDADO;
                            item.DETALLE_COSTURA = detalle.DETALLE_COSTURA;
                            item.DETALLE_ITEM = detalle.DETALLE_ITEM;
                            item.ARTICULO = detalle.ARTICULO;
                            item.TELA = detalle.TELA;
                            item.FECHA_REG = DateTime.Now;
                            context.EE_DETALLES_ENTREGA.AddObject(item);
                            detalle.CANTIDAD_ENTREGADA = detalle.CANTIDAD_ENTREGADA + item.CANTIDAD_ENTREGADA;
                            context.SaveChanges();
                        }
                        //this.Add(item);
                    }
                    else
                    {
                        var current = (from p in context.EE_DETALLES_ENTREGA
                                       where p.ID_DETALLE_ENTREGA == item.ID_DETALLE_ENTREGA
                                       select p).FirstOrDefault();
                        if (current != null)
                        {

                            var detalle = GetDetalleOrdenById(Convert.ToInt32(item.ID_DETALLE_ORDEN));
                            if (detalle.CANTIDAD - detalle.CANTIDAD_ENTREGADA < item.CANTIDAD_ENTREGADA - current.CANTIDAD_ENTREGADA)
                            {
                                return "No puedo Entregar mas de " + detalle.CANTIDAD;
                              
                            }
                            else
                            {

                                current.CANTIDAD_ENTREGADA = item.CANTIDAD_ENTREGADA;
                                
                                context.SaveChanges();
                            }
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
