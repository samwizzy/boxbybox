import React from "react";
import { renderRoutes } from "react-router-config";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import AuthDialog from "../../../pages/auth";
import SnackBar from "./../../components/Snackbar/SnackbarComponent";

export default function Layout({ route, children }) {
  return (
    <div className="layout">
      <div className="container mx-auto">
        <Header />
      </div>

      <main className="container mx-auto">
        <SnackBar />
        {renderRoutes(route.routes)}
        {children}
      </main>

      <AuthDialog />
      <div className="container mx-auto">
        <Footer />
      </div>
    </div>
  );
}
