import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { ArticuloDanados } from "../../../Model/DatabaseModel.js";
import { ViewArticuloDanados } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools } from "../../utility.js";

class AgregarArticuloDanadoComponent extends HTMLElement {
	constructor(action = () => { }) {
		super();
		this.Dataset = [];
		this.action = action;
		this.Draw();
	}
	connectedCallback() { }
	Draw = async () => {
		this.Dataset = await AjaxTools.PostResquest("../api/ArticuloDanados/ChargeArticuloDanados");

		this.Table = new TableComponent({

			Dataset: this.Dataset,
			Funtions: [
				{
					name: "Agregar Articulo",
					action: async (Dato) => {
						this.action(Dato);
					},
				},
			],
		});
		this.append(this.Table);
	};
}
customElements.define("w-agregar-articulo", AgregarArticuloDanadoComponent);
export { AgregarArticuloDanadoComponent };
