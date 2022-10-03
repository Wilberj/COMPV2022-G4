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
    public class CompraModuloController : ControllerBase
    {
        public CompraModuloController()
        {
            AuthNetCore.loginIN("sa", "123");
        }
        [HttpPost]
        public Object Compra(ViewModuloCompra ent)
        {
            ent.IdUsuario = AuthNetCore.User.UserId;
            return ent.Get<ViewModuloCompra>();
        }

        public Object SaveCompra(CompraArticulo ent)
        {
            return ent.SaveCompra();
        }


        //public Object SaveArticulos(DetalleCompra ent)
        //{
        //    return ent.SaveArticulos();
        //}
        public Object ChargeUsuario()
        {
            return new Usuario().Get<Usuario>();
        }
        public Object ChargeArticulo()
        {
            return new Articulo().Get<Articulo>();
        }
        public Object ChargeProveedor()
        {
            return new Proveedor().Get<Proveedor>();
        }

        public Object ChargeDetalleCompra()
        {
            return new DetalleCompra().Get<DetalleCompra>();
        }
        public Object ChargeExistencias()
        {
            return new Existencias().Get<Existencias>();
        }

        public Object ChargeCompras()
        {
            return new CompraArticulo().Get<CompraArticulo>();
        }
        public Object SaveDetalleCompra(DetalleCompra ent)
        {
            //return ent.SaveArticulos();
            ent.IdDetalleCompra = (Int32)ent.Save();
            return ent;
        }
    }
}
