import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { AjaxTools } from "../../utility.js";

class AgregarUsuarioComponent extends HTMLElement {
	constructor(action = () => { }) {
		super();
		this.Dataset = [];
		this.action = action;
		this.Draw();
	}
	connectedCallback() { }
	Draw = async () => {
		this.Dataset = await AjaxTools.PostResquest("../api/CompraModulo/ChargeUsuario");
		this.Table = new TableComponent({
			Dataset: this.Dataset,
			Funtions: [
				{
					name: "Agregar Usuario",
					action: async (Dato) => {
						this.action(Dato);
					},
				},
			],
		});
		this.append(this.Table);
	};
}
customElements.define("w-agregar-usuario", AgregarUsuarioComponent);
export { AgregarUsuarioComponent };
