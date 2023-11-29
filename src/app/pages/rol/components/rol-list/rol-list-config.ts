import { TableColumn } from "@shared/models/list-table.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconsService } from "@shared/services/icons.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { RolResponse } from "../../models/rol-response.interface";

const searchOptions: SearchOptions[] = [
  {
    label: "Rol",
    value: 1,
    placeholder: "Buscar por Rol",
    validation: [GenericValidators.defaultName],
    validation_desc: "Solo se permite letras en esta búsqueda",
    icon: "icName",
  },
];

const menuItems: MenuItems[] = [
  
];

const tableColumns: TableColumn<RolResponse>[] = [
  {
    label: "ROL",
    cssLabel: ["font-bold", "text-sm"],
    property: "rol",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: true,
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
  icRol: IconsService.prototype.getIcon("icRol"),
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
  filename: "listado-de-roles",
};