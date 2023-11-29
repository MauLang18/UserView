import { TableColumn } from "@shared/models/list-table.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconsService } from "@shared/services/icons.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { UsuarioResponse } from "../../models/usuario-response.interface";

const searchOptions: SearchOptions[] = [
  {
    label: "Usuario",
    value: 1,
    placeholder: "Buscar por Usuario",
    validation: [GenericValidators.defaultName],
    validation_desc: "Solo se permite letras en esta búsqueda",
    icon: "icName",
  },
];

const menuItems: MenuItems[] = [
  
];

const tableColumns: TableColumn<UsuarioResponse>[] = [
  {
    label: "USUARIO",
    cssLabel: ["font-bold", "text-sm"],
    property: "username",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: true,
    sort: true,
    sortProperty: "username",
    visible: true,
    download: true,
  },
  {
    label: "ROL",
    cssLabel: ["font-bold", "text-sm"],
    property: "rol",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "rol",
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icEdit",
    cssProperty: [],
    type: "icon",
    action: "edit",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icDelete",
    cssProperty: [],
    type: "icon",
    action: "remove",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];

const filters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: null,
  endDate: null,
  refresh: false,
};

const getInputs: string = "";

export const componentSettings = {
  //ICONS
  icUser: IconsService.prototype.getIcon("icUser"),
  icCalendarMonth: IconsService.prototype.getIcon("icCalendarMonth"),
  //LAYOUT SETTINGS
  menuOpen: false,
  //TABLE SETTINGS
  tableColumns: tableColumns,
  initialSort: "Id",
  initialSortDir: "desc",
  getInputs: getInputs,
  buttonLabel: "EDITAR",
  buttonLabel2: "ELIMINAR",
  //SEARCH FILTERS
  menuItems: menuItems,
  searchOptions: searchOptions,
  filters_date_active: false,
  filters: filters,
  datesFilterArray: ["Fecha de creación"],
  filename: "listado-de-usuarios",
};