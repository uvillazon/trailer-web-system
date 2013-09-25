using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Text;

namespace Trailer.Common.Data.Interfaces
{
    public interface IUnitOfWork
    {
        //IGenericContext Context { get; }
        ObjectContext Context { get; }
        void Commit();
        void Rollback();
        //string ConnectionString { get; set; }
        void Start();
        void End();
        //bool LazyLoadingEnabled { get; set; }
        //bool ProxyCreationEnabled { get; set; }
    }
}
