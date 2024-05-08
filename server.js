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
    ["2x1", []],
    ["2x2", []],
    ["3x2", []],
    ["4x2", []],
]);
const clients = [];

let word;

class Game {
    constructor(players, word) {
        this.players.push(players);
        this.word = word;
    }
}

const getWord = async () => {
    const response = await fetch("http://localhost:3000/api/get-word");
    const data = await response.json();
    return data.data;
};

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", async (socket) => {
        // if the user already connected
        if (clients.includes(socket)) {
            return;
        }
        console.log("a user connected: ", socket.id);
        clients.push(socket);
        console.log("clients: ", clients.length);
        getWord().then((data) => {
            word = data;
        });
        socket.on("join", (data) => {
            // check if the user already in the queue
            if (
                queue.get(data.mode).some((player) => player.id === socket.id)
            ) {
                return;
            }
            queue.get(data.mode).push({ id: socket.id, user: data.user });
            console.log("word: ", word);
            if (queue.get(data.mode).length === +data.mode.split("x")[0]) {
                const players = queue.get(data.mode);
                console.log("players: ", players);
                console.log("clinet: ", clients.length);
                // getting each player socket from the queue
                players.forEach((player) => {
                    const playerSocket = clients.find(
                        (client) => client.id === player.id,
                    );
                    console.log("player: ", player.user);
                    playerSocket.emit("start", { word });
                });
                queue.set(data.mode, []);
            }
        });
        socket.on("disconnect", () => {
            console.log("disconnected: ", socket.id);
            // remove the user from the clients array
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
