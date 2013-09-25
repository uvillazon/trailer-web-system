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
    public class EmpleadosManager : Repository<EE_EMPLEADOS>
    {


        public EmpleadosManager(IUnitOfWork uow) : base(uow) { }



        public DataPaged<EE_EMPLEADOS> GetAllEmpleados(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_EMPLEADOS> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start,info.sort,info.dir);
                Total = Query().Count();
               
            }
            else{
                result = from p in context.EE_EMPLEADOS
                             where p.NOMBRE.Contains(info.search)||p.APELLIDO.Contains(info.search)||p.CIUDAD.Contains(info.search)
                             select p;
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start,info.sort,info.dir);
               
            }
            var resultado = new DataPaged<EE_EMPLEADOS>()
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
