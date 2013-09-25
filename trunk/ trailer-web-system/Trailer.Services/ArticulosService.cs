using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class ArticulosService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_ARTICULOS> GetAllArticulos(PagingInfo info, string codigo)
        {

            DataPaged<EE_ARTICULOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new ArticulosManager(uow);
                result = manager.GetAllArticulos(info, codigo);
               
            });
            return result;
        }

        
    }
}
