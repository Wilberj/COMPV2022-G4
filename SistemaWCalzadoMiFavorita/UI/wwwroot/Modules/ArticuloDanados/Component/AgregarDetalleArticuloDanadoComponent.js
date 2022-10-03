import { FormComponent } from "../../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import {
	Articulo,
	ArticuloDanados,
	DetalleCompra,
	Existencias,
} from "../../../Model/DatabaseModel.js";
import { ViewArticuloDanados } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../../utility.js";
import { AgregarArticuloDanadoComponent } from "./AgregarArticuloDanadoComponent.js";

class AgregarDetalleArticuloDanadoComponent extends HTMLElement {
	constructor(action = () => { }) {
		super();
		this.Dataset = [];
		this.DTemporal = [];
		this.action = action;
		this.NuevoArticulo = {};
		this.NuevoArticulo.Existencias = this.Dataset;
		this.DTemporal.Existencias = this.Dataset;
		this.Draw();
		this.dataBodega = {};

		// const Articulos = [];
		// this.ArticulosCompras = {
		// 	Articulos: Articulos,
		// };
	}
	connectedCallback() { }
	Draw = async () => {
		//const Arti = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetArticulo");

		this.Form = new FormComponent({
			Model: new ArticuloDanados({
				IdArticuloDanados: { type: "number", primary: true },
				IdArticulo: { type: "number", hidden: true },
				IdUsuario: { type: "number", hidden: true },
				IdArticuloExistencia: { type: "number", hidden: true },
				IdBodega: { type: "number", hidden: true },
				Cantidad: { type: "number" },
				Descripcion: { type: "text" },
			}),
			EditObject: this.NuevoArticulo,
		});
		this.Table = new TableComponent({
			ModelObject: new ViewArticuloDanados(),
			Dataset: this.Dataset,
			Funtions: [
				{
					name: "Remover",
					action: async (Dato) => {
						const Datof = this.Dataset.find(
							(x) => x.IdArticuloExistencia == Dato.IdArticuloExistencia
						);
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
						value: "Agregar Articulo Dañado",
						onclick: async () => {
							//const NuevoArticulo = {};
							const Modal = new ModalComponent(
								new AgregarArticuloDanadoComponent((articulo) => {
									if (this.DTemporal.length > 0) {
										alert("El Articulo ya existe en el detalle");
										return;
									}
									//this.Dataset.push(articulo);
									//console.log(articulo.IdArticulo);
									//console.log(this.DetalleCompra);

									this.Dataset.push(articulo),
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

							this.NuevoArticulo.IdArticulo = this.Dataset[0].IdArticulo;
							this.NuevoArticulo.IdArticuloExistencia = this.Dataset[0].IdArticuloExistencia;
							if (this.NuevoArticulo.Cantidad < this.Dataset[0].Stock) {
								this.Dataset[0].Stock = this.Dataset[0].Stock - this.NuevoArticulo.Cantidad;
							} else {
								alert("Numero maximo de existencias superado");
								return;
							}
							this.NuevoArticulo.Stock = this.Dataset[0].Stock;
							this.action(this.NuevoArticulo, this.Dataset, console.log(this.NuevoArticulo));
						},
					},
				],
			})
		);
	};
}
customElements.define("w-agregar-detalle", AgregarDetalleArticuloDanadoComponent);
export { AgregarDetalleArticuloDanadoComponent };
