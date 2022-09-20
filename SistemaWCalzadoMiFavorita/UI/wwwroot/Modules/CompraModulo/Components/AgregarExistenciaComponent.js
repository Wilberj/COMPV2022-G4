import { FormComponent } from "../../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { Articulo, DetalleCompra, Existencias } from "../../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../../utility.js";
import { AgregarArticuloComponent } from "./AgregarArticuloComponent.js";

class AgregarExistenciaComponent extends HTMLElement {
	constructor(action = () => { }) {
		super();
		this.Dataset = [];
		this.DTemporal = [];
		this.action = action;
		this.Existencias = {};
		this.Existencias.Articulos = this.Dataset;
		this.DTemporal.Articulos = this.Dataset;
		this.Draw();
		this.dataM = {};
		this.dataColor = {};
		this.dataMaterial = {};
		this.dataCategoria = {};
		this.dataModelo = {};
		this.dataTalla = {};
		// const Articulos = [];
		// this.ArticulosCompras = {
		// 	Articulos: Articulos,
		// };
	}
	connectedCallback() { }
	Draw = async () => {
		//const Arti = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetArticulo");
		const dataU = await AjaxTools.PostResquest("../../api/CompraModulo/ChargeExistencias");
		this.dataM = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetMarca");
		this.dataColor = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetColor");
		this.dataTalla = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetTalla");
		this.dataMaterial = await AjaxTools.PostResquest(
			"../../api/MantenimientoCatalogos/GetMaterial"
		);
		this.dataCategoria = await AjaxTools.PostResquest(
			"../../api/MantenimientoCatalogos/GetCategoria"
		);
		this.dataModelo = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetModelo");
		this.Form = new FormComponent({
			Model: new Existencias({
				IdMarca: {
					type: "select",
					Dataset: this.dataM.map((d) => ({ id: d.IdMarca, desc: d.NombreMarca })),
				},
				IdColor: {
					type: "select",
					Dataset: this.dataColor.map((d) => ({ id: d.IdColor, desc: d.NombreColor })),
				},
				IdTalla: {
					type: "select",
					Dataset: this.dataTalla.map((d) => ({ id: d.IdTalla, desc: d.NombreTalla })),
				},
				IdMaterial: {
					type: "select",
					Dataset: this.dataMaterial.map((d) => ({ id: d.IdMaterial, desc: d.NombreMaterial })),
				},
				IdCategoria: {
					type: "select",
					Dataset: this.dataCategoria.map((d) => ({ id: d.IdCategoria, desc: d.NombreCategoria })),
				},
				IdModelo: {
					type: "select",
					Dataset: this.dataModelo.map((d) => ({ id: d.IdModelo, desc: d.NombreModelo })),
				},
			}),
			EditObject: this.Existencias,
		});
		this.Table = new TableComponent({
			EditObject: new Articulo(),
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
								new AgregarArticuloComponent((articulo) => {
									if (this.DTemporal.length > 0) {
										alert("El Articulo ya existe en el detalle");
										return;
									}
									//this.Dataset.push(articulo);
									//console.log(articulo.IdArticulo);
									//console.log(this.DetalleCompra);
									// this.Existencias.IdArticulo = this.Existencias.NombreArticulo;

									this.Existencias.IdArticulo = JSON.parse(JSON.stringify(articulo.IdArticulo));

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
							// this.DetalleCompra.NombreArticulo = this.DTemporal[0].NombreArticulo;
							// this.Existencias.IdColor = this.Dataset[0].NombreColor;
							// this.Existencias.IdTalla = this.Dataset[0].NombreTalla;
							// this.Existencias.IdMaterial = this.Dataset[0].NombreMaterial;
							// this.Existencias.IdCategoria = this.Dataset[0].NombreCategoria;
							// this.Existencias.IdModelo = this.Dataset[0].NombreModelo;

							// this.Existencias.IdMarca = this.Dataset[0].NombreMarca;

							this.action(this.Existencias, this.Dataset, console.log(this.Existencias));
							//console.log(this.DetalleCompra.IdArticulo = JSON.parse(JSON.stringify(articulo.IdArticulo)));
						},
					},
				],
			})
		);
	};
}
customElements.define("w-agregar-existencia", AgregarExistenciaComponent);
export { AgregarExistenciaComponent };
