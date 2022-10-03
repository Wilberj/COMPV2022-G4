import { FormComponent } from "./CoreComponents/FormComponent.js";
import { ModalComponent } from "./CoreComponents/ModalComponent.js";
import { TableComponent } from "./CoreComponents/TableComponent.js";
import { Categoria, Existencias, Marca, Material, Modelo, Articulo, Color } from "./Model/DatabaseModel.js";
import { ViewDevolucionesDetalleCompra, ViewExistenciaCat } from "./Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "./Modules/utility.js";

window.onload = async () => {


	const dataA = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetArticulo");
	const dataColor = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetColor");
	const dataMaterial = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetMaterial");
	const dataCategoria = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetCategoria");
	const dataModelo = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetModelo");
	const dataMarca = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetMarca");
	const dataExist = await AjaxTools.PostResquest("api/MantenimientoCatalogos/ChargeExistencias");


	AppMain.append(
		Render.Create({ tagName: "h1", innerText: "EXISTENCIAS", class: "text_primary" })
	);
	AppMain.append(
		Render.Create({
			tagName: "label",
			class: "TabMenu",
			children: [
				{
					tagName: "label",
					innerText: "Existencias",
					class: "TabMenu",
					// class: "TabMenu",
					onclick: async () => {
						const Model = new Existencias({
							IdArticulo: {
								type: "select",
								Dataset: dataA.map((d) => ({ id: d.IdArticulo, desc: d.NombreArticulo })),
							},
							IdColor: {
								type: "select",
								Dataset: dataColor.map((d) => ({ id: d.IdColor, desc: d.NombreColor })),
							},
							IdMaterial: {
								type: "select",
								Dataset: dataMaterial.map((d) => ({ id: d.IdMaterial, desc: d.NombreMaterial })),
							},
							IdCategoria: {
								type: "select",
								Dataset: dataCategoria.map((d) => ({ id: d.IdCategoria, desc: d.NombreCategoria })),
							},
							IdModelo: {
								type: "select",
								Dataset: dataModelo.map((d) => ({ id: d.IdModelo, desc: d.NombreModelo })),
							},
							IdMarca: {
								type: "select",
								Dataset: dataMarca.map((d) => ({ id: d.IdMarca, desc: d.NombreMarca })),
							},

						});

						ChargeCatalogo(Model);



					},
				},
				{
					tagName: "label",
					innerText: "Material",
					class: "TabMenu",
					// class: "TabMenu",
					onclick: async () => {
						const Model = new Material({
							IdModelo: {

								Dataset: dataModelo.map((d) => ({ th: d.IdModelo, td: d.NombreModelo })),
							},
						});
						ChargeCatalogo(Model);
					},
				},
				{
					tagName: "label",
					innerText: "Color",
					class: "TabMenu",
					// class: "TabMenu",
					onclick: async () => {
						const Model = new Color({});
						ChargeCatalogo(Model);
					},
				},
				{
					tagName: "label",
					innerText: "Categoria",
					class: "TabMenu",
					// class: "TabMenu",
					onclick: async () => {
						const Model = new Categoria({});
						ChargeCatalogo(Model);
					},
				},
				{
					tagName: "label",
					innerText: "Modelo",
					class: "TabMenu",
					// class: "TabMenu",
					onclick: async () => {
						const Model = new Modelo({});
						ChargeCatalogo(Model);
					},
				},
				{
					tagName: "label",
					innerText: "Marca",
					class: "TabMenu",
					// class: "TabMenu",
					onclick: async () => {
						const Model = new Marca({});
						ChargeCatalogo(Model);
					},
				},
				{
					tagName: "label",
					innerText: "Articulo",
					class: "TabMenu",
					// class: "TabMenu",
					onclick: async () => {
						const Model = new Articulo({});
						ChargeCatalogo(Model);
					},
				},

			],
		})
	);
	AppMain.append(Render.Create({ id: "TabContainer" }));
};

/* class Categorias {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Categoria = { type: "number", primary: true };
	Nombre_Categoría = { type: "text" };
	Descripcion_Categoria = { type: "text" };
} */
const FormOption = (form, table, action = "Save", Modal) => {
	return Render.Create({
		class: "FormContainer2",
		children: [
			{
				tagName: "input",
				type: "button",
				className: "btn",
				value: "Guardar",
				onclick: async () => {
					console.log(form.FormObject);
					const data = await AjaxTools.PostResquest(
						"api/MantenimientoCatalogos/" + action + form.Model.constructor.name,
						form.FormObject
					);
					if (data) {
						if (action == "Save") {
							table.config.Dataset.push(data);
						}
						Modal.Close();
						table.DrawTableComponent();
					} else {
						alert("error");
					}
				},
			},
		],
	});
};
function ChargeForm(Dato, table, action, Model) {
	const form = new FormComponent({
		EditObject: Dato,
		Model: Model,
		// Model: new Categorias({
		// 	Nombre_Categoría: {
		// 		type: "select",
		// 		Dataset: data.map((d) => ({ id: d.Id_Categoria, desc: d.Nombre_Categoría })),
		// 	},
		// }),
	});
	const formContainer = Render.Create({});
	const Modal = new ModalComponent(formContainer);
	formContainer.append(form, FormOption(form, table, action, Modal));
	TabContainer.append(Modal);
}
async function ChargeCatalogo(Model) {
	TabContainer.innerHTML = "";
	const data = await AjaxTools.PostResquest(
		"api/MantenimientoCatalogos/Get" + Model.constructor.name
	);
	//console.table(data.map(d => ({id: d.Id_Categoria, desc:d.Nombre_Categoría})));
	// AppMain.append(new FormComponent({
	// 	EditObject: data[0],
	// 	Model: new Categoria()
	// }));
	const table = new TableComponent({
		Dataset: data,
		Funtions: [
			{
				name: "Edit",
				action: async (Dato) => {
					ChargeForm(Dato, table, "Update", Model);
				},
			},
		],
	});
	const NewBtn = {
		tagName: "input",
		type: "button",
		className: "btn",
		value: "Nuevo Registro",
		onclick: async () => {
			ChargeForm({}, table, "Save", Model);
		},
	};
	TabContainer.append(Render.Create({ className: "FormContainer2", children: [NewBtn] }));
	TabContainer.append(table);
}
