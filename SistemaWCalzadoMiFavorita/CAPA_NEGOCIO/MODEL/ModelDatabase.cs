using CAPA_DATOS;
using CAPA_NEGOCIO.SECURITY;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class Articulo : EntityClass
    {
        public int? IdArticulo { get; set; }
        public int? CódigoArticulo { get; set; }
        public string NombreArticulo { get; set; }
        public string DescripcionArticulo { get; set; }
        public DateTime? FechaRegistro { get; set; }
        public bool? Estado { get; set; }
    }

    public class Bodega : EntityClass
    {
        public int? IdBodega { get; set; }
        public string NombreBodega { get; set; }
        public int? IdArticulo { get; set; }
    }

    public class Categoria : EntityClass
    {
        public int? IdCategoria { get; set; }
        public string NombreCategoria { get; set; }
        public string DescripcionCategoria { get; set; }
    }

    public class Color : EntityClass
    {
        public int? IdColor { get; set; }
        public string NombreColor { get; set; }
        public DateTime? FechaRegistro { get; set; }
    }

    public class CompraArticulo : EntityClass
    {
        public int? IdCompra { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdProveedor { get; set; }
        public DateTime? Fecha { get; set; }
        public Decimal? TotalCosto { get; set; }
        public Decimal? SubTotal { get; set; }
        public Decimal? IVA { get; set; }
        public Decimal? Descuento { get; set; }
        public List<DetalleCompra> DetalleCompras { get; set; }
        public List<Existencias> Existencias { get; set; }
        public List<Usuario> Usuario { get; set; }

        public Object SaveCompra()
        {
            this.IdCompra = (Int32)this.Save();

            if (this.DetalleCompras != null)
            {
                foreach (var detallecompra in this.DetalleCompras)
                {
                    detallecompra.IdCompra = this.IdCompra;
                    detallecompra.IdDetalleCompra = (Int32)detallecompra.Save();
                    /*   ESTO PUEDE SERVIR PARA VERIDFICAR SI EL DETALLE TIENE ALGO*/
                    //detallecompra.SaveArticulos();
                    detallecompra.SaveExistencias();
                    //if (this.Existencias != null)
                    //{
                    //    foreach (var existencia in this.Existencias)
                    //    {
                    //        this.IdCompra = existencia.IdCompra;
                    //        existencia.IdArticuloExistencia = (Int32)existencia.Save();
                    //    }
                    //}
                }


            }

            //----------------------------------------------
            //Faltaria hacer una tabla intermedia entre usuario y comnpra
            // Usuario -> Usuario Compra <- Compra
            //Idusuario   Idusuario         IdCompra
            //            IdCompra    
            /* if (Usuario == null)
             {
                 this.Usuario = new List<CompraUsuario>();
             }
             if (AuthNetCore.User.Roles.Find(r => r == "Admin") != null)
             {
                 Usuario.Add(new CompraUsuario() { IdCompra = this.IdCompra, IdUsuario = AuthNetCore.User.UserId });
             }
             foreach (var usuario in this.Usuario)
             {
                 usuario.IdCompra = this.IdCompra;
                 usuario.Save();
             }*/
            return true;
        }
    }

    public class DetalleCompra : EntityClass
    {
        public int? IdDetalleCompra { get; set; }
        public int? IdCompra { get; set; }
        public int? IdArticulo { get; set; }
        public int? Cantidad { get; set; }
        public Decimal? PrecioCompra { get; set; }
        public Decimal? TotalCostoDetalle { get; set; }
        public List<Articulo> Articulos { get; set; }
        public List<Existencias> Existencias { get; set; }


        //public Object SaveArticulos()
        //{

        //    if (this.Articulos != null)
        //    {
        //        foreach (var articulo in this.Articulos)
        //        {
        //          /* this.IdArticulo = articulo.IdArticulo;*/
        //           this.IdArticulo = (Int32)articulo.Save();
        //        }
        //    }
        //    return true;
        //}
        public Object SaveExistencias()
        {
            foreach (var existencia in this.Existencias)
            {
                existencia.IdCompra = this.IdCompra;
                existencia.IdArticulo = this.IdArticulo;
                //existencia.Stock += this.Cantidad;
                existencia.IdArticuloExistencia = (Int32)existencia.Save();
            }
            return true;
        }

    }

    public class DetalleVenta : EntityClass
    {
        public int? IdDetalleVenta { get; set; }
        public int? IdVenta { get; set; }
        public int? IdArticuloExistencia { get; set; }
        public Decimal? PrecioVenta { get; set; }
        public int? CantidadVenta { get; set; }
    }

    public class Devoluciones : EntityClass
    {
        public int? IdDevolucion { get; set; }
        public int? IdArticulo { get; set; }
        public int? IdDetalleVenta { get; set; }
        public int? IdDetalleCompra { get; set; }
        public DateTime? FechaRegistro { get; set; }
        public string Descripcion { get; set; }
    }

    public class Existencias : EntityClass
    {
        public int? IdArticuloExistencia { get; set; }
        public int? IdCompra { get; set; }
        public int? IdArticulo { get; set; }
        public int? IdColor { get; set; }
        public int? IdTalla { get; set; }
        public int? IdMaterial { get; set; }
        public int? IdCategoria { get; set; }
        public int? IdModelo { get; set; }
        public int? IdMarca { get; set; }
        public int? PrecioUnidadVenta { get; set; }
        public int? PrecioUnidadCompra { get; set; }
        public int? Stock { get; set; }
        public bool? Estado { get; set; }


    }

    public class Marca : EntityClass
    {
        public int? IdMarca { get; set; }
        public string NombreMarca { get; set; }
        public DateTime? FechaRegistro { get; set; }
    }

    public class Material : EntityClass
    {
        public int? IdMaterial { get; set; }
        public string NombreMaterial { get; set; }
        public DateTime? FechaRegistro { get; set; }
    }

    public class Modelo : EntityClass
    {
        public int? IdModelo { get; set; }
        public string NombreModelo { get; set; }
        public string Descripción { get; set; }
    }

    public class Proveedor : EntityClass
    {
        public int? IdProveedor { get; set; }
        public string Nombreproveedor { get; set; }
        public string Dirección { get; set; }
        public int? Teléfono { get; set; }
        public string Correo { get; set; }
    }

    public class Rol : EntityClass
    {
        public int? IdRol { get; set; }
        public string NombreRol { get; set; }
        public string Descripción { get; set; }
    }

    public class Talla : EntityClass
    {
        public int? IdTalla { get; set; }
        public string NombreTalla { get; set; }
        public DateTime? FechaRegistro { get; set; }
    }

    public class Usuario : EntityClass
    {
        public int? IdUsuario { get; set; }
        public string Cedula { get; set; }
        public string NombreUsuario { get; set; }
        public string ApellidoUsuario { get; set; }
        public string DireccionUsuario { get; set; }
        public int? TelefonoUsuario { get; set; }
        public string Correo { get; set; }
        public int? IdRol { get; set; }
    }

    public class Venta : EntityClass
    {
        public int? IdVenta { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdArticulo { get; set; }
        public DateTime? FechaFactura { get; set; }
        public string NombreCliente { get; set; }
        public Decimal? TotalVenta { get; set; }
        public Decimal? IVA { get; set; }
        public Decimal? Cantidad { get; set; }
        public Decimal? SumaRecibida { get; set; }
        public Decimal? SumaCambio { get; set; }
    }

}