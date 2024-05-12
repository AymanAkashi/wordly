const next = require("next");
const { Server } = require("socket.io");
const crypto = require("crypto");

const dev = process.env.NODE_ENV !== "production";
const { createServer } = require("node:http");
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
const {
    AddPlayer,
    RemovePlayer,
    addPlayerToQueue,
    removePlayerFromQueue,
    getWord,
    getPlayers,
    getQueue,
    getMode,
    CheckQueue,
    JoinRoom,
    getRoom,
} = require("./game");

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", async (socket) => {
        console.log("connected: ", socket.id);
        getWord().then((data) => {
            word = data;
        });
        socket.on("join", (data) => {
            AddPlayer({
                id: socket.id,
                name: data.name,
                avatar: data.avatar,
                mode: data.mode,
            });
            const Mode = CheckQueue(data.mode);
            if (Mode) {
                const roomUID = crypto.randomBytes(16).toString("hex");
                console.log("Check queue: ", Mode);
                Mode.forEach((player) => {
                    const playerSocket = io.sockets.sockets.get(player.id);
                    JoinRoom(player, roomUID);
                    playerSocket.join(roomUID);
                    playerSocket.emit("joined", {
                        players: Mode,
                        room: roomUID,
                        word,
                    });
                });
            }
        });
        socket.on("leave", () => {
            RemovePlayer(socket.id);
            removePlayerFromQueue(socket.id);
            socket.emit("players", getPlayers());
        });
        socket.on("end", (data) => {
            const room = getRoom(data.room);
            room.forEach((player) => {
                const playerSocket = io.sockets.sockets.get(player.id);
                playerSocket.leave(data.room);
                playerSocket.emit("end", data);
            });
        });
        socket.on("disconnect", () => {
            console.log("disconnected: ", socket.id);
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
