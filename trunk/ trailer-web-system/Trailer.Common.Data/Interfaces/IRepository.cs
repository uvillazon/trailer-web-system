using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Trailer.Common.Data.Interfaces
{
    /// <summary>
    /// Interaface  que define la funcionalidad base
    /// requerida por todos los Repositories.
    /// </summary>
    /// <typeparam name="TEntity">
    /// El tipo de la entidad requerida
    /// </typeparam>
    public interface IRepository<TEntity>
    {
        //DbTransaction BeginTransaction();
        void Add(TEntity entity);
        void AddOrAttach(TEntity entity);
        void DeleteRelatedEntries(TEntity entity);
        //void DeleteRelatedEntries(E entity, ObservableCollection<string> keyListOfIgnoreEntites);
        void Delete(TEntity entity);
        int Save();

        IQueryable<TEntity> Query(string entitySetName);
        IQueryable<TEntity> Query();
        IQueryable<TEntity> Query(string entitySetName, ISpecification<TEntity> where);
        IQueryable<TEntity> Query(ISpecification<TEntity> where);
        IQueryable<TEntity> Query(int maximumRows, int startRowIndex);
        IQueryable<TEntity> Query(Expression<Func<TEntity, object>> sortExpression);
        IQueryable<TEntity> Query(Expression<Func<TEntity, object>> sortExpression,
                    int maximumRows, int startRowIndex);

        IList<TEntity> DoSelect(string entitySetName);
        IList<TEntity> DoSelect();
        IList<TEntity> DoSelect(string entitySetName, ISpecification<TEntity> where);
        IList<TEntity> DoSelect(ISpecification<TEntity> where);
        IList<TEntity> DoSelect(int maximumRows, int startRowIndex);
        IList<TEntity> DoSelect(Expression<Func<TEntity, object>> sortExpression);
        IList<TEntity> DoSelect(Expression<Func<TEntity, object>> sortExpression,
                    int maximumRows, int startRowIndex);

        TEntity SelectByKey(string key);

        bool TrySameValueExist(string fieldName, object fieldValue, string key);
        bool TryEntity(ISpecification<TEntity> selectSpec);

        int GetCount();
        int GetCount(ISpecification<TEntity> selectSpec);
    }
}
