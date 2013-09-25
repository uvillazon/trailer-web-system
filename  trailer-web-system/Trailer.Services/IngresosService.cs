using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class IngresosService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_INGRESOS> GetAllIngresos(PagingInfo info, string codigo)
        {

            DataPaged<EE_INGRESOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new IngresosManager(uow);
                result = manager.GetAllIngresos(info, codigo);

            });
            return result;
        }

        public DataPaged<EE_DETALLES_INGRESO> GetAllDetallesIngreso(PagingInfo info, string codigo)
        {

            DataPaged<EE_DETALLES_INGRESO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new IngresosManager(uow);
                result = manager.GetAllDetallesIngreso(info, codigo);

            });
            return result;
        }


        public ErrorPaged CrearDetallesIngreso(string Detalles, int ID_INGRESO)
        {
            var result = new ErrorPaged();
            try
            {
                ExecuteManager(uow =>
                {
                    var manager = new IngresosManager(uow);
                    var ingreso = manager.GetIngresoById(ID_INGRESO);
                    if (ingreso.ESTADO != "CONTABILIZADO")
                    {
                        string puesto = manager.CrearDetallesIngreso(Detalles, ID_INGRESO);

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
                    }
                    else
                    {
                        result.success = false;
                        result.msg = "El Ingreso :"+ingreso.NRO_INGRESO+" Ya fue Contabilizado Si quiere seguir agregando Por favor DESCONTABILIZAR";
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
