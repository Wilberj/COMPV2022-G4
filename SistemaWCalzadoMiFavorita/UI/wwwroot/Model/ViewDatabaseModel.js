class ViewModuloCompra {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdCompra = { type: "number", primary: true };
	IdUsuario = { type: "number", hidden: true };
	IdProveedor = { type: "number", hidden: true };
	Fecha = { type: "date" };
	TotalCosto = { type: "number" };
	SubTotal = { type: "number" };
	IVA = { type: "number" };
	Descuento = { type: "number" };
	IdDetalleCompra = { type: "number", hidden: true };
	IdArticulo = { type: "number", hidden: true };
	Cantidad = { type: "number" };
	TotalCostoDetalle = { type: "number" };
	CódigoArticulo = { type: "number" };
	NombreUsuario = { type: "text" };
	Nombreproveedor = { type: "text" };
	NombreArticulo = { type: "text" };
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
class ViewDevoluciones {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	NombreArticulo = { type: "text", primary: true };
	Nombreproveedor = { type: "text" };
	Cantidad = { type: "number" };
	Fecha = { type: "date" };
	IdCompra = { type: "number" };
	IdDetalleCompra = { type: "number" };
	PrecioCompra = { type: "number" };
	DescripcionArticulo = { type: "text" };
}
export { ViewDevoluciones };
class ViewCompraDevoluciones {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdCompra = { type: "number", primary: true };
	Fecha = { type: "date" };
	TotalCosto = { type: "number" };
	Cantidad = { type: "number" };
	PrecioCompra = { type: "number" };
	NombreArticulo = { type: "text" };
	Nombreproveedor = { type: "text" };
	NombreUsuario = { type: "text" };
}
export { ViewCompraDevoluciones };
class ViewDevolucionesDetalleCompra {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	NombreArticulo = { type: "text", primary: true };
	Cantidad = { type: "number" };
	PrecioCompra = { type: "number" };
	Nombreproveedor = { type: "text" };
	NombreUsuario = { type: "text" };
	Fecha = { type: "date" };
	TotalCosto = { type: "number" };
	TotalCostoDetalle = { type: "number" };
	IdCompra = { type: "number" };
}
export { ViewDevolucionesDetalleCompra };
class ViewArticuloDanados {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdArticulo = { type: "number", primary: true };
	IdArticuloExistencia = { type: "number" };
	NombreArticulo = { type: "text" };
	DescripcionArticulo = { type: "text" };
	Stock = { type: "number" };
}
export { ViewArticuloDanados };
class ViewCompraDetalle {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdDetalleCompra = { type: "number", primary: true };
	IdCompra = { type: "number" };
	IdProveedor = { type: "number", hidden: true };
	Cantidad = { type: "number" };
	PrecioCompra = { type: "number" };
	TotalCostoDetalle = { type: "number", hidden: true };
	IVA = { type: "number" };
	Descuento = { type: "number" };
	Estado = { type: "number" };
	SubTotal = { type: "number" };
	TotalCosto = { type: "number" };
}
export { ViewCompraDetalle };
class View_Danados {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	CódigoArticulo = { type: "number", primary: true };
	NombreArticulo = { type: "text" };
	NombreBodega = { type: "text" };
	NombreUsuario = { type: "text" };
	Cantidad = { type: "number" };
	Descripcion = { type: "text" };
	PrecioUnidadVenta = { type: "number" };
	PrecioUnidadCompra = { type: "number" };
	Fecha = { type: "date" };
}
export { View_Danados };
class ViewExistenciaCat {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	NombreMarca = { type: "text", primary: true };
	NombreMaterial = { type: "text" };
	NombreModelo = { type: "text" };
	NombreColor = { type: "text" };
	CódigoArticulo = { type: "number" };
	NombreArticulo = { type: "text" };
	NombreCategoria = { type: "text" };
}
export { ViewExistenciaCat };
class ViewNArticulo {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	NombreArticulo = { type: "text", primary: true };
	NombreBodega = { type: "text" };
	Cantidad = { type: "number" };
	Descripcion = { type: "text" };
	NombreUsuario = { type: "text" };
	DescripcionArticulo = { type: "text" };
	FechaRegistro = { type: "date" };
}
export { ViewNArticulo };
