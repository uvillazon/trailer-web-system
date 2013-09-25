using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class EmpleadosService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_EMPLEADOS> GetAllEmpleados(PagingInfo info, string codigo)
        {

            DataPaged<EE_EMPLEADOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new EmpleadosManager(uow);
                result = manager.GetAllEmpleados(info, codigo);
               
            });
            return result;
        }

        
    }
}
