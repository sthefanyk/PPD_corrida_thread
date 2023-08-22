const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  
  console.log('Thread principal iniciada.');

  
  const worker1 = new Worker(__filename);
  const worker2 = new Worker(__filename);

  
  worker1.postMessage('Thread 1');
  worker2.postMessage('Thread 2');
  
  
  worker1.on('message', message => console.log(`Mensagem da thread 1: ${message}`));
  worker2.on('message', message => console.log(`Mensagem da thread 2: ${message}`));
  
  
  worker1.on('exit', code => console.log(`Thread 1 saiu com código ${code}`));
  worker2.on('exit', code => console.log(`Thread 2 saiu com código ${code}`));
} else {
  const threadName = `Thread ${isMainThread ? 'Principal' : 'Filha'}`;
  parentPort.on('message', message => {
    console.log(`${threadName} recebeu a mensagem: ${message}`);
    parentPort.postMessage(`${threadName} respondeu.`);
  });
}