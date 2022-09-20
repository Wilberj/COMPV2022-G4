using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
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
    public class MantenimientoCatalogosController : ControllerBase
    {
        public MantenimientoCatalogosController()
        {
            AuthNetCore.loginIN("sa", "123");
        }
        [HttpPost]
        /* public Object GetCompraArticulo(CompraArticulo ent)
         {
             return ent.Get<CompraArticulo>();
         }
         public Object SaveCompraArticulo(CompraArticulo ent)
         {
             *//*   ent.IdCompra = (Int32)ent.Save();
                ent.IdUsuario = (Int32)ent.Save();
                ent.IdProveedor = (Int32)ent.Save();*/
        /*  ent.Get<"IdUsuario">;
          ent.Get("IdProveedor");
        *//*  ent.Get<Usuario>();*//*
          ent.Get <Proveedor>();*/
        /*    ent.Get<Usuario>();
            ent.Get<Proveedor>();
            ent.IdUsuario = (Int32)ent.Save();
            ent.IdProveedor = (Int32)ent.Save();
            ent.IdCompra = (Int32)ent.Save();
            return ent;*/
        /*   List<Object> Reponse = new List<Object>();
           CompraArticulo enti = new CompraArticulo();
           Reponse.Add(enti.Save());
           Proveedor entid = new Proveedor();
           Reponse.Add(entid.Save());
           Usuario entida = new Usuario();
           Reponse.Add(entida.Save());*//*
        ent.IdCompra = (Int32)ent.Save();
        return ent;
    }
    public Object UpdateCompraArticulo(CompraArticulo ent)
    {
        return ent.Update("IdCompra");
    }

    public Object GetDetalleCompra(DetalleCompra ent)
    {

        return ent.Get<DetalleCompra>();
    }


    public Object SaveDetalleCompra(DetalleCompra ent)
    {
        ent.IdDetalleCompra = (Int32)ent.Save();
        return ent;
    }
    public Object UpdateDetalleCompra(DetalleCompra ent)
    {
        return ent.Update("IdDetalleCompra");
    }*/

        public Object GetRol(Rol ent)
        {
            return ent.Get<Rol>();
        }
        public Object SaveRol(Rol ent)
        {
            ent.IdRol = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateRol(Rol ent)
        {
            return ent.Update("IdRol");
        }

        public Object GetMaterial(Material ent)
        {
            return ent.Get<Material>();
        }
        public Object SaveMaterial(Material ent)
        {
            ent.IdMaterial = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateMaterial(Material ent)
        {
            return ent.Update("IdMaterial");
        }

        public Object GetUsuario(Usuario ent)
        {
            return ent.Get<Usuario>();
        }
        public Object SaveUsuario(Usuario ent)
        {
            ent.IdUsuario = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateUsuario(Usuario ent)
        {
            return ent.Update("IdUsuario");
        }

        public Object GetProveedor(Proveedor ent)
        {
            return ent.Get<Proveedor>();
        }
        public Object SaveProveedor(Proveedor ent)
        {
            ent.IdProveedor = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateProveedor(Proveedor ent)
        {
            return ent.Update("IdProveedor");
        }

        public Object GetArticulo(Articulo ent)
        {
            return ent.Get<Articulo>();
        }
        public Object SaveArticulo(Articulo ent)
        {
            ent.IdArticulo = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateArticulo(Articulo ent)
        {
            return ent.Update("IdArticulo");
        }

        public Object GetExistencias(Existencias ent)
        {
            return ent.Get<Existencias>();
        }
        public Object SaveExistencias(Existencias ent)
        {
            ent.IdArticuloExistencia = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateExistencias(Existencias ent)
        {
            return ent.Update("IdArticuloExistencia");
        }

        public Object GetColor(Color ent)
        {
            return ent.Get<Color>();
        }
        public Object SaveColor(Color ent)
        {
            ent.IdColor = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateColor(Color ent)
        {
            return ent.Update("IdColor");
        }

        public Object GetTalla(Talla ent)
        {
            return ent.Get<Talla>();
        }
        public Object SaveTalla(Talla ent)
        {
            ent.IdTalla = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateTalla(Talla ent)
        {
            return ent.Update("IdTalla");
        }

        public Object GetCategoria(Categoria ent)
        {
            return ent.Get<Categoria>();
        }
        public Object SaveCategoria(Categoria ent)
        {
            ent.IdCategoria = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateCategoria(Categoria ent)
        {
            return ent.Update("IdCategoria");
        }

        public Object GetModelo(Modelo ent)
        {
            return ent.Get<Modelo>();
        }
        public Object SaveModelo(Modelo ent)
        {
            ent.IdModelo = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateModelo(Modelo ent)
        {
            return ent.Update("IdModelo");
        }

        public Object GetMarca(Marca ent)
        {
            return ent.Get<Marca>();
        }
        public Object SaveMarca(Marca ent)
        {
            ent.IdMarca = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateMarca(Marca ent)
        {
            return ent.Update("IdMarca");
        }

    }
}
