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
    public class ResponsablesManager : Repository<EE_RESPONSABLES>
    {


        public ResponsablesManager(IUnitOfWork uow) : base(uow) { }



        public DataPaged<EE_RESPONSABLES> GetAllResponsables(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_RESPONSABLES> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start, info.sort, info.dir);
                Total = result.Count();

            }
            else
            {
                int id = Convert.ToInt32(info.search);
                result = from p in context.EE_RESPONSABLES
                         where p.ID_EMPRESA == id
                         select p;
                Total = result.Count();

                result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);

            }
            var resultado = new DataPaged<EE_RESPONSABLES>()
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
