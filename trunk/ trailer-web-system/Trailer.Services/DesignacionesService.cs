using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class DesignacionesService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_DESIGNACIONES> GetAllDesignaciones(PagingInfo info, string codigo)
        {

            DataPaged<EE_DESIGNACIONES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new DesignacionesManager(uow);
                result = manager.GetAllDesignaciones(info, codigo);
               
            });
            return result;
        }
        public DataPaged<EE_DETALLES_DES_MAT> GetAllMateriales(PagingInfo info, string codigo)
        {

            DataPaged<EE_DETALLES_DES_MAT> result = null;
            ExecuteManager(uow =>
            {
                var manager = new DesignacionesManager(uow);
                result = manager.GetAllMateriales(info, codigo);

            });
            return result;
        }
        public DataPaged<EE_DETALLES_DES_CANCELADO> GetAllCancelados(PagingInfo info, string codigo)
        {

            DataPaged<EE_DETALLES_DES_CANCELADO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new DesignacionesManager(uow);
                result = manager.GetAllCancelados(info, codigo);

            });
            return result;
        }
        public DataPaged<EE_DETALLES_DES_ENTREGADO> GetAllEntregados(PagingInfo info, string codigo)
        {

            DataPaged<EE_DETALLES_DES_ENTREGADO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new DesignacionesManager(uow);
                result = manager.GetAllEntregados(info, codigo);

            });
            return result;
        }

        
    }
}
