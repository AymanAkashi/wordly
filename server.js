const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const { createServer } = require("node:http");
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const queue = new Map([
    ["2x2", []],
    ["3x2", []],
    ["4x2", []],
]);
const clients = [];

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", async (socket) => {
        console.log("a user connected: ", socket.id);
        clients.push(socket);
        console.log("clients: ", clients.length);
        socket.on("join", (data) => {
            console.log("client join: ", generate);
            queue.get(data.mode).push({ id: socket.id, user: data.user });
            if (queue.get(data.mode).length === +data.mode.split("x")[0]) {
                const players = queue.get(data.mode);

                io.to(players[0]).emit("start", {
                    players,
                    word,
                });
                io.to(players[1]).emit("start", {
                    players,
                });
                queue.set(data.mode, []);
            }
        });
        socket.on("disconnect", () => {
            console.log("disconnected: ", socket.id);
            clients.filter((client) => client.id !== socket.id);
            clients.splice(clients.indexOf(socket), 1);
            console.log("clients: ", clients.length);
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
