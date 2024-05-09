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
    ["3x1", []],
    ["4x1", []],
    ["2x2", []],
    ["3x2", []],
    ["4x2", []],
    ["2x3", []],
    ["3x3", []],
    ["4x3", []],
]);
let clients = [];

let word;

class Game {
    constructor(players, word) {
        this.players.push(players);
        this.word = word;
    }
}
// Array of games that have each player in the game
let games = [];

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
                // push the players to the games array once the game started
                games.push(players);
                queue.set(data.mode, []);
            }
        });
        socket.on("end", (data) => {
            // find the winner:
            console.log("data: ", data);
            console.log("games: ", games);
            let winner;
            games.forEach(
                (game) =>
                    (winner = game.filter((player) => player.id === data.id)),
            );
            console.log("winner: ", winner);
            // send the end game to the other players
            games.forEach((game) => {
                game.forEach((player) => {
                    if (player.id !== data.id) {
                        const playerSocket = clients.find(
                            (client) => client.id === player.id,
                        );
                        playerSocket.emit("end", { user: winner[0].user });
                    }
                });
            });

            // remove the game from the games array
            games = games.filter((game) => {
                game.find((player) => player.id !== data.id);
            });
        });
        socket.on("disconnect", () => {
            console.log("disconnected: ", socket.id);
            // remove the user from the clients array
            clients = clients.filter((client) => client.id !== socket.id);
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
