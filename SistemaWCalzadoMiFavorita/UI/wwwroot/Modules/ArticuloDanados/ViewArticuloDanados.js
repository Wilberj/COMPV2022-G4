import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ArticuloDanados } from "../../Model/DatabaseModel.js";
import { ViewArticuloDanados, ViewNArticulo, View_Danados } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";

window.onload = async () => {
	AppMain.append(
		Render.Create({ tagName: "h1", innerText: "ARTICULOS DAÑADOS", class: "text_primary" })
	);
	AppMain.append(
		Render.Create({
			class: "FormContainer2",
			children: [
				{
					tagName: "input",
					type: "button",
					className: "btn",
					value: "Registrar Nueva Articulo Dañado",
					onclick: async () => {
						//Carga vista de nuevo
						location.reload(),
					},
				},
			],
		})
	);
	const MisArticuloDanado = await AjaxTools.PostResquest("../api/ArticuloDanados/ArticuloDanados");
	AppMain.append(
		new TableComponent({
			Dataset: MisArticuloDanado,
			ModelObject: new ViewNArticulo(),
			Function: {
				name: "Detalles",
				action: async (Detalle) => {
					//carga detalle de la compra
				},
			},
		})
	);
};
