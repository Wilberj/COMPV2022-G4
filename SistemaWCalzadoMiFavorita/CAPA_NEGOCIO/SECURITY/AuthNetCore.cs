using CAPA_DATOS;
using CAPA_NEGOCIO.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.SECURITY
{
    public class AuthNetCore
    {
        static public UserModel User;
        static public bool VerifyAuthenticate()
        {
            if (SqlADOConexion.SQLM == null)
            {
                SqlADOConexion.SQLM = null;
                return false;
            }
            return true;
        }
        static public bool loginIN(string user, string password)
        {
            try
            {
                SqlADOConexion.IniciarConexion(user, password);
                User = new UserModel(
                    new Usuario() { NombreUsuario = user }.FindObject<Usuario>()
                );
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
    public class UserModel
    {
        public UserModel(Usuario usuario)
        {
            this.user = usuario.NombreUsuario;
            this.success = true;
            this.UserId = usuario.IdUsuario;
            this.Roles = new List<string> { "Admin", "Comprador" };
        }
        public string user { get; set; }
        public int? UserId { get; set; }
        public bool success { get; set; }
        public List<String> Roles { get; set; }
    }
}
