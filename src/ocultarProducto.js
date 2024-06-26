import {
  divProductosDestacados,
  cerrarVentanaProducto,
  headerProductosDestacados,
  headerTodosProductos,
  main,
} from "./constantes.js";
import { productosMain } from "./todosLosProductos.js";

const cetegoriasHeader = document.querySelector(".categorias-h2");

export const ocultarProducto = (divProducto) => {
  const elementoPadre = divProducto.parentElement;
  const claseDelElementoPadre = elementoPadre.getAttribute("class");

  let clase = claseDelElementoPadre;
  switch (clase) {
    case "productos__destacados-container":
      ocultarHeader(headerProductosDestacados);
      cerrarVentanaProducto.style.display = "block";
      cerrarVentanaProducto.addEventListener("click", () => {
        divProductosDestacados.style.display = "flex";
        divProducto.style.display = "none";
        cerrarVentanaProducto.style.display = "none";
        mostrarHeader(headerProductosDestacados);
      });
      break;

    case "pagina-productos":
      ocultarHeader(headerTodosProductos);
      const volver = document.querySelector(".volver-productos");
      volver.style.display = "block";
      volver.addEventListener("click", () => {
        productosMain.style.display = "flex";
        divProducto.style.display = "none";
        volver.style.display = "none";
        mostrarHeader(headerTodosProductos);
      });
      break;

    case "categorias-container":
      ocultarHeader(cetegoriasHeader);
      handlerVolverCategorias();
      handlerVolverProductosCategoria(divProducto);
      mostrarHeader(cetegoriasHeader);
      break;

    case "pagina-subcategorias":
      ocultarHeader(cetegoriasHeader);
      handlerVolverProductosCategoria(divProducto);
      volverAInicioDesdeSubcategorias();
      mostrarHeader(cetegoriasHeader);
  }
};

const ocultarHeader = (header) => {
  let titulo = header.children[0];
  titulo.style.display = "none";
};
const mostrarHeader = (header) => {
  let titulo = header.children[0];
  titulo.style.display = "block";
};

const handlerVolverProductosCategoria = (divProducto) => {
  const volverProductosCategoria = document.querySelector(
    ".volver-productos-categoria"
  );
  const volverCategorias = document.querySelector(".volver-categorias");

  const divProductosCategoria = document.querySelector(".productos-categoria");

  if (divProductosCategoria && divProductosCategoria.style.display === "none") {
    volverProductosCategoria.style.display = "block";
    volverCategorias.style.display = "none";
    volverProductosCategoria.addEventListener("click", () => {
      divProductosCategoria.style.display = "flex";
      if (divProducto) {
        volverCategorias.style.display = "block";
        volverProductosCategoria.style.display = "none";
        divProducto.parentElement.removeChild(divProducto);
      }
    });
  }
};

export const handlerVolverCategorias = () => {
  const headerCategorias = document.querySelector(".cat-h2");
  const volverCategorias = document.querySelector(".volver-categorias");
  const divCategorias = document.querySelector(".categorias");

  const divProductosCategoria = document.querySelector(".productos-categoria");

  if (volverCategorias.style.display === "block") {
    volverCategorias.addEventListener("click", () => {
      headerCategorias.innerHTML = "CATEGORIAS";
      divProductosCategoria.style.display = "none";
      divProductosCategoria.innerHTML = "";
      divCategorias.style.display = "flex";
      volverCategorias.style.display = "none";
    });
  }
};

export const volverAInicioDesdeSubcategorias = () => {
  const headerCategorias = document.querySelector(".cat-h2");
  const volverCategorias = document.querySelector(".volver-categorias");
  const divCategorias = document.querySelector(".pagina-subcategorias");

  if (volverCategorias.style.display === "block") {
    volverCategorias.addEventListener("click", () => {
      headerCategorias.innerHTML = "";
      divCategorias.style.display = "none";
      divCategorias.innerHTML = "";
      volverCategorias.style.display = "none";
      main.style.display = "flex";
    });
  }
};
