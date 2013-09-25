using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class ProductosService : BaseService
    {
        
        public DataPaged<EE_PRODUCTOS> GetAllProductos(PagingInfo info, string codigo)
        {

            DataPaged<EE_PRODUCTOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new ProductosManager(uow);
                result = manager.GetAllProductos(info, codigo);
               
            });
            return result;
        }

        
    }
}
