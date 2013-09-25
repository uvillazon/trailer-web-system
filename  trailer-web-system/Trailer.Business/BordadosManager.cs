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
    public class BordadosManager : Repository<EE_BORDADOS>
    {


        public BordadosManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_BORDADOS> GetAllBordados(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_BORDADOS> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start,info.sort,info.dir);
                Total = Query().Count();
               
            }
            else{
                if (Codigo == "EMPRESA")
                {
                    //int id = Convert.ToInt32(info.search);
                    result = from p in context.EE_BORDADOS
                             where p.EMPRESA == info.search
                             select p;
                }
                else
                {
                    result = from p in context.EE_BORDADOS
                             where p.DISENO.Contains(info.search) || p.EMPRESA.Contains(info.search) || p.KARDEX.Contains(info.search)
                             select p;
                }
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start,info.sort,info.dir);
               
            }
            var resultado = new DataPaged<EE_BORDADOS>()
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
