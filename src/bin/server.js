import http from 'http';
import App from '../app/app';
import express from 'express';
import debug from 'debug';
import chalk from 'chalk';
import cluster from 'cluster';
import os from 'os';

const app = express();
const server = http.createServer(app);
const api = new App();

api.init(app, server).then(async () => {
  const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

  const onError = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ?
      'Pipe ' + port :
      'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
      'pipe ' + addr :
      'port ' + addr.port;
    debug('Listening on ' + bind);
  };

  server.listen(port, () => {
    console.log(chalk.green(`*-----------------------------*`));
    console.log(chalk.green(`| Server listen in port: ${port} |`));
    console.log(chalk.green(`| http://localhost:${port}       |`));
    console.log(chalk.green(`| Master process pid: ${process.pid}   |`));
    console.log(chalk.green(`| CPU cores Availables: ${os.cpus().length}    |`));
    console.log(chalk.green(`| Workers Spawned: ${Object.keys(cluster.workers).length}          |`));
    console.log(chalk.green(`*-----------------------------*`));
  });
  server.on('error', onError);
  server.on('listening', onListening);

  if (cluster.isMaster) {
    const clustersQuantity = process.env.FORKS === 'MAX' ? os.cpus().length : process.env.FORKS || 0;
    const workers = [];
    // const worker = cluster.fork();
    for (let i = 0; i < clustersQuantity; i++) {
      workers.push(cluster.fork());
      workers[i].on('message', function(message) {
        console.log(message);
      });
    }
    cluster.on('online', function(worker) {
      console.log(chalk.green(`*-----------------------------*`));
      console.log(chalk.green(`| worker created in pid ${worker.process.pid} |`));
      console.log(chalk.green(`*-----------------------------*`));
    });
    cluster.on('exit', function(worker, code, signal) {
      console.log(chalk.red(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`));
      console.log(chalk.green('Starting new worker...'));
      workers.push(cluster.fork());
    });
  }
});
