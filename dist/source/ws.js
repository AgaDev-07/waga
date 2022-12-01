"use strict";
const ws = function init() {
    const ws = new WebSocket('ws://%HOST%/ws');
    ws.onopen = () => {
        console.log('connected');
    };
    ws.onmessage = (e) => {
        console.log(e);
    };
    ws.onclose = () => {
        console.log('disconnected');
    };
    return ws;
};
