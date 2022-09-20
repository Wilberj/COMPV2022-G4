class ViewModuloCompra {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdCompra = { type: "number", primary: true };
	IdUsuario = { type: "number", hidden: true };
	IdProveedor = { type: "number", hidden: true };
	CódigoArticulo = { type: "number" };
	NombreArticulo = { type: "text" };
	Nombreproveedor = { type: "text" };
	NombreUsuario = { type: "text" };
	Fecha = { type: "date" };
	Cantidad = { type: "number" };
	TotalCostoDetalle = { type: "number" };
	TotalCosto = { type: "number" };
	SubTotal = { type: "number" };
	IVA = { type: "number" };
	Descuento = { type: "number" };
	IdArticulo = { type: "number", hidden: true };
	IdDetalleCompra = { type: "number", hidden: true };
}
export { ViewModuloCompra };

class Usuario {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdUsuario = { type: "number", primary: true };
	Cedula = { type: "text" };
	NombreUsuario = { type: "text" };
	ApellidoUsuario = { type: "text" };
	DireccionUsuario = { type: "text" };
	TelefonoUsuario = { type: "number" };
	Correo = { type: "text" };
	IdRol = { type: "number" };
}
export { Usuario };
