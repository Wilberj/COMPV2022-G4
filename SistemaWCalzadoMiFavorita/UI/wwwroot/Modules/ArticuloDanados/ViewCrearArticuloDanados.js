import { FormComponent } from "../../CoreComponents/FormComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AjaxTools, Render } from "../utility.js";
import { ArticuloDanados } from "../../Model/DatabaseModel.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";

import { AgregarArticuloDanadoComponent } from "./Component/AgregarArticuloDanadoComponent.js";
import { AgregarDetalleArticuloDanadoComponent } from "./Component/AgregarDetalleArticuloDanadoComponent.js";
import { ViewArticuloDanados } from "../../Model/ViewDatabaseModel.js";

window.onload = async () => {
	const Existencias = [];
	const NuevoArticulo = {
		Existencias: Existencias,
	};
	const dataU = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetUsuario");
	const dataB = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetBodega");
	AppMain.append(
		Render.Create({
			tagName: "h1",
			innerText: "CREACION DE ARTICULO DAÑADOS",
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
					value: "Guardar ",
					onclick: async () => {
						//validadcion
						const response = await AjaxTools.PostResquest(
							"../api/ArticuloDanados/SaveArticuloDanado",
							NuevoArticulo
						);
						if (response == true) {
							AppMain.append(
								new ModalComponent(
									Render.Create({
										tagName: "h1",

										// innerText: `Compra Guardada \n <p>Total</p> Subtotal: C$${NuevoArticulo.SubTotal}  \n IVA: C$${NuevoArticulo.IVA}  \n Descuento: C$${NuevoArticulo.Descuento} \n Total: C$${NuevoArticulo.TotalCosto}`,
										innerText: "Articulo Dañado Guardado",
									})
								)
							);
						}
					},
				},
			],
		})
	);
	const FormArticuloDanados = new FormComponent({
		EditObject: NuevoArticulo,
		Model: new ArticuloDanados({
			IdUsuario: {
				type: "select",
				Dataset: dataU.map((d) => ({ id: d.IdUsuario, desc: d.NombreUsuario })),
			},
			IdBodega: {
				type: "select",
				Dataset: dataB.map((d) => ({ id: d.IdBodega, desc: d.NombreBodega })),
			},
			// IdProveedor: {
			// 	type: "select",
			// 	Dataset: data.map((d) => ({ id: d.IdProveedor, desc: d.Nombreproveedor })),
			// },
			IdArticuloExistencia: { type: "number", hidden: true },
			Cantidad: { type: "number", hidden: true },
			Descripcion: { type: "number", hidden: true },
		}),
	});

	AppMain.append(FormArticuloDanados);

	AppMain.append(
		Render.Create({ tagName: "h2", innerText: "DETALLE DE COMPRA", class: "text_primary" })
	);
	const TableArticuloDanado = new TableComponent({
		ModelObject: new ArticuloDanados({

		}),
		Dataset: Existencias,
		Funtions: [
			{
				name: "Remove",
				action: async (articulo) => {
					const articulof = Existencias.find((x) => x.IdArticulo == articulo.IdArticulo);
					if (articulof != null) {
						Existencias.splice(Existencias.indexOf(articulof), 1);
						TableArticuloDanado.DrawTableComponent();
					}
				},
			},
		],
	});

	TableArticuloDanado.filter.append(
		Render.Create({
			tagName: "input",
			type: "button",
			className: "btn",
			value: "Agregar Articulos Dañados",
			onclick: async () => {
				const Modal = new ModalComponent(
					new AgregarDetalleArticuloDanadoComponent((detalle) => {
						Existencias.push(detalle);

						Modal.Close();
						console.log(Existencias);
						TableArticuloDanado.DrawTableComponent();
						NuevoArticulo.IdArticulo = Existencias[0].IdArticulo;
						NuevoArticulo.IdArticuloExistencia = Existencias[0].IdArticuloExistencia;
						Existencias[0].IdUsuario = NuevoArticulo.IdUsuario;

						NuevoArticulo.Descripcion = Existencias[0].Descripcion;
						NuevoArticulo.Cantidad = Existencias[0].Cantidad;
						console.log(NuevoArticulo);
					})
				);
				AppMain.append(Modal);
			},
		})
	);
	AppMain.append(TableArticuloDanado);
};
