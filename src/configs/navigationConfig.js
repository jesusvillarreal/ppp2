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
    id: "Survey",
    title: "Survey",
    type: "item",
    icon: <Icon.FileText size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/survey",
  },
  {
    id: "Automation",
    title: "Automation",
    type: "item",
    icon: <Icon.Coffee size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/automation",
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
    id: "Contactos",
    title: "Contactos",
    type: "item",
    icon: <Icon.UserCheck size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/contactos",
  },
  {
    type: "groupHeader",
    groupTitle: "Configuración",
  },
  {
    id: "Equipo",
    title: "Equipo",
    type: "item",
    icon: <Icon.Users size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/equipo",
  },
  {
    id: "Configuracion",
    title: "Configuración",
    type: "item",
    icon: <Icon.Settings size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/configuracion",
  },
];

export default navigationConfig;
