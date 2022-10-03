import { FormComponent } from "../../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { Articulo, DetalleCompra, Existencias, Marca } from "../../../Model/DatabaseModel.js";
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
		this.dataMarca = [];
		this.dataU = {};
		this.dataColor = [];
		this.dataMaterial = [];
		this.dataCategoria = [];
		this.dataModelo = [];
		this.dataTalla = [];
		this.dataBodega = [];

		// this.Existencias.Marcas = [];
		// this.Existencias.Marca = {};
		// const Articulos = [];
		// this.ArticulosCompras = {
		// 	Articulos: Articulos,
		// };
	}
	connectedCallback() { }
	Draw = async () => {
		//const Arti = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetArticulo");
		this.dataU = await AjaxTools.PostResquest("../../api/CompraModulo/ChargeExistencias");
		this.dataMarca = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetMarca");
		this.dataColor = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetColor");
		this.dataMaterial = await AjaxTools.PostResquest(
			"../../api/MantenimientoCatalogos/GetMaterial"
		);
		this.dataCategoria = await AjaxTools.PostResquest(
			"../../api/MantenimientoCatalogos/GetCategoria"
		);
		this.dataModelo = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetModelo");
		this.dataBodega = await AjaxTools.PostResquest("../../api/MantenimientoCatalogos/GetBodega");
		this.Form = new FormComponent({
			Model: new Existencias({
				NColor: {
					type: "select",
					Dataset: this.dataColor.map((d) => ({ id: d.IdColor, desc: d.NombreColor })),
				},
				NMaterial: {
					type: "select",
					Dataset: this.dataMaterial.map((d) => ({ id: d.IdMaterial, desc: d.NombreMaterial })),
				},
				NModelo: {
					type: "select",
					Dataset: this.dataModelo.map((d) => ({ id: d.IdModelo, desc: d.NombreModelo })),
				},
				NCategoria: {
					type: "select",
					Dataset: this.dataCategoria.map((d) => ({ id: d.IdCategoria, desc: d.NombreCategoria })),
				},
				NMarca: {
					type: "select",
					Dataset: this.dataMarca.map((d) => ({ id: d.IdMarca, desc: d.NombreMarca })),
				},
				NBodega: {
					type: "select",
					Dataset: this.dataBodega.map((d) => ({ id: d.IdBodega, desc: d.NombreBodega })),
				},

			}),
			EditObject: this.Existencias,
		});
		// this.Form1 = new FormComponent({
		// 	Model: new Marca({}),
		// 	EditObject: this.Existencias.Marca,
		// })

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
							// this.Existencias.IdMarca = this.dataMarca.find(
							// 	(x) => x.IdMarca == this.Existencias.IdMarca
							// ).IdMarca;
							// this.Existencias.Marcas = this.dataMarca.find(
							// 	(x) => x.IdMarca == 	this.Existencias.Marcas
							// ).NombreMarca;

							// this.Existencias.IdMarca = this.Existencias.Marca;
							// this.Existencias.Marca.IdMarca = this.dataMarca.find((x) => x.IdMarca == this.Existencias.Marca).IdMarca;

							// this.Existencias.Marcas = [this.dataMarca.find((x) => x.IdMarca == this.Existencias.Marca)];
							// this.Existencias.Marca = this.dataMarca.find((x) => x.IdMarca == this.Existencias.Marca).NombreMarca;

							this.Existencias.IdMarca = this.Existencias.NMarca;
							this.Existencias.NMarca = this.dataMarca.find(
								(x) => x.IdMarca == this.Existencias.IdMarca
							).NombreMarca;

							this.Existencias.IdColor = this.Existencias.NColor;
							this.Existencias.NColor = this.dataColor.find(
								(x) => x.IdColor == this.Existencias.IdColor
							).NombreColor;

							this.Existencias.IdMaterial = this.Existencias.NMaterial;
							this.Existencias.NMaterial = this.dataMaterial.find(
								(x) => x.IdMaterial == this.Existencias.IdMaterial
							).NombreMaterial;

							this.Existencias.IdModelo = this.Existencias.NModelo;
							this.Existencias.NModelo = this.dataModelo.find(
								(x) => x.IdModelo == this.Existencias.IdModelo
							).NombreModelo;

							this.Existencias.IdCategoria = this.Existencias.NCategoria;
							this.Existencias.NCategoria = this.dataCategoria.find(
								(x) => x.IdCategoria == this.Existencias.IdCategoria
							).NombreCategoria;

							this.Existencias.IdBodega = this.Existencias.NBodega;
							this.Existencias.NBodega = this.dataBodega.find(
								(x) => x.IdBodega == this.Existencias.IdBodega
							).NombreBodega;
							// this.Existencias.IdColor = this.dataColor.find(
							// 	(x) => x.IdColor == this.Existencias.IdColor
							// ).NombreColor;
							// this.Existencias.IdCategoria = this.dataCategoria.find(
							// 	(x) => x.IdCategoria == this.Existencias.IdCategoria
							// ).NombreCategoria;
							// this.Existencias.IdMaterial = this.dataMaterial.find(
							// 	(x) => x.IdMaterial == this.Existencias.IdMaterial
							// ).NombreModelo;
							// this.Existencias.IdModelo = this.dataModelo.find(
							// 	(x) => x.IdModelo == this.Existencias.IdModelo
							// ).NombreModelo;

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
