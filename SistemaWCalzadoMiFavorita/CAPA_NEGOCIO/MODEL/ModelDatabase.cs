using CAPA_DATOS;
using CAPA_NEGOCIO.SECURITY;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
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
        public bool? Estado { get; set; }
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
        public bool? Estado { get; set; }
        //public List<Articulo> Articulos { get; set; }
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

            //foreach (var existencia in this.Existencias)
            //{
            //    if (existencia.IdArticulo == this.IdArticulo)
            //    {
            //        existencia.IdCompra = this.IdCompra;
            //        existencia.IdArticulo = this.IdArticulo;
            //        existencia.Stock += existencia.Stock;

            //    }
            //    else
            //    {
            //        existencia.IdCompra = this.IdCompra;
            //        existencia.IdArticulo = this.IdArticulo;
            //        existencia.IdArticuloExistencia = (Int32)existencia.Save();
            //    }
            //}

            return true;
        }

    }

    public class DetalleVenta : EntityClass
    {
        public int? IdDetalleVenta { get; set; }
        public int? IdVenta { get; set; }
        public int? IdArticuloExistencia { get; set; }
        public Decimal? PrecioVenta { get; set; }
        public Decimal? DescuentoDetalleVenta { get; set; }
        public Decimal? TotalCostoVenta { get; set; }
        public int? CantidadVenta { get; set; }
        public bool? Estado { get; set; }
        public List<Existencias> Existencias { get; set; }
        public Object SaveExistencias()
        {
            if (this.Existencias != null)
            {
                foreach (var existe in this.Existencias)
                {
                    existe.IdArticuloExistencia = this.IdArticuloExistencia;
                    existe.Update("IdArticuloExistencia");
                }
            }
            return true;
        }
    }
    public class Existencias : EntityClass
    {
        public int? IdArticuloExistencia { get; set; }
        public int? IdCompra { get; set; }
        public int? IdArticulo { get; set; }
        public int? IdColor { get; set; }
        public int? IdMaterial { get; set; }
        public int? IdCategoria { get; set; }
        public int? IdModelo { get; set; }
        public int? IdMarca { get; set; }
        public int? Talla { get; set; }
        public int? IdBodega { get; set; }
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
        public DateTime? FechaFactura { get; set; }
        public string NombreCliente { get; set; }
        public Decimal? TotalVenta { get; set; }
        public Decimal? IVA { get; set; }
        public Decimal? DescuentoVenta { get; set; }
        public Decimal? SubTotal { get; set; }
        public Decimal? SumaRecibida { get; set; }
        public Decimal? SumaCambio { get; set; }
        public bool? Estado { get; set; }
        public List<DetalleVenta> DetalleVenta { get; set; }
        public List<Existencias> Existencias { get; set; }

        public Object SaveVenta()
        {
            this.IdVenta = (Int32)this.Save();

            if (this.DetalleVenta != null)
            {
                foreach (var detalleventa in this.DetalleVenta)
                {
                    detalleventa.IdVenta = this.IdVenta;
                    detalleventa.IdDetalleVenta = (Int32)detalleventa.Save();
                    detalleventa.SaveExistencias();
                }
            }
            return true;
        }
    }
    public class DevolucionesCompra : EntityClass
    {
        public int? IdDevolucion { get; set; }
        public int? IdCompra { get; set; }
        public DateTime? Fecha { get; set; }
        public List<CompraArticulo> Compras { get; set; }
        public List<DetalleDevolucionCompra> DetalleDevoluciones { get; set; }
        public List<DetalleCompra> DetallesCompra { get; set; }
        public List<Existencias> Existencias { get; set; }

        public Object SaveDevoluciones()
        {
            this.IdDevolucion = (Int32)this.Save();
            if (this.DetalleDevoluciones != null)
            {
                foreach (var detalledevolucion in this.DetalleDevoluciones)
                {
                    detalledevolucion.IdDevolucion = this.IdDevolucion;
                    detalledevolucion.IdDetalleDevolucionCompra = (Int32)detalledevolucion.Save();
                    //detalledevolucion.SaveDetallesDevolucion();
                }
            }
            foreach (var compra in this.Compras)
            {
                compra.IdCompra = this.IdCompra;
                compra.Update("IdCompra");
                foreach (var existencia in this.Existencias)
                {
                    existencia.IdCompra = compra.IdCompra;
                    existencia.Delete();
                }
                foreach (var detalle in this.DetallesCompra)
                {
                    detalle.IdCompra = compra.IdCompra;
                    detalle.Update("IdCompra");
                }

            }

            return true;
        }
    }

    public class DetalleDevolucionCompra : EntityClass
    {
        public int? IdDetalleDevolucionCompra { get; set; }
        public int? IdDevolucion { get; set; }
        public string Descripcion { get; set; }
        public List<DetalleCompra> DetallesCompra { get; set; }
        public List<CompraArticulo> Compras { get; set; }

        public Object SaveDetallesDevolucion()
        {
            if (this.Compras != null)
            {
                foreach (var detalle in this.DetallesCompra)
                {
                    detalle.IdDetalleCompra = detalle.IdDetalleCompra;
                    detalle.Update("IdDetalleCompra");
                }

            }
            return true;
        }
    }
    public class ArticuloDanados : EntityClass
    {
        public int? IdArticuloDanados { get; set; }
        public int? IdBodega { get; set; }
        public int? IdUsuario { get; set; }
        public string Descripcion { get; set; }
        public List<DetalleArticuloDanados> DetalleArticDanados { get; set; }
        public Object SaveArticuloDanado()
        {
            this.IdArticuloDanados = (Int32)this.Save();
            if (this.DetalleArticDanados != null)
            {
                foreach (var detalledanados in this.DetalleArticDanados)
                {
                    detalledanados.IdArticuloDanados = this.IdArticuloDanados;
                    detalledanados.IdDetalleArticuloDanados = (Int32)detalledanados.Save();
                    detalledanados.UpdateDanados();
                }
            }

            return true;
        }
    }

    public class DetalleArticuloDanados : EntityClass
    {
        public int? IdDetalleArticuloDanados { get; set; }
        public int? IdArticuloDanados { get; set; }
        public int? IdArticuloExistencia { get; set; }
        public int? Cantidad { get; set; }
        public List<Existencias> Existencias { get; set; }
        public Object UpdateDanados()
        {
            if (this.Existencias != null)
            {
                foreach (var existe in this.Existencias)
                {
                    existe.IdArticuloExistencia = this.IdArticuloExistencia;
                    existe.Update("IdArticuloExistencia");
                }
            }
            return true;
        }
    }

    public class DevolucionVenta : EntityClass
    {
        public int? IdDevolucionVenta { get; set; }
        public int? IdArticuloExistencia { get; set; }
        public int? IdVenta { get; set; }
        public int? IdUsuario { get; set; }
        public DateTime? Fecha { get; set; }
        public string Descripcion { get; set; }
        public Decimal? TotalVenta { get; set; }
        public int? Cantidad { get; set; }
        public List<Venta> Ventas { get; set; }
        public List<DetalleVenta> DetalleVenta { get; set; }
        //public List<DetalleDevolucionVenta> DetalleDevolucionVenta { get; set; }
        public List<Existencias> Existencias { get; set; }

        public Object SaveDevoluciones()
        {
            this.IdDevolucionVenta = (Int32)this.Save();
            if (this.Ventas != null)
            {
                foreach (var venta in this.Ventas)
                {
                    venta.IdVenta = this.IdVenta;
                    venta.Update("IdVenta");

                }
                foreach (var detalle in this.DetalleVenta)
                {
                    detalle.IdVenta = this.IdVenta;
                    detalle.Update("IdDetalleVenta");
                }
                foreach (var exist in this.Existencias)
                {
                    exist.IdArticuloExistencia = this.IdArticuloExistencia;
                    exist.Estado = true;
                    exist.Update("IdArticuloExistencia");
                }
            }
            return true;
        }
        public Object SaveNewVenta()
        {
            if (this.Ventas != null)
            {
                foreach (var venta in this.Ventas)
                {
                    //venta.Update("IdVenta");
                    venta.IdVenta = (Int32)Save();
                    foreach (var detalleventa in this.DetalleVenta)
                    {
                        detalleventa.IdVenta = venta.IdVenta;
                        detalleventa.IdDetalleVenta = (Int32)Save();
                    }
                }
                //foreach (var detalle in this.DetalleVenta)
                //{
                //    detalle.Update("IdDetalleVenta");
                //    detalle.IdDetalleVenta = (Int32)this.Save();
                //}
            }
            return true;
        }
    }

    //public class DetalleDevolucionVenta : EntityClass
    //{
    //    public int? IdDetalleDevolucionVenta { get; set; }
    //    public int? IdDevolucionVenta { get; set; }
    //    public int? IdArticuloExistencia { get; set; }
    //    public int? IdArticulo { get; set; }
    //    public Decimal? Cantidad { get; set; }
    //    public Decimal? Total { get; set; }
    //    public List<Existencias> Existencias { get; set; }
    //    public Object SaveDetallesDevolucion()
    //    {
    //        if (this.Existencias != null)
    //        {
    //            foreach (var exist in this.Existencias)
    //            {
    //                exist.IdArticuloExistencia = exist.IdArticuloExistencia;
    //                exist.Stock = (int?)(exist.Stock + this.Cantidad);
    //                exist.Update("IdArticuloExistencia");
    //            }

    //        }
    //        return true;
    //    }
    //}

}
