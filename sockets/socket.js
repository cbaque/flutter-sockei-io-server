const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band('EROS RAMAZOTTI.') );
bands.addBand( new Band('JULIO JARAMILLO') );
bands.addBand( new Band('METALICA') );
bands.addBand( new Band('QUEEN') );


io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });

    client.on('mensaje',(err) => {
        console.log('Mnesaje', err)

        io.emit('mensaje', { admin: 'Nuevo Mensaje'  });
    });

    // client.on('emitir-mensaje',(payload) => {
    //     console.log(payload);

    //     // io.emit('nuevo-mensaje', payload);  // EMITE A TODOS
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });

    client.on('vote-band',(payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });  
    
    client.on('add-band',(payload) => {
        bands.addBand( new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });   

    client.on('delete-band',(payload) => {
        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands());
    });     

});