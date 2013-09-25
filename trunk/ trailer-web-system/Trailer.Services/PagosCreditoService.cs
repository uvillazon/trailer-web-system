using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class PagosCreditoService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_PAGOS_CREDITO> GetAllPagosCredito(PagingInfo info, string codigo)
        {

            DataPaged<EE_PAGOS_CREDITO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new PagosCreditoManager(uow);
                result = manager.GetAllPagosCredito(info, codigo);

            });
            return result;
        }

        public DataPaged<EE_DETALLES_PAGO> GetAllDetallesPagoCredito(PagingInfo info, string codigo)
        {

            DataPaged<EE_DETALLES_PAGO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new PagosCreditoManager(uow);
                result = manager.GetAllDetallesPagoCredito(info, codigo);

            });
            return result;
        }


        public ErrorPaged CrearPagoCredito(string Detalles, EE_PAGOS_CREDITO c)
        {
            var result = new ErrorPaged();
            try
            {
                ExecuteManager(uow =>
                {
                    var manager = new PagosCreditoManager(uow);

                    string puesto = manager.CrearPagoCredito(c);
                    int idPago;
                    bool esNumero = int.TryParse(puesto, out idPago);
                    if (puesto == "Exito" || esNumero )
                    {
                        string estado = manager.CrearDetallesPagoCredito(Detalles, (int)c.ID_PAGO_CREDITO);
                        if (estado == "Exito")
                        {
                            result.success = true;
                            result.datos = puesto;
                            result.msg = "Se inserto Correctamente";
                        }
                        else
                        {
                            result.success = false;
                            result.msg = estado;
                        }
                        

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
