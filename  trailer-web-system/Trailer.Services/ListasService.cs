using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class ListasService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_LISTAS> GetAllListas(PagingInfo info, string codigo)
        {

            DataPaged<EE_LISTAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new ListasManager(uow);
                result = manager.GetAllListas(info, codigo);
               
            });
            return result;
        }

        public DataPaged<EE_LISTAS_ADM> GetAllListasRel(PagingInfo info, string codigo)
        {

            DataPaged<EE_LISTAS_ADM> result = null;
            ExecuteManager(uow =>
            {
                var manager = new ListasManager(uow);
                result = manager.GetAllListasRel(info, codigo);

            });
            return result;
        }
        
    }
}
