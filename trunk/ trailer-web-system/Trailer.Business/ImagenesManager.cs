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
    public class ImagenesManager : Repository<EE_IMAGENES>
    {


        public ImagenesManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_IMAGENES> GetAllImagenes(PagingInfo info, string Codigo,int ID)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_IMAGENES> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                Total = Query().Count();
                result = QueryPaged(Query(), info.limit, info.start, info.sort, info.dir);
                //Total = result.Count();

            }
            else
            {
                result = from c in Query()
                         select c;
                if (Codigo == "EQUIPO")
                {
                    result = from p in result
                             where p.TABLA == info.search
                             select p;

                   
                }
                if (ID != 0)
                {
                    result = from p in result
                             where p.ID_TABLA == ID
                             select p;
                }
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);

            }
            var resultado = new DataPaged<EE_IMAGENES>()
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
