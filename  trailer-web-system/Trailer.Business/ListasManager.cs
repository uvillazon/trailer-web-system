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
    public class ListasManager : Repository<EE_LISTAS>
    {


        public ListasManager(IUnitOfWork uow) : base(uow) { }



        public DataPaged<EE_LISTAS> GetAllListas(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_LISTAS> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start,info.sort,info.dir);
                Total = result.Count();
               
            }
            else{
                result = from p in context.EE_LISTAS
                             where p.TIPO_LISTA.Contains(info.search) || p.DESCRIPCION.Contains(info.search)
                             select p;
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start,info.sort,info.dir);
               
            }
            var resultado = new DataPaged<EE_LISTAS>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;

        }
        public DataPaged<EE_LISTAS_ADM> GetAllListasRel(PagingInfo info, string codigo)
        {
            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_LISTAS_ADM> result = null;
            int Total = 0;
            if (info.search == null)
            {
                result = from c in context.EE_LISTAS_ADM
                             select c;
                Total = result.Count();
                
            }
            else
            {
               
                    result = from p in context.EE_LISTAS_ADM
                                 where (p.LISTA == (info.search)) && p.ESTADO == "A"
                                 select p;
                    Total = result.Count();
                
            }
            var resultado = new DataPaged<EE_LISTAS_ADM>()
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
