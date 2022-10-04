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
        public Object ArticuloDanados(ViewNArticulo ent)
        {

            return ent.Get<ViewNArticulo>();
        }
        public Object ChargeArticuloDanados(ViewArticuloDanados ent)
        {

            return ent.Get<ViewArticuloDanados>();
        }
        public Object SaveArticuloDanado(ArticuloDanados ent)
        {

            return ent.SaveArticuloDanado();
        }

        //CambiosControllerprueba
    }
}
