using CAPA_NEGOCIO.SECURITY;
using CAPA_NEGOCIO.MODEL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ArticuloDanadosController : ControllerBase
    {
        public ArticuloDanadosController()
        {
            AuthNetCore.loginIN("sa", "123");
        }
        [HttpPost]
        public Object ArticuloDanados(ViewArticulosDanados ent)
        {
            ent.IdUsuario = AuthNetCore.User.UserId;
            return ent.Get<ViewArticulosDanados>();
        }
        public Object ChargeExistencias(Existencias ent)
        {

            return ent.Get<Existencias>();
        }
        public Object ChargeArticulosDanados(ViewArticulosSeleccionarDanados ent)
        {

            return ent.Get<ViewArticulosSeleccionarDanados>();
        }
        public Object SaveArticuloDanado(ArticuloDanados ent)
        {
            return ent.SaveArticuloDanado();
        }
    }
}
