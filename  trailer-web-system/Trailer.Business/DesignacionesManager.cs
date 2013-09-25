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
    public class DesignacionesManager : Repository<EE_DESIGNACIONES>
    {


        public DesignacionesManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_DESIGNACIONES> GetAllDesignaciones(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_DESIGNACIONES> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start,info.sort,info.dir);
                Total = Query().Count();
               
            }
            else{
                result = from c in context.EE_DESIGNACIONES
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
                else if (Codigo == "OPERARIO")
                {
                    int id = Convert.ToInt32(info.search);
                    result = from p in result
                             where p.ID_EMPLEADO == id
                             select p;
                }
                else
                {
                    result = from p in result
                             where p.RESPONSABLE.Contains(info.search) || p.OPERARIO.Contains(info.search) || p.DETALLE_ITEM.Contains(info.search)||p.OBSERVACION.Contains(info.search)||p.NRO_ORDEN.Contains(info.search)
                             select p;
                }
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start,info.sort,info.dir);
               
            }
            var resultado = new DataPaged<EE_DESIGNACIONES>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;

        }
        public DataPaged<EE_DETALLES_DES_MAT> GetAllMateriales(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_DETALLES_DES_MAT> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = from c in context.EE_DETALLES_DES_MAT
                         select c;
                Total = result.Count();

            }
            else
            {
                result = from c in context.EE_DETALLES_DES_MAT
                         select c;
                if (Codigo == "DESIGNACION")
                {
                    int id = Convert.ToInt32(info.search);
                    result = from p in result
                             where p.ID_DESIGNACION == id
                             select p;
                }
                else if (Codigo == "OPERARIO")
                {
                    //int id = Convert.ToInt32(info.search);
                    //result = from p in result
                             
                    //         where p.ID_DESIGNACION == id
                    //         select p;
                }
                else
                {
                    result = from p in result
                             where p.RESPONSABLE.Contains(info.search) || p.DETALLE.Contains(info.search)|| p.OBSERVACION.Contains(info.search)
                             select p;
                }
                Total = result.Count();
                //result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);

            }
            var resultado = new DataPaged<EE_DETALLES_DES_MAT>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;

        }
        public DataPaged<EE_DETALLES_DES_ENTREGADO> GetAllEntregados(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_DETALLES_DES_ENTREGADO> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = from c in context.EE_DETALLES_DES_ENTREGADO
                         select c;
                Total = result.Count();

            }
            else
            {
                result = from c in context.EE_DETALLES_DES_ENTREGADO
                         select c;
                if (Codigo == "DESIGNACION")
                {
                    int id = Convert.ToInt32(info.search);
                    result = from p in result
                             where p.ID_DESIGNACION == id
                             select p;
                }
                else if (Codigo == "OPERARIO")
                {
                    //int id = Convert.ToInt32(info.search);
                    //result = from p in result

                    //         where p.ID_DESIGNACION == id
                    //         select p;
                }
                else
                {
                    result = from p in result
                             where p.RESPONSABLE.Contains(info.search) || p.OBSERVACION.Contains(info.search)
                             select p;
                }
                Total = result.Count();
                //result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);

            }
            var resultado = new DataPaged<EE_DETALLES_DES_ENTREGADO>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;

        }
        public DataPaged<EE_DETALLES_DES_CANCELADO> GetAllCancelados(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_DETALLES_DES_CANCELADO> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = from c in context.EE_DETALLES_DES_CANCELADO
                         select c;
                Total = result.Count();

            }
            else
            {
                result = from c in context.EE_DETALLES_DES_CANCELADO
                         select c;
                if (Codigo == "DESIGNACION")
                {
                    int id = Convert.ToInt32(info.search);
                    result = from p in result
                             where p.ID_DESIGNACION == id
                             select p;
                }
                else if (Codigo == "OPERARIO")
                {
                    //int id = Convert.ToInt32(info.search);
                    //result = from p in result

                    //         where p.ID_DESIGNACION == id
                    //         select p;
                }
                else
                {
                    result = from p in result
                             where p.RESPONSABLE.Contains(info.search) || p.OBSERVACION.Contains(info.search)
                             select p;
                }
                Total = result.Count();
                //result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);

            }
            var resultado = new DataPaged<EE_DETALLES_DES_CANCELADO>()
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
