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

const Losers = new Map([[]]);

const rooms = new Map([[]]);

const AddPlayer = (player) => {
    queue.get(player.mode).find((p) => p.id === player.id)
        ? null
        : queue.get(player.mode).push(player);
};

const CreateLosers = (room) => {
    Losers.set(room, []);
};

const AddLoser = (room, sizeRoom, socketId) => {
    if (!Losers.has(room)) {
        CreateLosers(room);
    }
    const roomLosers = Losers.get(room);
    console.log("Add loser: ", roomLosers, " mode: ", sizeRoom);
    if (roomLosers && roomLosers.find((p) => p == socketId)) {
        return false;
    }
    roomLosers.push(socketId);
    console.log("Add loser: ", roomLosers);
    if (roomLosers && roomLosers.length === sizeRoom) {
        console.log("finished game!");
        return true;
    }
    return false;
};

const JoinRoom = (player, room) => {
    if (rooms.has(room)) {
        rooms.get(room).push(player);
    } else {
        rooms.set(room, [player]);
    }
};

const RemovePlayer = (socketId) => {
    queue.forEach((mode) => {
        const index = mode.findIndex((player) => player.id === socketId);
        if (index !== -1) {
            mode.splice(index, 1);
        }
    });
};

const addPlayerToQueue = (player) => {
    const mode = queue.find((mode) => mode[player.mode]);
    if (mode) {
        mode[player.mode].push(player);
    }
};

const removePlayerFromQueue = (player) => {
    const mode = queue.find((mode) => mode[player.mode]);
    if (mode) {
        const index = mode[player.mode].findIndex((p) => p.id === player.id);
        if (index !== -1) {
            mode[player.mode].splice(index, 1);
        }
    }
};

const getQueue = (mode) => {
    const modeQueue = queue.find((r) => r[mode]);
    return modeQueue ? modeQueue[mode] : [];
};

const getMode = (mode) => {
    const modePlayers = queue.find((r) => r[mode]);
    return modePlayers ? modePlayers[mode] : [];
};

const getPlayers = () => {
    return;
};

const getRoom = (room) => {
    return rooms.get(room);
};

const CheckQueue = (mode) => {
    const modeQueue = queue.get(mode);
    try {
        return modeQueue.length === parseInt(mode.split("x")[0])
            ? modeQueue
            : false;
    } catch (e) {
        console.log("Check queue ", e);
        return false;
    }
};

const getWord = async () => {
    const response = await fetch("http://localhost:3000/api/get-word");
    const data = await response.json();
    return data.data;
};

module.exports = {
    CheckQueue,
    AddPlayer,
    RemovePlayer,
    addPlayerToQueue,
    removePlayerFromQueue,
    getWord,
    getQueue,
    getMode,
    getPlayers,
    JoinRoom,
    getRoom,
    AddLoser,
};
