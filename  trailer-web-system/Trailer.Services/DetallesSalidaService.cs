using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class DetallesSalidaService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_DETALLES_SALIDA_OP> GetAllDetallesSalida(PagingInfo info, string codigo)
        {

            DataPaged<EE_DETALLES_SALIDA_OP> result = null;
            ExecuteManager(uow =>
            {
                var manager = new DetallesSalidaManager(uow);
                result = manager.GetAllDetallesSalida(info, codigo);
               
            });
            return result;
        }

        
    }
}
