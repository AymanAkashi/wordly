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
    [1, []],
    [2, []],
    [3, []],
    [4, []],
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
        socket.on("click", (data) => {
            console.log("click clients: ", data);
            const othersClients = clients.filter(
                (client) => client.id !== socket.id
            );
            othersClients.forEach((client) => {
                client.emit("message", {
                    user: socket.id.slice(8),
                    message: data,
                });
            });
        });
        socket.on("disconnect", () => {
            console.log("disconnected: ", socket.id);
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
