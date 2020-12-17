import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout(props) {
  return (
    <div className="layout">
      <Header />

      <main className="container mx-auto">{props.children}</main>

      <Footer />
    </div>
  );
}
