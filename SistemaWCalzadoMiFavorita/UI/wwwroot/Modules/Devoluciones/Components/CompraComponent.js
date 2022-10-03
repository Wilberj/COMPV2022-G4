import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { AjaxTools } from "../../utility.js";

class CompraComponent extends HTMLElement {
	constructor(action = () => { }) {
		super();
		this.Dataset = [];
		this.action = action;
		this.Draw();
	}
	connectedCallback() { }
	Draw = async () => {
		this.Dataset = await AjaxTools.PostResquest("../api/CompraModulo/ChargeCompras");

		this.Table = new TableComponent({
			Dataset: this.Dataset,
			Funtions: [
				{
					name: "Agregar Compra",
					action: async (Dato) => {
						this.action(Dato);
					},
				},
			],
		});
		this.append(this.Table);
	};
}
customElements.define("w-agregar-compraarticulo", CompraComponent);
export { CompraComponent };