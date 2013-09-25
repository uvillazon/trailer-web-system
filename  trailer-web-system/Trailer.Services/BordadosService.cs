using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class BordadosService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_BORDADOS> GetAllBordados(PagingInfo info, string codigo)
        {

            DataPaged<EE_BORDADOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new BordadosManager(uow);
                result = manager.GetAllBordados(info, codigo);
               
            });
            return result;
        }

        
    }
}
