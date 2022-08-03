const socket = io();

// Products form
const $formAddProduct = document.querySelector('#form-add-product');
const $listProducts = document.querySelector('#list-products');
const $nameInput = document.querySelector('#nombre');
const $priceInput = document.querySelector('#precio');
const $imgInput = document.querySelector('#imagen');
const $tableProducts = document.querySelector('#table-products');

$formAddProduct.addEventListener('submit', e => {
	e.preventDefault();
	const newProduct = {
		nombre: $nameInput.value,
		precio: $priceInput.value,
		imagen: $imgInput.value
	};
	socket.emit('newProduct', newProduct);
	e.target.reset();
	location.href = '/';
});

const renderProducts = products => {
	if (products.length > 0) $tableProducts.innerHTML = '';
	products.forEach(product => {
		$tableProducts.innerHTML += `
		<tr>
			<td class="align-middle">${product.nombre}</td>
			<td class="align-middle">${product.precio}</td>
			<td class="align-middle">
				<img src="${product.imagen}" alt="${product.nombre}" width="80px" height="60">
			</td>
		</tr>`;
	});
}

// Chat form
const $chatForm = document.querySelector('#chat-form');
const $userEmail = document.querySelector('#user-email');
const $chatMessage = document.querySelector('#chat-message');
const $tableChat = document.querySelector('#table-chat');

$chatForm.addEventListener('submit', e => {
	e.preventDefault();
	if ($userEmail.value == '') return alert('Ingresa tu email');
	const newMessage = {
		userEmail: $userEmail.value,
		message: $chatMessage.value,
		date: new Date().toLocaleString()
	}
	socket.emit('newMessage', newMessage);
	e.target.reset();
});

const renderChat = messages => {
	if (messages.length > 0) $tableChat.innerHTML = '';
	messages.forEach(message => {
		$tableChat.innerHTML += `
		<div>
			<b class="text-primary">${message.userEmail}</b>
			[<span style="color: brown;">${message.date}</span>]
			: <i class="text-success">${message.message}</i>
		</div > `;
	})
	$chatMessage.focus();
}


socket.on('products', products => {
    fetch('productos.txt')
        .then(response => response.json())
        .then(renderProducts(products))
        .catch(error => console.log(error))
});


socket.on('chat', messages => {
	renderChat(messages);
});