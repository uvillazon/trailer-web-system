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
    public class ReportesManager : Repository<EE_MOVIMIENTOS_MATERIA>
    {


        public ReportesManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_MOVIMIENTOS_MATERIA> GetAllMovimientoMateriales(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_MOVIMIENTOS_MATERIA> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start,info.sort,info.dir);
                Total = result.Count();
               
            }
            else{
                result = from p in context.EE_MOVIMIENTOS_MATERIA
                             select p;
                if (Codigo == "MATERIA_PRIMA")
                {
                    int id = Convert.ToInt32(info.search);
                    result = from p in result
                             where p.ID_MATERIA_PRIMA == id
                             select p;
                    result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);
                    Total = result.Count();

                }
               
            }
            var resultado = new DataPaged<EE_MOVIMIENTOS_MATERIA>()
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
