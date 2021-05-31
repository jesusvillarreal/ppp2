import React from "react";
import * as Icon from "react-feather";
const navigationConfig = [
  {
    type: "groupHeader",
    groupTitle: "Inicio",
  },
  {
    id: "Dashboard",
    title: "Dashboard",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/",
  },

  {
    id: "Mensajes",
    title: "Mensajes",
    type: "item",
    icon: <Icon.MessageCircle size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/mensajes",
  },
  {
    id: "Masivo",
    title: "Envios Masivos",
    type: "item",
    icon: <Icon.Send size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/masivo",
  },
  {
    id: "Reportes",
    title: "Reportes",
    type: "item",
    icon: <Icon.Download size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/reportes",
  },
  {
    type: "groupHeader",
    groupTitle: "Configuración",
  },
  {
    id: "Configuracion",
    title: "Configuración",
    type: "item",
    icon: <Icon.Settings size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/configuracion",
  },
  {
    id: "Usuarios",
    title: "Usuarios",
    type: "item",
    icon: <Icon.Users size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/usuarios",
  },
];

export default navigationConfig;
