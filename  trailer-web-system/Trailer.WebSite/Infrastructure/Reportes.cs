using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Trailer.Model;

namespace Trailer.WebSite.Infrastructure
{
    public class Reportes
    {
        public IQueryable<EE_INGRESOS> getAllIngresos()
        {
            var context = new Entities();
            var query = from c in context.EE_INGRESOS
                        select c;
            return query;
          
        }
        public IQueryable<EE_MATERIAS_PRIMA> getAllMateriales() {
            var context = new Entities();
            var query = from c in context.EE_MATERIAS_PRIMA
                        select c;
            return query;
        }
        public IQueryable<EE_PROVEEDORES> getAllProveedores()
        {
            var context = new Entities();
            var query = from c in context.EE_PROVEEDORES
                        select c;
            return query;
        }
        public IQueryable<EE_ORDENES_PRODUCCION> getAllOrdenProduccion(int id) {
            var context = new Entities();
            var query = from c in context.EE_ORDENES_PRODUCCION
                        where c.ID_ORDEN_PRODUCCION == id
                        select c;
            return query;
        }
        public IQueryable<EE_DETALLES_INGRESO> getAllDetallesIngreso(int id)
        {
            var context = new Entities();
            var query = from c in context.EE_DETALLES_INGRESO
                        where c.ID_INGRESO == id
                        select c;
            return query;
        }
        public IQueryable<EE_CORTES> getAllCortes(int id)
        {
            var context = new Entities();
            var query = from c in context.EE_CORTES
                        where c.ID_ORDEN_PRODUCCION == id
                        select c;
            return query;
        }
        public IQueryable<EE_DETALLES_SALIDA_OP> getAllDetallesSalida(int id)
        {
            var context = new Entities();
            var query = from c in context.EE_DETALLES_SALIDA_OP
                        where c.ID_ORDEN_PRODUCCION == id
                        select c;
            return query;
        }
        public IQueryable<EE_DETALLES_RECIBO> getAllDetallesRecibo(int id)
        {
            var context = new Entities();
            var query = from c in context.EE_DETALLES_RECIBO
                        where c.ID_RECIBO == id
                        select c;
            return query;
        }
        public IQueryable<EE_RECIBOS> getAllRecibos(int id)
        {
            var context = new Entities();
            var query = from c in context.EE_RECIBOS
                        where c.ID_RECIBO == id
                        select c;
            return query;
        }
    }
}