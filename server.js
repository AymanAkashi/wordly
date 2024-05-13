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
    AddLoser,
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
            console.log("join: ", data);
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
        socket.on("lose", (data) => {
            if (AddLoser(data.room, data.mode, socket.id)) {
                const room = getRoom(data.room);
                room.forEach((player) => {
                    const playerSocket = io.sockets.sockets.get(player.id);
                    playerSocket.emit("lose", data);
                });
            }
        });
        socket.on("end", (data) => {
            const room = getRoom(data.room);
            room.forEach((player) => {
                if (player.id !== data.id) {
                    const playerSocket = io.sockets.sockets.get(player.id);
                    playerSocket.emit("end", data);
                }
            });
        });
        socket.on("disconnect", () => {
            console.log("disconnected: ", socket.id);
            RemovePlayer(socket.id);
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
