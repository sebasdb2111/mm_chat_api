import {ChatConstants} from './constants';

export default io => {
	let customerSockets: any = [];
	let psychicSockets: any = [];

	io.on(ChatConstants.CONNECT, socket => {
		console.log('conectado');

		socket.on('customer_online', customer => {
			console.log('customer_online', socket);
			customerSockets.push(customer);
			console.log('customer_online.push', customerSockets);
			socket.broadcast.emit('customer_online', customer);
		});

		socket.on('psychic_online', psychic => {
			console.log('psychic_online', psychic);
			psychicSockets.push(psychic);
			console.log('psychic_online.push', psychicSockets);
			socket.broadcast.emit('psychic_online', psychic);
		});

		socket.on('customer_offline', customer => {
			console.log('customer_offline', customer);
			const indexOfCustomer = customerSockets.findIndex(el => el.id === customer.id);
			customerSockets.splice(indexOfCustomer, 1);
			socket.broadcast.emit('customer_offline', customer);
		});

		socket.on('psychic_offline', psychic => {
			console.log('psychic_offline', psychic);
			const indexOfPsychic = psychicSockets.findIndex(el => el.id === psychic.id);
			psychicSockets.splice(indexOfPsychic, 1);
			socket.broadcast.emit('psychic_offline', psychic);
		});

		socket.on('customers-online-ping', () => {
			socket.emit('customers_online_list', customerSockets);
			// setInterval(() => {
			// 	socket.emit('customers_online_list', customerSockets);
			// }, 5000);
		});

		socket.on('psychics-online-ping', () => {
			socket.emit('psychics_online_list', psychicSockets);
			// setInterval(() => {
			// 	socket.emit('psychics_online_list', psychicSockets);
			// }, 5000);
		});

		socket.on('customer_send_message', customerMessage => {
			console.log('customer_send_message', customerMessage);
			socket.broadcast.emit('customer_send_message', customerMessage);
		});

		socket.on('psychic_send_message', psychicMessage => {
			console.log('psychic_send_message', psychicMessage);
			socket.broadcast.emit('psychic_send_message', psychicMessage);
		});

		// socket.on('enter-conversation', conversation =>
		// {
		//
		//     socket.join(conversation);
		// });
		//
		// socket.on('leave-conversation', conversation =>
		// {
		//     socket.leave(conversation);
		// });

		socket.on(ChatConstants.DISCONNECT, () => {
			console.log('desconectado', socket);
			// const userId: any = userSockets[socket.id];
			// delete userSockets[socket.id];
			//
			// if (userId) {
			//     io.sockets.emit('user-offline', userId);
			// }
		});
	});
};
