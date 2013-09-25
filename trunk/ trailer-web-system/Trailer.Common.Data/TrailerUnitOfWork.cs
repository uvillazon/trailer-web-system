using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Common.Data.Interfaces;
using System.Data.Objects;
using System.Data.Common;
using System.Data;

namespace Trailer.Common.Data
{
    public class TrailerUnitOfWork<TContext> : IUnitOfWork, IDisposable where TContext : ObjectContext, new()
    {
        private readonly TContext _context;

        private DbTransaction _transaction;

        public TrailerUnitOfWork()
        {
            this._context = GetObjectContext();
        }
        public ObjectContext Context
        {
            get { return _context; }
        }

        public void Commit()
        {
            _transaction.Commit();
        }

        public void Rollback()
        {
            _transaction.Rollback();
            CloseSession();
        }

        public void Start()
        {
            _transaction = BeginTransaction();
        }

        public void End()
        {
            {
                {
                    _context.SaveChanges();
                    _transaction.Commit();
                }
                CloseSession();
            }

        }

        #region IDisposable Members

        public void Dispose()
        {
        }

        #endregion

        /// <summary>
        /// Start Transaction
        /// </summary>
        /// <returns></returns>
        private DbTransaction BeginTransaction()
        {
            if (_context.Connection.State != ConnectionState.Open)
            {
                _context.Connection.Open();
            }
            return _context.Connection.BeginTransaction();
        }

        private void CloseSession()
        {
            if (_context.Connection.State != ConnectionState.Closed)
            {
                _context.Connection.Close();
            }
        }

        //Switch that tells us if the datacontext is reused
        internal bool _contextReused;

        //This return the current, or a new connection through the EF
        private TContext GetObjectContext()
        {
            if (!_contextReused)
            {
                return new TContext();
            }
            return _context;
        }

        //This is the public method that we will call from our repository
        public void ReleaseObjectContextIfNotReused()
        {
            if (!_contextReused)
            {
                ReleaseObjectContext();
            }
        }

        //Simple dispose of the current EF
        private void ReleaseObjectContext()
        {
            if (_context != null)
            {
                _context.Dispose();
            }
            _contextReused = false;
        }
    }
}
