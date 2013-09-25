using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Common.Data;
using Trailer.Common.Data.Interfaces;
using Trailer.Model;

namespace Trailer.Services
{
    public class BaseService
    {
        public void ExecuteManager(Action<IUnitOfWork> coreMethod, Action postCommit = null)
        {
            var uow = new TrailerUnitOfWork<Entities>();
            try
            {
                uow.Start();
                coreMethod(uow);
                uow.End();
                if (postCommit != null) postCommit();
            }
            catch (Exception)
            {
                uow.Rollback();
                throw;
            }
        
}
    }
}