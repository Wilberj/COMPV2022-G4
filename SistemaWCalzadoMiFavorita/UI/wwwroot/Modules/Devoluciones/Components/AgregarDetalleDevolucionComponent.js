import { FormComponent } from "../../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import {
	CompraArticulo,
	DetalleCompra,
	DetalleDevolucionCompra,
	Existencias,
} from "../../../Model/DatabaseModel.js";
import { ViewCompraDetalle, ViewDevolucionesDetalleCompra } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../../utility.js";
import { CompraComponent } from "./CompraComponent.js";
import { DetalleCompraComp } from "./DetalleCompraComp.js";
import { ExistenciasComp } from "./ExistenciasComp.js";

class AgregarDetalleDevolucionComponent extends HTMLElement {
	constructor(action = () => { }) {
		super();

		this.Dataset = [];
		this.DTemporal = [];
		this.DataExistencias = [];
		this.action = action;
		this.DetalleDevoluciones = {};
		this.DetalleDevoluciones.Compras = this.Dataset;
		this.DTemporal.Compras = this.Dataset;
		this.Draw();
	}
	connectedCallback() { }
	Draw = async () => {
		this.dataU = await AjaxTools.PostResquest("../../api/Devoluciones/DevolucionesDetalle");

		this.Form = new FormComponent({
			Model: new DetalleDevolucionCompra(),
			EditObject: this.DetalleDevoluciones,
		});

		this.Table = new TableComponent({
			EditObject: new DetalleCompra(),
			Dataset: this.Dataset,
			Funtions: [
				{
					name: "Remover",
					action: async (Dato) => {
						const Datof = this.Dataset.find((x) => x.IdDetalleCompra == Dato.IdDetalleCompra);
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
						value: "Agregar Compra a Devolver",
						onclick: async () => {
							//const NuevoArticulo = {};
							const Modal = new ModalComponent(
								new DetalleCompraComp((exist) => {
									if (this.DTemporal.length > 0) {
										alert("El Articulo ya existe en el detalle");
										return;
									}
									this.DetalleDevoluciones.IdDetalleCompra = JSON.parse(JSON.stringify(exist.IdDetalleCompra));
									this.DetalleDevoluciones.IdCompra = JSON.parse(JSON.stringify(exist.IdCompra));
									this.DetalleDevoluciones.Cantidad = JSON.parse(JSON.stringify(exist.Cantidad));
									//this.DetalleDevoluciones.IdProveedor = JSON.parse(JSON.stringify(exist.IdProveedor));

									this.Dataset.push(exist),
										console.log(this.Dataset);
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
							//compra estado -> false
							this.DetalleDevoluciones.IdDetalleCompra = this.Dataset[0].IdDetalleCompra;
							// this.DetalleDevoluciones.NombreArticulo = this.Dataset[0].nombrearticulo;

							// this.Dataset[0].Stock = this.Dataset[0].Stock - this.DetalleDevoluciones.Cantidad;
							//this.Dataset[0].Estado = this.Dataset[0].Estado ? false : true;

							this.Dataset[0].Estado = !this.Dataset[0].Estado;

							//this.Dataset[0].Estado = 0;
							console.log("Estado es " + this.Dataset[0].Estado);

							this.action(
								this.DetalleDevoluciones,
								this.Dataset,
								console.log(this.DetalleDevoluciones),
								console.log(this.Dataset),
								//console.log(this.Dataset,)
							);
						},
					},
				],
			})
		);
	};
}
customElements.define("w-agregar-devoluciones", AgregarDetalleDevolucionComponent);
export { AgregarDetalleDevolucionComponent };
