using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class ViewModuloCompra : EntityClass
    {
        public int? IdCompra { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdProveedor { get; set; }
        public int? CódigoArticulo { get; set; }
        public string NombreArticulo { get; set; }
        public string Nombreproveedor { get; set; }
        public string NombreUsuario { get; set; }
        public DateTime? Fecha { get; set; }
        public int? Cantidad { get; set; }
        public Decimal? TotalCostoDetalle { get; set; }
        public Decimal? TotalCosto { get; set; }
        public Decimal? SubTotal { get; set; }
        public Decimal? IVA { get; set; }
        public Decimal? Descuento { get; set; }
        public int? IdArticulo { get; set; }
        public int? IdDetalleCompra { get; set; }
    }

    public class ViewDevoluciones : EntityClass
    {
        public string NombreArticulo { get; set; }
        public string Nombreproveedor { get; set; }
        public int? Cantidad { get; set; }
        public DateTime? Fecha { get; set; }
        public int? IdCompra { get; set; }
        public int? IdDetalleCompra { get; set; }
        public Decimal? PrecioCompra { get; set; }
        public string DescripcionArticulo { get; set; }
    }

    public class ViewCompraDevoluciones : EntityClass
    {
        public int? IdCompra { get; set; }
        public DateTime? Fecha { get; set; }
        public Decimal? TotalCosto { get; set; }
        public int? Cantidad { get; set; }
        public Decimal? PrecioCompra { get; set; }
        public string NombreArticulo { get; set; }
        public string Nombreproveedor { get; set; }
        public string NombreUsuario { get; set; }
        public bool? Estado { get; set; }
    }
    public class ViewDevolucionesDetalleCompra : EntityClass
    {
        public string NombreArticulo { get; set; }
        public int? Cantidad { get; set; }
        public Decimal? PrecioCompra { get; set; }
        public string Nombreproveedor { get; set; }
        public string NombreUsuario { get; set; }
        public DateTime? Fecha { get; set; }
        public Decimal? TotalCosto { get; set; }
        public Decimal? TotalCostoDetalle { get; set; }
        public int? IdCompra { get; set; }
    }

    public class ViewCompraDetalle : EntityClass
    {
        public int? IdDetalleCompra { get; set; }
        public int? IdCompra { get; set; }
        public int? IdProveedor { get; set; }
        public int? Cantidad { get; set; }
        public int? PrecioCompra { get; set; }
        public int? TotalCostoDetalle { get; set; }
        public int? IVA { get; set; }
        public int? Descuento { get; set; }
        public Boolean Estado { get; set; }
        public int? SubTotal { get; set; }
        public int? TotalCosto { get; set; }
    }
    public class ViewExistenciaCat : EntityClass
    {
        public string NombreMarca { get; set; }
        public string NombreMaterial { get; set; }
        public string NombreModelo { get; set; }
        public string NombreColor { get; set; }
        public int? CódigoArticulo { get; set; }
        public string NombreArticulo { get; set; }
        public string NombreCategoria { get; set; }
    }



    public class ViewArticulosSeleccionarDanados : EntityClass
    {
        public string NombreBodega { get; set; }
        public string NombreArticulo { get; set; }
        public int? PrecioUnidadVenta { get; set; }
        public int? PrecioUnidadCompra { get; set; }
        public int? Stock { get; set; }
        public int? IdArticuloExistencia { get; set; }
    }

    public class ViewArticulosDanados : EntityClass
    {
        public int? Cantidad { get; set; }
        public string Descripcion { get; set; }
        public int? PrecioUnidadVenta { get; set; }
        public int? PrecioUnidadCompra { get; set; }
        public string NombreArticulo { get; set; }
        public string NombreUsuario { get; set; }
        public int? IdUsuario { get; set; }
    }
    public class ViewExistenciasVentas : EntityClass
    {
        public int? IdArticuloExistencia { get; set; }
        public int? Stock { get; set; }
        public int? PrecioUnidadVenta { get; set; }
        public int? Talla { get; set; }
        public string NombreMarca { get; set; }
        public string NombreColor { get; set; }
        public string NombreCategoria { get; set; }
        public string NombreMaterial { get; set; }
        public string NombreModelo { get; set; }
    }

    public class VentasRealizadas : EntityClass
    {
        public DateTime? FechaFactura { get; set; }
        public string NombreCliente { get; set; }
        public Decimal? TotalVenta { get; set; }
        public Decimal? IVA { get; set; }
        public Decimal? DescuentoVenta { get; set; }
        public Decimal? SubTotal { get; set; }
        public Decimal? SumaRecibida { get; set; }
        public Decimal? SumaCambio { get; set; }
        public string NombreUsuario { get; set; }
        public int? IdUsuario { get; set; }
    }
    public class ViewCompraL : EntityClass
    {
        public int? IdCompra { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdProveedor { get; set; }
        public string NombreUsuario { get; set; }
        public string Nombreproveedor { get; set; }
        public DateTime? Fecha { get; set; }
        public Decimal? Descuento { get; set; }
        public Decimal? IVA { get; set; }
        public Decimal? SubTotal { get; set; }
        public Decimal? TotalCosto { get; set; }
        public bool? Estado { get; set; }
    }
    public class ViewDetalleCompraDevolucion : EntityClass
    {
        public int? IdDetalleCompra { get; set; }
        public int? IdCompra { get; set; }
        public int? IdArticulo { get; set; }
        public string NombreArticulo { get; set; }
        public Decimal? PrecioCompra { get; set; }
        public int? Cantidad { get; set; }
        public Decimal? TotalCostoDetalle { get; set; }
        public bool? Estado { get; set; }
    }

    public class ViewVentasDevolucion : EntityClass
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
    }
    public class ViewDevolucionCompleta : EntityClass
    {
        public int? IdVenta { get; set; }
        public DateTime? Fecha { get; set; }
        public int? CódigoArticulo { get; set; }
        public string NombreArticulo { get; set; }
        public string Descripcion { get; set; }
        public Decimal? Cantidad { get; set; }
        public Decimal? TotalVenta { get; set; }
    }

}
