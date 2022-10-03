import { FormComponent } from "../../CoreComponents/FormComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AjaxTools, Render } from "../utility.js";
import {
	CompraArticulo,
	DetalleDevolucionCompra,
	DevolucionesCompra,
	Proveedor,
} from "../../Model/DatabaseModel.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { AgregarProveedorComponent } from "../CompraModulo/Components/AgregarProveedorComponent.js";
import { AgregarDetalleDevolucionComponent } from "../Devoluciones/Components/AgregarDetalleDevolucionComponent.js";
import { AgregarCompraComponent } from "../CompraModulo/Components/AgregarCompraComponent.js";
import { ViewCompraDevoluciones } from "../../Model/ViewDatabaseModel.js";
import { AgregarCompraDevolucionesComponent } from "./Components/AgregarCompraDevolucionesComponent.js";

window.onload = async () => {
	const Compra = [];
	const Proveedores = [];
	const DetalleDevolucion = [];
	const DetalleDevo = [];
	const NuevaDevolucion = {
		DetalleDevoluciones: DetalleDevolucion,
		Compras: Compra,
	};
	const dataC = await AjaxTools.PostResquest("../api/CompraModulo/ChargeCompras");
	AppMain.append(
		Render.Create({
			tagName: "h1",
			innerText: "CREACION DE NUEVA DEVOLUCION",
			class: "text_primary",
		})
	);

	AppMain.append(
		Render.Create({
			class: "FormContainer1",
			children: [
				{
					tagName: "input",
					type: "button",
					className: "btn",
					value: "Guardar Devolucion",
					onclick: async () => {
						//validadcion

						const response = await AjaxTools.PostResquest(
							"../api/Devoluciones/SaveDevoluciones",
							NuevaDevolucion,
							NuevaDevolucion.IdCompra = DetalleDevolucion[0].IdCompra,
							//NuevaDevolucion.IdProveedor = DetalleDevolucion[0].IdProveedor,
							//console.log(NuevaDevolucion.IdCompra),

						);
						if (response == true) {
							AppMain.append(
								new ModalComponent(
									Render.Create({
										tagName: "h1",
										innerText: "Devolucion Guardada",
									})
								)
							);
						}
					},
				},
			],
		})
	);
	const FormDevolucion = new FormComponent({
		EditObject: NuevaDevolucion,
		Model: new DevolucionesCompra({
			//   IdCompra: {
			//   	type: "select",
			//   	Dataset: dataC.map((d) => ({ id: d.IdCompra, desc: d.IdCompra })),
			//   },
		}),
	});
	AppMain.append(FormDevolucion);

	AppMain.append(
		Render.Create({ tagName: "h2", innerText: "DETALLE DE DEVOLUCION", class: "text_primary" })
	);

	// const TableCompra = new TableComponent({
	// 	ModelObject: new ViewCompraDevoluciones(),
	// 	Dataset: Compra,
	// 	Funtions: [
	// 		{
	// 			name: "Remove",
	// 			action: async (compra) => {
	// 				const compraf = Compra.find((x) => x.IdCompra == compra.IdCompra);
	// 				if (compraf != null) {
	// 					Compra.splice(Compra.indexOf(compraf), 1);
	// 					TableCompra.DrawTableComponent();
	// 				}
	// 			},
	// 		},
	// 	],
	// });

	// TableCompra.filter.append(
	// 	Render.Create({
	// 		tagName: "input",
	// 		type: "button",
	// 		className: "btn",
	// 		value: "Agregar Compra",
	// 		onclick: async () => {
	// 			const Modal = new ModalComponent(
	// 				new AgregarCompraDevolucionesComponent((detalle) => {
	// 					if (Compra.length > 0) {
	// 						alert("Solo puede seleccionar una compra");
	// 						return;
	// 					}

	// 					Compra.push(detalle);
	// 					Modal.Close();
	// 					TableCompra.DrawTableComponent();
	// 					NuevaDevolucion.Compras.IdCompra = Compra[0].IdCompra;
	// 					NuevaDevolucion.Compras.IdProveedor = Compra[0].IdProveedor;
	// 					console.log(detalle);
	// 					console.log(Compra);
	// 				})
	// 			);
	// 			AppMain.append(Modal);
	// 		},
	// 	})
	// );
	// AppMain.append(TableCompra);

	/**------------------------------------------------------------------------------------------------------ */

	const TableDetalleDevolucionCompra = new TableComponent({
		ModelObject: new DetalleDevolucionCompra(),
		Dataset: DetalleDevolucion,
		Functions: [
			{
				name: "eliminar",
				action: async (detaeli) => {
					const detalleelimina = DetalleDevolucion.find(
						(x) => x.IdDetalleCompra == detaeli.IdDetalleCompra
					);
					if (detalleelimina != null) {
						DetalleDevolucion.splice(DetalleDevolucion.indexOf(detaeli), 1);
						TableDetalleDevolucionCompra.DrawTableComponent();
					}
				},
			},
		],
	});

	TableDetalleDevolucionCompra.filter.append(
		Render.Create({
			tagName: "input",
			type: "button",
			className: "btn_primary",
			value: "Anadir detalle",
			onclick: async () => {
				const Modal = new ModalComponent(
					new AgregarDetalleDevolucionComponent((compra) => {
						if (
							DetalleDevolucion.filter(
								(x) => x.IdCompra == compra.IdCompra
							).length > 0
						) {
							alert("El Detalle ya existes");
							return;
						}
						DetalleDevolucion.push(compra);
						Modal.Close();
						TableDetalleDevolucionCompra.DrawTableComponent();
						//NuevaDevolucion.Compras.IdCompra = DetalleDevolucion[0].IdCompra;
						//NuevaDevolucion.Compras.IdProveedor = DetalleDevolucion[0].IdProveedor;
						console.log(compra);
						console.log(DetalleDevolucion);
					})
				);
				AppMain.append(Modal);
			},
		})
	);

	AppMain.append(TableDetalleDevolucionCompra);
};
