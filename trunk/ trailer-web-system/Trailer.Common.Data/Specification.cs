using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Trailer.Common.Data.Interfaces;

namespace Trailer.Common.Data
{
    public class Specification<TEntity> : ISpecification<TEntity>
    {
        #region Private Members

        private Func<TEntity, bool> _evalFunc = null;
        private Expression<Func<TEntity, bool>> _evalPredicate;

        #endregion

        #region Virtual Accessors

        public virtual Expression<Func<TEntity, bool>> EvalPredicate
        {
            get { return _evalPredicate; }
        }

        public virtual Func<TEntity, bool> EvalFunc
        {
            get { return _evalFunc; }
        }

        #endregion

        #region Constructors

        public Specification(Expression<Func<TEntity, bool>> predicate)
        {
            _evalPredicate = predicate;
        }

        private Specification() { }

        #endregion
    }
}
