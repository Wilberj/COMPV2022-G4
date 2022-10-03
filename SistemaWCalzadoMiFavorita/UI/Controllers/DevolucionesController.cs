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
    public class DevolucionesController : ControllerBase
    {
        public DevolucionesController()
        {
            AuthNetCore.loginIN("sa", "123");
        }
        [HttpPost]
        public Object Devoluciones(ViewCompraDevoluciones ent)
        {
            return ent.Get<ViewCompraDevoluciones>();
        }
        public Object ViewCompraDetalle(ViewCompraDetalle ent)
        {
            return ent.Get<ViewCompraDetalle>();
        }
        public Object DevolucionesDetalle(ViewDevolucionesDetalleCompra ent)
        {
            return ent.Get<ViewDevolucionesDetalleCompra>();
        }
        public Object SaveDevoluciones(DevolucionesCompra ent)
        {
            return ent.SaveDevoluciones();
        }
        public Object ChargeDetalleDevoluciones()
        {
            return new DetalleDevolucionCompra().Get<DetalleDevolucionCompra>();
        }
        public Object ChargeCompraDevoluciones()
        {
            return new ViewCompraDevoluciones().Get<ViewCompraDevoluciones>();
        }
    }
}
