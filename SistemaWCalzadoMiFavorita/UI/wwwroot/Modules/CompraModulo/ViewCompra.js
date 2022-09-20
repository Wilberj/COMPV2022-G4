import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ViewModuloCompra } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";

window.onload = async () => {
	AppMain.append(
		Render.Create({ tagName: "h1", innerText: "MAESTRO DETALLE COMPRA", class: "text_primary" })
	);
	AppMain.append(
		Render.Create({
			class: "FormContainer2",
			children: [
				{
					tagName: "input",
					type: "button",
					className: "btn",
					value: "Registrar Nueva Compra",
					onclick: async () => {
						//Carga vista de nuevo
						window.location = "./ViewCrearCompra"
					},
				},
			],
		})
	);
	const MisCompras = await AjaxTools.PostResquest("../api/CompraModulo/Compra");
	AppMain.append(
		new TableComponent({
			Dataset: MisCompras,
			ModelObject: new ViewModuloCompra(),
			Function: {
				name: "Detalles",
				action: async (Detalle) => {
					//carga detalle de la compra
				},
			},
		})
	);
};
