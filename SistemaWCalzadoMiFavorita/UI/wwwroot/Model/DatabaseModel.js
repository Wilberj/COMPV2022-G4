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
	IdUsuario = { type: "number", hidden: true };
	IdProveedor = { type: "number" };
	Fecha = { type: "date" };
	IVA = { type: "number", hidden: true };
	Descuento = { type: "number" };
	SubTotal = { type: "number", hidden: true };
	TotalCosto = { type: "number", hidden: true };
	Estado = { type: "checkbox" };
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
	IdArticulo = { type: "number" };
	Cantidad = { type: "number" };
	PrecioCompra = { type: "number" };
	TotalCostoDetalle = { type: "number" };
	Estado = { type: "checkbox" };
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
class Existencias {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdArticuloExistencia = { type: "number", primary: true };
	IdCompra = { type: "number", hidden: true };
	IdArticulo = { type: "number", hidden: true };
	IdColor = { type: "number", hidden: true };
	IdMaterial = { type: "number", hidden: true };
	IdCategoria = { type: "number", hidden: true };
	IdModelo = { type: "number", hidden: true };
	IdMarca = { type: "number", hidden: true };
	Talla = { type: "number" };
	IdBodega = { type: "number", hidden: true };
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
class DevolucionesCompra {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdDevolucion = { type: "number", primary: true };
	IdCompra = { type: "number", hidden: true };
	Fecha = { type: "date" };
}
export { DevolucionesCompra };
class DetalleDevolucionCompra {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdDetalleDevolucionCompra = { type: "number", primary: true };
	IdDevolucion = { type: "number", hidden: true };
	Cantidad = { type: "number", hidden: true };
	Descripcion = { type: "text" };
}
export { DetalleDevolucionCompra };
class ArticuloDanados {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	IdArticuloDanados = { type: "number", primary: true };
	IdArticulo = { type: "number", hidden: true };
	IdUsuario = { type: "number", hidden: true };
	IdArticuloExistencia = { type: "number", hidden: true };
	IdBodega = { type: "number", hidden: true };
	Cantidad = { type: "number" };
	Descripcion = { type: "text" };
}

export { ArticuloDanados };
