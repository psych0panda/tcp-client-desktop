import net from 'net';
const port = 27010;
const host = 'localhost';
const conn = net.createConnection(port, host);
conn.on('connect', function() {
      console.log('connected to server');
      conn.write('Hello Server', () => {
          conn.on('data' , function (data){
          console.log("Data received from the server: " , data.toString());
          conn.end();
        });
    });
});

conn.on('error', function(err) {
      console.log('Error in connection:', err);
});
