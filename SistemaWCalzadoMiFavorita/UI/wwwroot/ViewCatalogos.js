import { FormComponent } from "./CoreComponents/FormComponent.js";
import { ModalComponent } from "./CoreComponents/ModalComponent.js";
import { TableComponent } from "./CoreComponents/TableComponent.js";
import {
	Proveedor,
	Rol,
	Usuario,
} from "./Model/DatabaseModel.js";
import { AjaxTools, Render } from "./Modules/utility.js";

window.onload = async () => {

	const dataU = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetUsuario");
	const dataP = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetProveedor");
	const dataE = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetExistencias");
	const dataA = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetArticulo");
	const dataR = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetRol");

	AppMain.append(
		Render.Create({ tagName: "h1", innerText: "MANTENIMIENTO CATALOGOS", class: "text_primary" })
	);
	AppMain.append(
		Render.Create({
			tagName: "label",
			class: "TabMenu",
			children: [

				{
					tagName: "label",
					innerText: "Roles",
					class: "TabMenu",
					// class: "TabMenu",
					onclick: async () => {
						const Model = new Rol({});
						ChargeCatalogo(Model);
					},
				},

				{
					tagName: "label",
					innerText: "Usuario",
					class: "TabMenu",
					// class: "TabMenu",
					onclick: async () => {
						const Model = new Usuario({
							IdRol: {
								type: "select",
								Dataset: dataR.map((d) => ({ id: d.IdRol, desc: d.NombreRol })),
							},
						});
						ChargeCatalogo(Model);
					},
				},
				{
					tagName: "label",
					innerText: "Proveedor",
					class: "TabMenu",
					// class: "TabMenu",
					onclick: async () => {
						const Model = new Proveedor({});
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
