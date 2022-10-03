import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { DetalleCompra } from "../../../Model/DatabaseModel.js";
import { AjaxTools } from "../../utility.js";

class DetalleCompraComp extends HTMLElement {
	constructor(action = () => { }) {
		super();
		this.Dataset = [];
		this.action = action;
		this.Draw();
	}
	connectedCallback() { }
	Draw = async () => {
		this.Dataset = await AjaxTools.PostResquest("../../api/CompraModulo/ChargeDetalleCompra");

		this.Table = new TableComponent({

			Dataset: this.Dataset,
			Funtions: [
				// {
				// 	name: "Remover",
				// 	action: async (Dato) => {
				// 		const Datof = this.Dataset.find((x) => x.IdCompra == Dato.IdCompra);
				// 		if (Datof != null) {
				// 			this.Dataset.splice(this.Dataset.indexOf(Datof), 1);
				// 			this.Table.DrawTableComponent();
				// 		}
				// 	},
				// },
				{
					name: "Agregar Detalle",
					action: async (Dato) => {
						this.action(Dato);
					},
				},
			],
		});
		this.append(this.Table);
	};
}
customElements.define("w-agregar-detallecompra", DetalleCompraComp);
export { DetalleCompraComp };