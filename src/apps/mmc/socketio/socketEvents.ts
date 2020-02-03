import {ChatConstants} from './constants';

export default io =>
{
    let userSockets: any;

    io.on(ChatConstants.CONNECT, socket =>
    {
		console.log(socket.id)
        // console.log('connect', socket)
		// socket.on('SEND_MESSAGE', (data) => {
			// io.emit('MESSAGE', data)
		// });

        socket.on(ChatConstants.DISCONNECT, () =>
        {
            const userId: any = userSockets[socket.id];
            delete userSockets[socket.id];

            if (userId) {
                io.sockets.emit('user-offline', userId);
            }
        });

        socket.on('online-ping', userId =>
        {
            if (userId) {
                userSockets[socket.id] = userId;
                socket.broadcast.emit('user-online', userId);

                setTimeout(() =>
                {
                    // Send currently online users
                    socket.emit('online-users', Object.values(userSockets));
                }, 1000);
            }
        });

        socket.on('enter-conversation', conversation =>
        {

            socket.join(conversation);
        });

        socket.on('leave-conversation', conversation =>
        {
            socket.leave(conversation);
        });

        socket.on('customer-send-message', message =>
        {
			console.log('AAAA', message)
			io.to(`${socket.id}`).emit(message);
            // socket.emit('new-message', message);
        });
    });
};
