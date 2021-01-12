import {RpcClient} from './client.js';

/**
 * @return {array}
 */
async function fewcalls() {
    const body = {
        username: 'Kuba11111',
        password: 'helloWorld',
    };
    const {token} = await postData('http://localhost:8080/user/login', body);
    const ws = new WebSocket('ws://localhost:8080/' + 'token=' + token);
    const rpc = new RpcClient(ws);
    const res1 = await rpc.send('deck.getAllDecks', {}, false);
    const res2 = await rpc.send('deck.getDeck', {deckId: 'MY2VJX'}, false);
    return [res1, res2];
}
async function call() {
    const body = {
        username: 'Kuba11111',
        password: 'helloWorld',
    };
    const {token} = await postData('http://localhost:8080/user/login', body);
    const ws = new WebSocket('ws://localhost:8080/' + 'token=' + token);
    const rpc = new RpcClient(ws);
    return await rpc.send('deck.getDeck', {deckId: 'MY2VJX'}, false);
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'mode': 'cors',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

fewcalls().then((res)=>{
    console.log('2');
    console.log(res);
});
call().then((res) => {
    console.log('1');
    console.log(res);
});

