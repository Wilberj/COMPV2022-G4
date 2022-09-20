import { FormComponent } from "./CoreComponents/FormComponent.js";
import {
	CompraArticulo,
	DetalleCompra,
	Usuario,
	Articulo,
	Proveedor,
	Existencias,
} from "./Model/DatabaseModel.js";
import { ModalComponent } from "./CoreComponents/ModalComponent.js";
import { TableComponent } from "./CoreComponents/TableComponent.js";
import { AjaxTools, Render } from "./Modules/utility.js";

window.onload = async () => {
	const dataC = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetCompraArticulo");
	const dataD = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetDetalleCompra");
	const dataU = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetUsuario");
	const dataP = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetProveedor");
	const dataE = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetExistencias");
	const dataA = await AjaxTools.PostResquest("api/MantenimientoCatalogos/GetArticulo");

	AppMain.append(
		Render.Create({ tagName: "h1", innerText: "NUEVA COMPRA", class: "text_primary" })
	);
	AppMain.append(
		Render.Create({
			tagName: "label",
			class: "TabMenu",
			children: [
				{
					tagName: "label",
					innerText: "Nueva Compra",
					class: "TabMenu",
					onclick: async () => {
						const form1 = new FormComponent({
							/*EditObject: dataC[0],*/
							Model: new CompraArticulo({
								IdUsuario: {
									type: "select",
									Dataset: dataU.map((d) => ({ id: d.IdUsuario, desc: d.NombreUsuario })),
								},
								IdProveedor: {
									type: "select",
									Dataset: dataP.map((d) => ({ id: d.IdProveedor, desc: d.Nombreproveedor })),
								},
							}),
						});
						const form2 = new FormComponent({
							/*EditObject: dataD[0],*/

							EditObject: await dataC[Object.keys(dataC)[Object.keys(dataC).pop()]],
							//EditObject:  await dataD[Object.keys(dataD)[Object.keys(dataD).pop()]],
							Model: new DetalleCompra({
								IdCompra: {
									type: "compra",
									Dataset: dataC.map((d) => ({
										value: d.IdCompra + 1,
									})),
								},
								// IdCompra: {
								// 	type: "compra",
								// 	Dataset: dataD.map((d) => ({
								// 		value: d.IdCompra + 1,
								// 	})),
								// },

								IdArticulo: {
									type: "select",
									Dataset: dataA.map((d) => ({
										id: d.IdArticulo,
										desc: d.NombreArticulo,
									})),

									// tagName: "input",
									// type: "button",
									// className: "btn",
									// onclick: async () => {
									// 	console.log(form.FormObject);
									// 	const data = await AjaxTools.PostResquest(
									// 		"api/MantenimientoCatalogos/" + action + form.Model.constructor.name,
									// 		form.FormObject
									// 	);
									// 	if (data) {
									// 		if (action == "Save") {
									// 			table.config.Dataset.push(data);
									// 		}
									// 		Modal.Close();
									// 		table.DrawTableComponent();
									// 	} else {
									// 		alert("error");
									// 	}
									// },
								},
							}),
						});

						const formContainer = Render.Create({});
						formContainer.append(form1, form2, FormOption(form1, form2));
						AppMain.append(formContainer);
					},
				},
			],
		})
	);
	AppMain.append(Render.Create({ id: "TabContainer" }));
};
const FormOption = (form1, form2, table, action = "Get") => {
	return Render.Create({
		class: "FormContainer2",
		children: [
			{
				tagName: "input",
				type: "button",
				className: "btn",
				value: "Guardar",
				onclick: async () => {
					console.log(form1.FormObject);
					console.log(form2.FormObject);
					const dataC = await AjaxTools.PostResquest(
						"api/MantenimientoCatalogos/SaveCompraArticulo",
						form1.FormObject
					);
					const dataD = await AjaxTools.PostResquest(
						"api/MantenimientoCatalogos/SaveDetalleCompra",
						//	DetalleCompra.IdCompra = CompraArticulo.IdCompra,
						form2.FormObject
					);
					if (dataC && dataD) {
						alert("Datos Guardados");
					} else {
						alert("Datos No Guardados");
					}
					AppMain.append(Render.Create({ id: "TabContainer" }));
				},
			},
			{
				tagName: "input",
				type: "button",
				className: "btn",
				value: "Nuevo Detalle",
				onclick: async () => {
					console.log(form1.FormObject);
					console.log(form2.FormObject);
					const data = await AjaxTools.PostResquest(
						"api/MantenimientoCatalogos/" + action + form2.Model.constructor.name,
						form2.FormObject
					);
					const Model = new Articulo({});
					ChargeCatalogo(Model);
					if (data) {
						if (action == "Get") {
							table.config.Dataset.push(data);
						}

						table.DrawTableComponent();
					} else {
						alert("error");
					}
				},
			},
		],
	});
};
/*const AddExistencias = (Articulo) => {
	return Render.Create({
		children: [
			{
			tagName: "input",
			type: "button",
			className: "btn",
			value: "Añadir Existencias",
				onclick: async () => {
					console.log(Articulo);
					const id = Existencias.find(i => i.IdArticulo == Articulo.IdArticulo);
					if (id == undefined || id == null) {
						Existencias.push(Articulo);
					}
					console.log(Articulo);
					existenciasDiv.innerHTML = "";
					Existencias.forEach(exist => {
						const Ext = document.createElement("div");
						Ext.innerText = exist.nombreArticulo;
						Ext.className = "Existencias";
						const btnExt = document.createElement("input");
						btnExt.value = "x";
						btnExt.type = "button";
						btnExt.className = "btnClouse";
						btnExt.onclick = () => {
							const indexElement = Existencias.indexOf(exist);
							Existencias.splice(indexElement, 1);
							existenciasDiv.removeChild(Ext);
						}
						Ext.appendChild(btnExt);
						existenciasDiv.appendChild(Ext);
					})
				}
			}

		]
	})
	
}*/
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
				name: "Select",
				action: async (Dato) => {
					ChargeForm(Dato, table, "Get");
				},
			},
		],
	});
	// const NewBtn = {
	// 	tagName: "input",
	// 	type: "button",
	// 	className: "btn",
	// 	value: "Nuevo Registro",
	// 	onclick: async () => {
	// 		ChargeForm({}, table, "Save", Model);
	// 	},
	// };
	TabContainer.append(Render.Create({ className: "FormContainer2" }));
	TabContainer.append(table);
}
