using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class ResponsablesService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_RESPONSABLES> GetAllResponsables(PagingInfo info, string codigo)
        {

            DataPaged<EE_RESPONSABLES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new ResponsablesManager(uow);
                result = manager.GetAllResponsables(info, codigo);
            });
            return result;
        }

        
    }
}
