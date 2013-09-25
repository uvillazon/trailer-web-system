using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class RecibosService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_RECIBOS> GetAllRecibos(PagingInfo info, string codigo)
        {

            DataPaged<EE_RECIBOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new RecibosManager(uow);
                result = manager.GetAllRecibos(info, codigo);
               
            });
            return result;
        }

        
    }
}
