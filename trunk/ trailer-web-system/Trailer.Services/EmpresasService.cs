using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class EmpresasService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_EMPRESAS> GetAllEmpresas(PagingInfo info, string codigo)
        {

            DataPaged<EE_EMPRESAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new EmpresasManager(uow);
                result = manager.GetAllEmpresas(info, codigo);
               
            });
            return result;
        }

        
    }
}
