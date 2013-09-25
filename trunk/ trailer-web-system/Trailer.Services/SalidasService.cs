using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class SalidasService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_SALIDAS> GetAllSalidas(PagingInfo info, string codigo)
        {

            DataPaged<EE_SALIDAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SalidasManager(uow);
                result = manager.GetAllSalidas(info, codigo);

            });
            return result;
        }

        public DataPaged<EE_DETALLES_SALIDA> GetAllDetallesSalida(PagingInfo info, string codigo)
        {

            DataPaged<EE_DETALLES_SALIDA> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SalidasManager(uow);
                result = manager.GetAllDetallesSalida(info, codigo);

            });
            return result;
        }


        public ErrorPaged CrearDetallesSalida(string Detalles, int ID_SALIDA)
        {
            var result = new ErrorPaged();
            try
            {
                ExecuteManager(uow =>
                {
                    var manager = new SalidasManager(uow);
                    var ingreso = manager.GetSalidaById(ID_SALIDA);
                    if (ingreso.ESTADO != "CONTABILIZADO")
                    {
                        string puesto = manager.CrearDetallesSalida(Detalles, ID_SALIDA);

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
                        result.msg = "El Ingreso :"+ingreso.NRO_SALIDA+" Ya fue Contabilizado Si quiere seguir agregando Por favor DESCONTABILIZAR";
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
