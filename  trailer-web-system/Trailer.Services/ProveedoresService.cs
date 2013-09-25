using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class ProveedoresService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_PROVEEDORES> GetAllProveedores(PagingInfo info, string codigo)
        {

            DataPaged<EE_PROVEEDORES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new ProveedoresManager(uow);
                result = manager.GetAllProveedores(info, codigo);
               
            });
            return result;
        }

        
    }
}
