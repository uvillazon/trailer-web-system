using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class ReportesService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_MOVIMIENTOS_MATERIA> GetAllMovimientoMateriales(PagingInfo info, string codigo)
        {

            DataPaged<EE_MOVIMIENTOS_MATERIA> result = null;
            ExecuteManager(uow =>
            {
                var manager = new ReportesManager(uow);
                result = manager.GetAllMovimientoMateriales(info, codigo);
               
            });
            return result;
        }

        
    }
}
