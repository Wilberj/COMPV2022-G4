import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { AjaxTools } from "../../utility.js";

class AgregarArticuloComponent extends HTMLElement {
	constructor(action = () => { }) {
		super();
		this.Dataset = [];
		this.action = action;
		this.Draw();
	}
	connectedCallback() { }
	Draw = async () => {
		this.Dataset = await AjaxTools.PostResquest("../api/CompraModulo/ChargeArticulo");

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
customElements.define("w-agregar-articulo", AgregarArticuloComponent);
export { AgregarArticuloComponent };
