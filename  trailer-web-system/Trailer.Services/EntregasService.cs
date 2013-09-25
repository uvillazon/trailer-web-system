using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class EntregasService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_ENTREGAS> GetAllEntregas(PagingInfo info, string codigo)
        {

            DataPaged<EE_ENTREGAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new EntregasManager(uow);
                result = manager.GetAllEntregas(info, codigo);

            });
            return result;
        }

        public DataPaged<EE_DETALLES_ENTREGA> GetAllDetallesEntrega(PagingInfo info, string codigo)
        {

            DataPaged<EE_DETALLES_ENTREGA> result = null;
            ExecuteManager(uow =>
            {
                var manager = new EntregasManager(uow);
                result = manager.GetAllDetallesEntrega(info, codigo);

            });
            return result;
        }


        public ErrorPaged ModificarDetalles(string Detalles, int ID_ENTREGA)
        {
            var result = new ErrorPaged();
            try
            {
                ExecuteManager(uow =>
                {
                    var manager = new EntregasManager(uow);
                    var ingreso = manager.GetEntregaById(ID_ENTREGA);
                    if (ingreso.ESTADO != "COMPLETADO")
                    {
                        string puesto = manager.ModificarDetalles(Detalles, ID_ENTREGA);

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
                        result.msg = "La Entrega Nro :"+ingreso.NRO_ENTREGA+" Ya fue Completado Si quiere seguir agregando Por favor Cambie De Estado";
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
