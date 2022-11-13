using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Text;


namespace CAPA_NEGOCIO.MODEL
{
    public class InformeVentas
    {
        public int IdArticulo { get; set; }
        public int IdArticuloExistencia { get; set; }
        public int CódigoArticulo { get; set; }
        public string NombreArticulo { get; set; }
        public int CantidadVendida { get; set; }
        public List<String> Params { get; set; }
        public Object TakeInforme(InformeVentas Inst)
        {
            try
            {
                List<Object> SqlParams = new List<Object>();
                SqlParams.Add(Convert.ToDateTime(Params[0]));
                SqlParams.Add(Convert.ToDateTime(Params[1]));
                SqlADOConexion.IniciarConexion("sa", "123");
                var Informe = SqlADOConexion.SQLM.TakeListWithProcedure<InformeVentas>(
                    "usp_informeVentas", Inst, SqlParams);
                return Informe;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

}

