import { productos } from "./productos.js";
import { carritoVacio } from "./constantes.js";

let carrito = [];

export const botonAniadir = () => {
  const botonAniadir = document.querySelectorAll(".producto-active-aniadir");

  botonAniadir.forEach((boton) =>
    boton.addEventListener("click", () => {
      const idProducto = parseInt(boton.getAttribute("data-id"));
      agregarProductoAlCarrito(idProducto);

      carritoVacio.textContent = "Producto añadido a la cesta";
      carritoVacio.style.display = "block";
      setTimeout(() => {
        carritoVacio.style.display = "none";
      }, 3000);
    })
  );
};

const agregarProductoAlCarrito = (id) => {
  const productoExistente = carrito.find((item) => item.producto.id === id);
  if (productoExistente) {
    productoExistente.cantidad++;
    productoExistente.precioTotal =
      productoExistente.cantidad * productoExistente.producto.precio;
  } else {
    const producto = productos.find((item) => item.id === id);
    if (producto) {
      carrito.push({
        producto: producto,
        cantidad: 1,
        precioTotal: producto.precio,
      });
    }
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const mostrarCarrito = (carrito) => {
  const listaCarrito = document.querySelector(".carrito");

  listaCarrito.innerHTML = "";

  carrito.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
    <img src="${item.producto.imagen}"/>
    <div class="descripcion">
    <p class="titulo">${item.producto.producto}</p>
    <p class="cantidad">Cantidad: ${item.cantidad}</p>
    <p class = "precio-producto">Precio: ${item.precioTotal}</p>
    </div>
    `;
    listaCarrito.appendChild(li);

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    li.appendChild(botonEliminar);

    botonEliminar.addEventListener("click", () => {
      eliminarProductoDelCarrito(item.producto.id);
    });
  });
};

const actualizaPrecioTotalCarrito = () => {
  const precioTotalCarrito = carrito.reduce(
    (total, item) => total + item.precioTotal,
    0
  );
  document.querySelector(
    "#precio-total"
  ).textContent = `Precio total: ${precioTotalCarrito.toFixed(2)}€`;
};

export const loadCarrito = () => {
  recuperarCarrito();
  const iconoCarrito = document.querySelector("#icono-carrito");
  iconoCarrito.addEventListener("click", () => {
    const divCarrito = document.querySelector(".carrito-main");
    if (carrito.length < 1) {
      carritoVacio.textContent = "Tu carrito está vacío";
      carritoVacio.style.display = "block";
      setTimeout(() => {
        carritoVacio.style.display = "none";
      }, 3000);
    } else {
      const main = document.querySelector("main");
      main.style.display = "none";
      mostrarCarrito(carrito);
      actualizaPrecioTotalCarrito();
      divCarrito.style.display = "flex";
    }
  });
  cerrarCarrito();
};

const cerrarCarrito = () => {
  const divCarrito = document.querySelector(".carrito-main");
  const main = document.querySelector("main");
  const cerrar = document.querySelector(".cerrar-carrito");
  cerrar.addEventListener("click", () => {
    divCarrito.style.display = "none";
    main.style.display = "block";
  });
};

const eliminarProductoDelCarrito = (id) => {
  carrito = carrito.filter((item) => item.producto.id !== id);
  actualizaPrecioTotalCarrito();
  mostrarCarrito(carrito);
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const recuperarCarrito = () => {
  const carritoGuardado = localStorage.getItem("carrito");
  const carritoRecuperado = JSON.parse(carritoGuardado);

  carritoRecuperado.forEach((item) => {
    carrito.push(item);
  });
};
