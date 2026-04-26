export default function socketHandler(io) {
    io.on("connection", (socket) => {
        console.log(`🔌 Connected: ${socket.id}`);

        handleRegister(socket)
        handleMessages(socket, io);
        handleDisconnect(socket);
    });
}

function handleRegister(socket) {
    socket.on("register", (userId) => {
            if (!userId) return;

            socket.join(userId);
            console.log("👤 joined room:", userId);
    });
}

function handleMessages(socket, io) {
    socket.on("message", (data) => {
        io.emit("new-message", data);
    });
}

function handleDisconnect(socket) {
    socket.on("disconnect", () => {
        console.log(`❌ Disconnected: ${socket.id}`);
    });
}