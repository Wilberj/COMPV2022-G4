import { FormComponent } from "../../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { Articulo, DetalleCompra, Existencias } from "../../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../../utility.js";
import { AgregarArticuloComponent } from "./AgregarArticuloComponent.js";
import { AgregarExistenciaComponent } from "./AgregarExistenciaComponent.js";

class AgregarDetalleComponent extends HTMLElement {
	constructor(action = () => { }) {
		super();
		this.Dataset = [];
		this.DTemporal = [];
		this.action = action;
		this.DetalleCompra = {};
		this.DetalleCompra.Existencias = this.Dataset;
		this.DTemporal.Existencias = this.Dataset;
		this.Draw();

		this.dataBodega = {};
		this.dataArticulo = {};
		// const Articulos = [];
		// this.ArticulosCompras = {
		// 	Articulos: Articulos,
		// };
	}
	connectedCallback() { }
	Draw = async () => {
		//const Arti = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetArticulo");
		const dataU = await AjaxTools.PostResquest("../../api/CompraModulo/ChargeDetalleCompra");

		this.dataArticulo = await AjaxTools.PostResquest(
			"../../api/MantenimientoCatalogos/GetArticulo"
		);
		this.Form = new FormComponent({
			Model: new DetalleCompra({
				IdDetalleCompra: { type: "number", primary: true },
				IdCompra: { type: "number", hidden: true },
				IdArticulo: { type: "number", hidden: true },
				Cantidad: { type: "number", hidden: true },
				PrecioCompra: { type: "number", hidden: true },
				TotalCostoDetalle: { type: "number", hidden: true },
				Estado: { type: "checkbox", hidden: true },

			}),
			EditObject: this.DetalleCompra,
		});
		this.Table = new TableComponent({
			ModelObject: new Existencias(),
			Dataset: this.Dataset,
			Funtions: [
				{
					name: "Remover",
					action: async (Dato) => {
						const Datof = this.Dataset.find((x) => x.IdArticulo == Dato.IdArticulo);
						if (Datof != null) {
							this.Dataset.splice(this.Dataset.indexOf(Datof), 1);
							this.Table.DrawTableComponent();
						}
					},
				},
			],
		});

		this.Table.filter.append(
			Render.Create({
				class: "FormContainer1",
				children: [
					{
						tagName: "input",
						type: "button",
						className: "btn",
						value: "Agregar Articulo Detalle",
						onclick: async () => {
							//const NuevoArticulo = {};
							const Modal = new ModalComponent(
								new AgregarExistenciaComponent((existencia) => {
									if (this.DTemporal.length > 0) {
										alert("El Articulo ya existe en el detalle");
										return;
									}
									//this.Dataset.push(articulo);
									//console.log(articulo.IdArticulo);
									//console.log(this.DetalleCompra);

									this.DetalleCompra.IdArticulo = JSON.parse(JSON.stringify(existencia.IdArticulo));
									this.DetalleCompra.Cantidad = JSON.parse(JSON.stringify(existencia.Stock));
									this.DetalleCompra.PrecioCompra = JSON.parse(
										JSON.stringify(existencia.PrecioUnidadCompra)
									);
									this.DetalleCompra.Estado = JSON.parse(JSON.stringify(existencia.Estado));
									this.Dataset.push(existencia),
										//console.log(this.DetalleCompra.IdArticulo = JSON.parse(JSON.stringify(articulo.IdArticulo)));
										Modal.Close();
									this.Table.DrawTableComponent();
								})
							);

							AppMain.append(Modal);
						},
					},
				],
			})
		);
		//AppMain.append(TableArticulo);
		// ---------------------
		this.append(this.Form, this.Table);
		this.append(
			Render.Create({
				className: "FormContainer2",
				children: [
					{
						tagName: "input",
						type: "button",
						className: "btn",
						value: "Agregar Informacion al Detalle",
						onclick: async () => {
							/*COSTO TOTAL DEL DETALLE*/
							this.DetalleCompra.TotalCostoDetalle =
								this.DetalleCompra.Cantidad * this.DetalleCompra.PrecioCompra;

							// this.Dataset.IdArticulo = this.Dataset.NArticulo;
							// this.Dataset.NArticulo = this.dataArticulo.find(
							// 	(x) => x.IdArticulo == this.Dataset.IdArticulo
							// ).NombreArticulo;
							// var total;
							// 	total += this.DetalleCompra.TotalCostoDetalle;
							// 	console.log(total);
							// this.Dataset.Stock =+ this.Dataset.Stock;
							// dd
							this.action(this.DetalleCompra, this.Dataset, console.log(this.DetalleCompra));
							//console.log(this.DetalleCompra.IdArticulo = JSON.parse(JSON.stringify(articulo.IdArticulo)));
						},
					},
				],
			})
		);
	};
}
customElements.define("w-agregar-detalle", AgregarDetalleComponent);
export { AgregarDetalleComponent };
