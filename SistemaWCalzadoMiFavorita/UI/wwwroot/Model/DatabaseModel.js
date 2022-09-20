class Articulo {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdArticulo = { type: "number", primary: true };
	CódigoArticulo = { type: "number" };
	NombreArticulo = { type: "text" };
	DescripcionArticulo = { type: "text" };
	FechaRegistro = { type: "date", hidden: true };
	Estado = { type: "checkbox" };
}
export { Articulo };
class Bodega {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdBodega = { type: "number", primary: true };
	NombreBodega = { type: "text" };
	IdArticulo = { type: "number" };
}
export { Bodega };
class Categoria {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdCategoria = { type: "number", primary: true };
	NombreCategoria = { type: "text" };
	DescripcionCategoria = { type: "text" };
}
export { Categoria };
class Color {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdColor = { type: "number", primary: true };
	NombreColor = { type: "text" };
	FechaRegistro = { type: "date" };
}
export { Color };
class CompraArticulo {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdCompra = { type: "number", primary: true };
	IdUsuario = { type: "number" };
	IdProveedor = { type: "number" };
	Fecha = { type: "date" };
	IVA = { type: "number" };
	Descuento = { type: "number" };
	SubTotal = { type: "number" };
	TotalCosto = { type: "number" };
}
export { CompraArticulo };
class DetalleCompra {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdDetalleCompra = { type: "number", primary: true };
	IdCompra = { type: "number", hidden: true };
	IdArticulo = { type: "number", hidden: true };
	Cantidad = { type: "number", hidden: true };
	PrecioCompra = { type: "number" };
	TotalCostoDetalle = { type: "number", hidden: true };
}
export { DetalleCompra };
class DetalleVenta {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdDetalleVenta = { type: "number", primary: true };
	IdVenta = { type: "number" };
	IdArticuloExistencia = { type: "number" };
	PrecioVenta = { type: "number" };
	CantidadVenta = { type: "number" };
}
export { DetalleVenta };
class Devoluciones {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdDevolucion = { type: "number", primary: true };
	IdArticulo = { type: "number" };
	IdDetalleVenta = { type: "number" };
	IdDetalleCompra = { type: "number" };
	FechaRegistro = { type: "date" };
	Descripcion = { type: "text" };
}
export { Devoluciones };
class Existencias {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdArticuloExistencia = { type: "number", primary: true };
	IdCompra = { type: "number", hidden: true };
	IdArticulo = { type: "number", hidden: true };
	IdColor = { type: "number" };
	IdTalla = { type: "number" };
	IdMaterial = { type: "number" };
	IdCategoria = { type: "number" };
	IdModelo = { type: "number" };
	IdMarca = { type: "number" };
	PrecioUnidadCompra = { type: "number" };
	PrecioUnidadVenta = { type: "number" };
	Stock = { type: "number" };
	Estado = { type: "checkbox" };
}
export { Existencias };
class Marca {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdMarca = { type: "number", primary: true };
	NombreMarca = { type: "text" };
	FechaRegistro = { type: "date" };
}
export { Marca };
class Material {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdMaterial = { type: "number", primary: true };
	NombreMaterial = { type: "text" };
	FechaRegistro = { type: "date" };
}
export { Material };
class Modelo {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdModelo = { type: "number", primary: true };
	NombreModelo = { type: "text" };
	Descripción = { type: "text" };
}
export { Modelo };
class Proveedor {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdProveedor = { type: "number", primary: true };
	Nombreproveedor = { type: "text" };
	Dirección = { type: "text" };
	Teléfono = { type: "number" };
	Correo = { type: "text" };
}
export { Proveedor };
class Rol {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdRol = { type: "number", primary: true };
	NombreRol = { type: "text" };
	Descripción = { type: "text" };
}
export { Rol };
class Talla {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdTalla = { type: "number", primary: true };
	NombreTalla = { type: "text" };
	FechaRegistro = { type: "date" };
}
export { Talla };
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
class Venta {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdVenta = { type: "number", primary: true };
	IdUsuario = { type: "number" };
	IdArticulo = { type: "number" };
	FechaFactura = { type: "date" };
	NombreCliente = { type: "text" };
	TotalVenta = { type: "number" };
	IVA = { type: "number" };
	Cantidad = { type: "number" };
	SumaRecibida = { type: "number" };
	SumaCambio = { type: "number" };
}
export { Venta };
