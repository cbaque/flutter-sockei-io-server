const { io } = require('../index');
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });

    client.on('mensaje',(err) => {
        console.log('Mnesaje', err)

        io.emit('mensaje', { admin: 'Nuevo Mensaje'  });
    });

    client.on('emitir-mensaje',(payload) => {
        console.log(payload);

        // io.emit('nuevo-mensaje', payload);  // EMITE A TODOS
        client.broadcast.emit('nuevo-mensaje', payload);
    });

});