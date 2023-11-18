const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.contenedor-yes');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-danger')) {
        const product = e.target.closest('.card');

        if (product) {
            const titleElement = product.querySelector('h6');
            const priceElement = product.querySelector('p');

            if (titleElement && priceElement) {
                const infoProduct = {
                    quantity: 1,
                    title: titleElement.textContent,
                    price: priceElement.textContent,
                };

                const exists = allProducts.some(product => product.title === infoProduct.title);

                if (exists) {
                    const products = allProducts.map(product => {
                        if (product.title === infoProduct.title) {
                            product.quantity++;
                            return product;
                        } else {
                            return product;
                        }
                    });
                    allProducts = [...products];
                } else {
                    allProducts = [...allProducts, infoProduct];
                }

                showHTML();
            } else {
                console.error('No se encontraron elementos h6 o p dentro del contenedor del producto.');
            }
        } else {
            console.error('No se pudo encontrar el contenedor del producto.');
        }
    }
});

rowProduct.addEventListener('click',(e) => {
    if (e.target.classList.contains ('icon-close')) {
       const product = e.target.parentElement
       const title = product.querySelector('p').textContent;

       allProducts = allProducts.filter(
        product =>  product.title !== title
        );
        console.log(allProducts);
        showHTML()
    }
})

// Funcion para mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};
// const iconosCerrar = document.querySelectorAll('.icon-close');
//   iconosCerrar.forEach((icono, index) => {
//     icono.addEventListener('click', () => {
//       eliminarProducto(index);
//     });
//   });
//   const eliminarProducto = (index) => {
//     allProducts.splice(index, 1); // Elimina el producto del arreglo
//     showHTML(); // Vuelve a renderizar la lista de productos
//   };


// funcion para eliminar un producto
// function close() {
//     console.log('producto eliminado');
//     const iconClose = document.querySelectorAll('.icon-close');
//     iconClose.forEach(function (icono) {
//         icono.addEventListener('click', function(){
//             close();
//         });
//     });
// };
// const iconosCerrar = document.querySelectorAll('.icon-close');
//   iconosCerrar.forEach((icono, index) => {
//     icono.addEventListener('click', () => {
//       eliminarProducto(index);
//     });
//   });
// };
