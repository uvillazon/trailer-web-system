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
    public class CortesManager : Repository<EE_CORTES>
    {


        public CortesManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_CORTES> GetAllCortes(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_CORTES> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start,info.sort,info.dir);
                Total = Query().Count();
               
            }
            else{
                result = from c in context.EE_CORTES
                         select c;
                if (Codigo == "ORDENPRODUCCION")
                {
                    int id = Convert.ToInt32(info.search);
                    result = from p in result
                             where p.ID_ORDEN_PRODUCCION == id
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
                             where p.RESPONSABLE.Contains(info.search) || p.DETALLE.Contains(info.search) || p.DETALLE_ITEM.Contains(info.search)||p.DETALLE_MATERIAL.Contains(info.search)||p.NRO_ORDEN.Contains(info.search)
                             select p;
                }
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start,info.sort,info.dir);
               
            }
            var resultado = new DataPaged<EE_CORTES>()
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
