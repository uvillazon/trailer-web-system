using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class ImagenesService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_IMAGENES> GetAllImagenes(PagingInfo info, string codigo,int ID)
        {

            DataPaged<EE_IMAGENES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new ImagenesManager(uow);
                result = manager.GetAllImagenes(info, codigo,ID);
               
            });
            return result;
        }

        
    }
}
