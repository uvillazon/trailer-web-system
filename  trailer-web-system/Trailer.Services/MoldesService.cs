using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class MoldesService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_MOLDES> GetAllMoldes(PagingInfo info, string codigo)
        {

            DataPaged<EE_MOLDES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new MoldesManager(uow);
                result = manager.GetAllMoldes(info, codigo);
               
            });
            return result;
        }

        
    }
}
