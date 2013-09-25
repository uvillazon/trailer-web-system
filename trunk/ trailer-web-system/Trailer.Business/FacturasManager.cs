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
    public class FacturasManager : Repository<EE_FACTURAS>
    {


        public FacturasManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_FACTURAS> GetAllFacturas(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_FACTURAS> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start,info.sort,info.dir);
                Total = Query().Count();
               
            }
            else{
                result = from c in context.EE_FACTURAS
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
                             where p.EMITIDO_POR.Contains(info.search) || p.NRO_FACTURA1.Contains(info.search) || p.OPS.Contains(info.search) || p.EMPRESA.Contains(info.search) || p.CLIENTE.Contains(info.search) || p.NRO_RECIBOS.Contains(info.search) 
                             select p;
                }
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start,info.sort,info.dir);
               
            }
            var resultado = new DataPaged<EE_FACTURAS>()
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
