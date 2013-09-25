using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class FacturasService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_FACTURAS> GetAllFacturas(PagingInfo info, string codigo)
        {

            DataPaged<EE_FACTURAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new FacturasManager(uow);
                result = manager.GetAllFacturas(info, codigo);
               
            });
            return result;
        }

        
    }
}
