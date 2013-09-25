using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Common;
using Trailer.Common.Data;
using Trailer.Model;
using Trailer.Common.Data.Interfaces;
using System.Data.Objects;

namespace Trailer.Business
{
    public class DetallesSalidaManager : Repository<EE_DETALLES_SALIDA_OP>
    {


        public DetallesSalidaManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_DETALLES_SALIDA_OP> GetAllDetallesSalida(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_DETALLES_SALIDA_OP> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start,info.sort,info.dir);
                Total = Query().Count();
               
            }
            else{
                result = from c in context.EE_DETALLES_SALIDA_OP
                         select c;
                if (Codigo == "ORDENPRODUCCION")
                {
                    int id = Convert.ToInt32(info.search);
                    result = from p in result
                             where p.ID_ORDEN_PRODUCCION == id
                             select p;
                }
                else if (Codigo == "SALIDA")
                {
                    int id = Convert.ToInt32(info.search);
                    result = from p in result
                             where p.ID_SALIDA == id
                             select p;
                }
                else if (Codigo == "ITEMORDENPRODUCCION")
                {
                    int id = Convert.ToInt32(info.search);
                    result = from p in result
                             where p.ID_DETALLE_ORDEN == id
                             select p;
                }
                else if (Codigo == "MATERIALES")
                {
                    int id = Convert.ToInt32(info.search);
                    result = from p in result
                             where p.ID_MATERIA_PRIMA == id
                             select p;
                }
                else
                {
                    result = from p in result
                             where p.RESPONSABLE.Contains(info.search) || p.DETALLE.Contains(info.search) || p.DETALLE_ITEM.Contains(info.search) || p.DETALLE_MATERIAL.Contains(info.search) || p.NRO_ORDEN.Contains(info.search)
                             select p;
                }
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start,info.sort,info.dir);
               
            }
            var resultado = new DataPaged<EE_DETALLES_SALIDA_OP>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;

        }
    }
}
