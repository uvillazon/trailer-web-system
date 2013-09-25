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
    public class MateriasPrimaManager : Repository<EE_MATERIAS_PRIMA>
    {


        public MateriasPrimaManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_MATERIAS_PRIMA> GetAllMateriasPrima(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_MATERIAS_PRIMA> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start,info.sort,info.dir);
                Total = Query().Count();
               
            }
            else{
                result = from c in context.EE_MATERIAS_PRIMA
                         select c;
                if (Codigo == "TELA")
                {
                    result = from c in result
                             where c.CATEGORIA == "TELA" && (c.NOMBRE.Contains(info.search)|| c.COLOR.Contains(info.search))
                             select c;
                }
                else
                {

                    result = from p in result
                             where p.NOMBRE.Contains(info.search) || p.CODIGO.Contains(info.search) || p.CALIDAD.Contains(info.search) || p.CATEGORIA.Contains(info.search) || p.COLOR.Contains(info.search)
                             select p;
                }
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start,info.sort,info.dir);
               
            }
            var resultado = new DataPaged<EE_MATERIAS_PRIMA>()
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
