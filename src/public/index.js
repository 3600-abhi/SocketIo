document.addEventListener('DOMContentLoaded', function () {
    const socket = io();

    const input = document.getElementById('chat_box');
    const msgList = document.getElementById('msg_list');
    const send = document.getElementById('send');

    send.addEventListener('click', function () {
        const msg = input.value;

        socket.emit('new_msg', { message: msg });

        input.value = '';
    });

    socket.on('msg_rcvd', function (data) {
        const msg = document.createElement('li');
        msg.textContent = data.message;
        msgList.appendChild(msg);
    });
});