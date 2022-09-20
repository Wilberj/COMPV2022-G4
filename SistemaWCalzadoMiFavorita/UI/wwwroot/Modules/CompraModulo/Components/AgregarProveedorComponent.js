import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { AjaxTools } from "../../utility.js";

class AgregarProveedorComponent extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.action = action;
        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {
        this.Dataset = await AjaxTools.PostResquest("../api/CompraModulo/ChargeProveedor");
        this.Table = new TableComponent({
            Dataset: this.Dataset,
            Funtions: [
                {
                    name: "Agregar Proveedor", action: async (Dato) => {
                        this.action(Dato);
                    }
                }
            ]
        });
        this.append(this.Table);
    }
}
customElements.define('w-agregar-proveedor', AgregarProveedorComponent);
export { AgregarProveedorComponent }