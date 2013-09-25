using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class ClientesService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_CLIENTES> GetAllClientes(PagingInfo info, string codigo)
        {

            DataPaged<EE_CLIENTES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new ClientesManager(uow);
                result = manager.GetAllClientes(info, codigo);
               
            });
            return result;
        }

        
    }
}
