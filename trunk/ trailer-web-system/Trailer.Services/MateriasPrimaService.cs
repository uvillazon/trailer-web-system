using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class MateriasPrimaService : BaseService
    {
        
        public DataPaged<EE_MATERIAS_PRIMA> GetAllMateriasPrima(PagingInfo info, string codigo)
        {

            DataPaged<EE_MATERIAS_PRIMA> result = null;
            ExecuteManager(uow =>
            {
                var manager = new MateriasPrimaManager(uow);
                result = manager.GetAllMateriasPrima(info, codigo);
               
            });
            return result;
        }

        
    }
}
