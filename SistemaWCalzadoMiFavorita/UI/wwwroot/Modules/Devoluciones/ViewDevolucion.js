import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { DevolucionesCompra } from "../../Model/DatabaseModel.js";
import { ViewDevoluciones } from "../../Model/ViewDatabaseModel.js";

import { AjaxTools, Render } from "../utility.js";

window.onload = async () => {
	AppMain.append(
		Render.Create({ tagName: "h1", innerText: "DEVOLUCIONES DE COMPRA", class: "text_primary" })
	);
	AppMain.append(
		Render.Create({
			class: "FormContainer2",
			children: [
				{
					tagName: "input",
					type: "button",
					className: "btn",
					value: "Registrar Nueva Devolucion",
					onclick: async () => {
						//Carga vista de nuevo
						window.location = "./ViewCrearDevolucion"
					},
				},
			],
		})
	);
	const Devolucion = await AjaxTools.PostResquest("../api/Devoluciones/Devoluciones");
	AppMain.append(
		new TableComponent({
			Dataset: Devolucion,
			ModelObject: new ViewDevoluciones(),
			Function: {
				name: "Detalles",
				action: async (Detalle) => {
					//carga detalle de la compra

				},
			},
		})
	);
};