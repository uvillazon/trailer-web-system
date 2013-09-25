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
    public class RecibosManager : Repository<EE_RECIBOS>
    {


        public RecibosManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_RECIBOS> GetAllRecibos(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_RECIBOS> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start,info.sort,info.dir);
                Total = Query().Count();
               
            }
            else{
                result = from c in context.EE_RECIBOS
                         select c;
                if (Codigo == "ORDENPRODUCCION")
                {
                    //int id = Convert.ToInt32(info.search);
                    result = from p in result
                             where p.OPS.Contains(info.search)
                             select p;
                }
                
                else
                {
                    result = from p in result
                             where p.RECIBIDO_POR.Contains(info.search) || p.DESCRIPCION.Contains(info.search) || p.NRO_RECIBO1.Contains(info.search) || p.OPS.Contains(info.search) || p.CLIENTE.Contains(info.search) || p.EMPRESA.Contains(info.search) || p.NRO_CHEQUE.Contains(info.search) || p.BANCO.Contains(info.search)
                             select p;
                }
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start,info.sort,info.dir);
               
            }
            var resultado = new DataPaged<EE_RECIBOS>()
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
