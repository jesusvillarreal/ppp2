import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";

// Route-based code splitting
const Home = lazy(() => import("./views/pages/Home"));

const Mensajes = lazy(() => import("./views/apps/Mensajes/Mensajes"));
const Survey = lazy(() => import("./views/pages/Survey"));
const Automation = lazy(() => import("./views/pages/Automation"));
const Tabla = lazy(() => import("./views/tables/data-tables/DataTables"));

// const Usuarios = lazy(() => import("./views/pages/Usuarios"));
const Contactos = lazy(() => import("./views/apps/Masivos/Contactos"));
const Masivo = lazy(() => import("./views/apps/Masivos/Masivo"));
const Configuracion = lazy(() => import("./views/pages/Configuracion"));

const userList = lazy(() => import("./views/apps/user/list/List"));
const userEdit = lazy(() => import("./views/apps/user/edit/Edit"));
const userView = lazy(() => import("./views/apps/user/view/View"));

const login = lazy(() => import("./views/pages/authentication/login/Login"));

const Register = lazy(() =>
  import("./views/pages/authentication/register/Register")
);
const ForgotPassword = lazy(() =>
  import("./views/pages/authentication/forgot/forgot")
);

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Home} />
          <AppRoute path="/mensajes" component={Mensajes} />
          <AppRoute path="/survey" component={Survey} />
          <AppRoute path="/automation" component={Automation} />
          <AppRoute path="/tabla" component={Tabla} />

          {/* <AppRoute path="/usuarios" component={Usuarios} /> */}
          <AppRoute path="/contactos" component={Contactos} />
          <AppRoute path="/masivo" component={Masivo} />
          <AppRoute path="/configuracion" component={Configuracion} />

          <AppRoute path="/pages/login" component={login} fullLayout />
          <AppRoute path="/pages/register" component={Register} fullLayout />

          <AppRoute path="/equipo" component={userList} />
          <AppRoute path="/equipo/edit" component={userEdit} />
          <AppRoute path="/equipo/view" component={userView} />

          <AppRoute
            path="/pages/forgot-password"
            component={ForgotPassword}
            fullLayout
          />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
