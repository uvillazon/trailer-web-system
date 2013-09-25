using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class OrdenesProduccionService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_ORDENES_PRODUCCION> GetAllOrdenesProduccion(PagingInfo info, string codigo)
        {

            DataPaged<EE_ORDENES_PRODUCCION> result = null;
            ExecuteManager(uow =>
            {
                var manager = new OrdenesProduccionManager(uow);
                result = manager.GetAllOrdenesProduccion(info, codigo);

            });
            return result;
        }

        public DataPaged<EE_DETALLES_ORDEN> GetAllDetallesOrden(PagingInfo info, string codigo)
        {

            DataPaged<EE_DETALLES_ORDEN> result = null;
            ExecuteManager(uow =>
            {
                var manager = new OrdenesProduccionManager(uow);
                result = manager.GetAllDetallesOrden(info, codigo);

            });
            return result;
        }
        public DataPaged<EE_HOJAS_CALCULO> GetAllHojasCalculo(PagingInfo info, string codigo)
        {

            DataPaged<EE_HOJAS_CALCULO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new OrdenesProduccionManager(uow);
                result = manager.GetAllHojasCalculo(info, codigo);

            });
            return result;
        }

        public ErrorPaged CrearDetallesOrden(EE_DETALLES_ORDEN orden, string tallas, int ID_ORDEN_PRODUCCION)
        {
            var result = new ErrorPaged();
            try
            {
                ExecuteManager(uow =>
                {
                    var manager = new OrdenesProduccionManager(uow);

                    string puesto = manager.CrearDetallesOrden(orden, tallas, ID_ORDEN_PRODUCCION);

                    if (puesto == "Exito")
                    {
                        //uow.Rollback();
                        result.success = true;
                        result.msg = "Se inserto Correctamente";

                    }
                    else
                    {
                        
                        result.success = false;
                        result.msg = puesto;
                    }


                });
                return result;
            }
            catch (Exception ex)
            {

                result.success = false;
                result.msg = "(Consulte Administrador ) : " + ex;
                return result;
            }
        }



        public ErrorPaged ModificarDetalles(string Detalles, int ID_ORDEN_PRODUCCION)
        {
            var result = new ErrorPaged();
            try
            {
                ExecuteManager(uow =>
                {
                    var manager = new OrdenesProduccionManager(uow);

                    string puesto = manager.ModificarDetalles(Detalles, ID_ORDEN_PRODUCCION);

                    if (puesto == "Exito")
                    {
                        result.success = true;
                        result.msg = "Se inserto Correctamente";

                    }
                    else
                    {
                        result.success = false;
                        result.msg = puesto;
                    }


                });
                return result;
            }
            catch (Exception ex)
            {

                result.success = false;
                result.msg = "(Consulte Administrador ) : " + ex;
                return result;
            }
        }

        public ErrorPaged EliminarDetalle(int ID_DETALLE_ORDEN)
        {
            var result = new ErrorPaged();
            try
            {
                ExecuteManager(uow =>
                {
                    var manager = new OrdenesProduccionManager(uow);

                    string puesto = manager.EliminarDetalle(ID_DETALLE_ORDEN);

                    if (puesto == "Exito")
                    {
                        result.success = true;
                        result.msg = "Se Elimino Correctamente";

                    }
                    else
                    {
                        result.success = false;
                        result.msg = puesto;
                    }


                });
                return result;
            }
            catch (Exception ex)
            {

                result.success = false;
                result.msg = "(Consulte Administrador ) : " + ex;
                return result;
            }
        }
    }
}
