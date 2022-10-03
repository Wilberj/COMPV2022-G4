import { FormComponent } from "../../CoreComponents/FormComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { Usuario, ViewModuloCompra } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { Articulo, CompraArticulo, DetalleCompra, Proveedor } from "../../Model/DatabaseModel.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { AgregarUsuarioComponent } from "./Components/AgregarUsuarioComponent.js";
import { AgregarProveedorComponent } from "./Components/AgregarProveedorComponent.js";
import { AgregarDetalleComponent } from "./Components/AgregarDetalleComponent.js";

import { AgregarArticuloComponent } from "./Components/AgregarArticuloComponent.js";

window.onload = async () => {
	const Usuarios = [];
	const Proveedores = [];
	const Articulos = [];
	const DetalleCompras = [];
	const Total = [];
	var suma = 0;
	const NuevaCompra = {
		DetalleCompras: DetalleCompras,

		//Articulos: Articulos
	};

	const dataU = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetUsuario");
	const dataP = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetProveedor");
	AppMain.append(
		Render.Create({ tagName: "h1", innerText: "CREACION DE NUEVA COMPRA", class: "text_primary" })
	);

	AppMain.append(
		Render.Create({
			class: "FormContainer1",
			children: [
				{
					tagName: "input",
					type: "button",
					className: "btn",
					value: "Guardar Compra",
					onclick: async () => {
						//validadcion
						const response = await AjaxTools.PostResquest(
							"../api/CompraModulo/SaveCompra",
							NuevaCompra,

							Total.forEach(function (tot) {
								suma += tot;
							}),
							console.log(suma),
							(NuevaCompra.SubTotal = suma),
							//suma = JSON.parse(JSON.stringify(NuevaCompra.SubTotal)),

							//for (let i = 0; i < Total.length; i++) {
							//	suma += Total[i];
							//}

							(NuevaCompra.IVA = NuevaCompra.SubTotal * 0.16),
							(NuevaCompra.TotalCosto =
								parseInt(NuevaCompra.SubTotal) +
								parseInt(NuevaCompra.IVA) -
								parseInt(NuevaCompra.Descuento))
						);
						if (response == true) {
							AppMain.append(
								new ModalComponent(
									Render.Create({
										tagName: "h1",

										// innerText: `Compra Guardada \n <p>Total</p> Subtotal: C$${NuevaCompra.SubTotal}  \n IVA: C$${NuevaCompra.IVA}  \n Descuento: C$${NuevaCompra.Descuento} \n Total: C$${NuevaCompra.TotalCosto}`,

										innerHTML: `
									</table>
										<table border="1">
										<!--tr define table row-->
										<tr>
											<th>Fecha: ${NuevaCompra.Fecha}</th>
										</tr>
										<tr>
											<!--tr define table head-->
											<th>SubTotal</th>
											<th>IVA</th>
											<th>Descuento</th>
											<th>Total</th>
										</tr>
										<tr>
											<!--td define table data-->
											<td>C$${NuevaCompra.SubTotal}</td>
											<td>C$${NuevaCompra.IVA}</td>
											<td>C$${NuevaCompra.Descuento}</td>
											<td>C$${NuevaCompra.TotalCosto}</td>
										</tr>
										
									</table>`

									})
								)
							);
						}
					},
				},
			],
		})
	);
	const FormCompra = new FormComponent({
		EditObject: NuevaCompra,
		Model: new CompraArticulo({
			IdUsuario: {
				type: "select",
				Dataset: dataU.map((d) => ({ id: d.IdUsuario, desc: d.NombreUsuario })),
			},
			IdProveedor: {
				type: "select",
				Dataset: dataP.map((d) => ({ id: d.IdProveedor, desc: d.Nombreproveedor })),
			},
		}),
	});
	AppMain.append(FormCompra);

	AppMain.append(
		Render.Create({ tagName: "h2", innerText: "DETALLE DE COMPRA", class: "text_primary" })
	);
	const TableDetalle = new TableComponent({
		ModelObject: new DetalleCompra(),
		Dataset: DetalleCompras,
		Funtions: [
			{
				name: "Remove",
				action: async (articulo) => {
					const articulof = DetalleCompras.find(
						(x) => x.IdDetalleCompra == articulo.IdDetalleCompra
					);
					if (articulof != null) {
						DetalleCompras.splice(DetalleCompras.indexOf(articulof), 1);
						TableDetalle.DrawTableComponent();
					}
				},
			},
		],
	});

	TableDetalle.filter.append(
		Render.Create({
			tagName: "input",
			type: "button",
			className: "btn",
			value: "Agregar Detalle de compra",
			onclick: async () => {
				const Modal = new ModalComponent(
					new AgregarDetalleComponent((detalle) => {
						// if (
						// 	DetalleCompras.filter(
						// 		(x) =>
						// 			x.IdArticulo == detalle.IdArticulo &&
						// 			x.IdColor == detalle.IdColor &&
						// 			x.IdTalla == detalle.IdTalla &&
						// 			x.IdMarca == detalle.IdMarca &&
						// 			x.IdMaterial == detalle.IdMaterial &&
						// 			x.IdCategoria == detalle.IdCategoria &&
						// 			x.IdModelo == detalle.IdModelo

						// 	).length > 0
						// ) {
						// 	DetalleCompras.Stock =+ DetalleCompras.Stock;
						// }
						DetalleCompras.push(detalle);
						Total.push(detalle.TotalCostoDetalle);
						// var total = innerText.CompraArticulo.TotalCosto;
						console.log(Total);
						//console.log(DetalleCompras);
						Modal.Close();
						TableDetalle.DrawTableComponent();
					})
				);
				AppMain.append(Modal);
			},
		})
	);
	AppMain.append(TableDetalle);
};
