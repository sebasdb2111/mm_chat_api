import {ChatConstants} from './constants';

export default io =>
{
    let userSockets: any;

    io.on(ChatConstants.CONNECT, socket =>
    {
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

        socket.on('send-message', message =>
        {
            socket.broadcast.to(message.conversationId).emit('new-message', message);
        });
    });
};
