import {ChatConstants} from './constants';

export default io =>
{
    let userSockets: any;

    io.on(ChatConstants.CONNECT, socket =>
    {
		console.log('conectado')

		socket.on('customer_online', customer =>
		{
		    console.log('customer_online', customer);
			socket.broadcast.emit('customer_online', customer);
		});

		socket.on('psychic_online', psychic =>
		{
			console.log('psychic_online', psychic);
			socket.broadcast.emit('psychic_online', psychic);
		});

		socket.on('customer_send_message', customerMessage =>
		{
			console.log('customer_send_message', customerMessage);
			socket.broadcast.emit('customer_send_message', customerMessage);
		});

		socket.on('psychic_send_message', psychicMessage =>
		{
			console.log('psychic_send_message', psychicMessage);
			socket.broadcast.emit('psychic_send_message', psychicMessage);
		});

        socket.on(ChatConstants.DISCONNECT, () =>
        {
            console.log('desconectado', socket)
            // const userId: any = userSockets[socket.id];
            // delete userSockets[socket.id];
			//
            // if (userId) {
            //     io.sockets.emit('user-offline', userId);
            // }
        });

        // socket.on('online-ping', user =>
        // {
        //     if (userId) {
        //         userSockets[socket.id] = user;
        //         socket.broadcast.emit('user-online', user);
		//
        //         setTimeout(() =>
        //         {
        //             // Send currently online users
        //             socket.emit('online-users', Object.values(userSockets));
        //         }, 1000);
        //     }
        // });

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
		//
        // socket.on('customer-send-message', message =>
        // {
			// console.log('AAAA', message)
			// io.to(`${socket.id}`).emit(message);
        //     // socket.emit('new-message', message);
        // });
    });
};
