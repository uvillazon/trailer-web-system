using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class CortesService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_CORTES> GetAllCortes(PagingInfo info, string codigo)
        {

            DataPaged<EE_CORTES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new CortesManager(uow);
                result = manager.GetAllCortes(info, codigo);
               
            });
            return result;
        }

        
    }
}
