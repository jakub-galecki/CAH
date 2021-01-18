const {Room} = require('../utils/Room');
const {InvalidRequest} = require('../src/err');

module.exports.initRoom = async function initRoom(params) {
    // Check if user is not currently in other room
    for (const RoomInstance of params.rooms) {
        // @todo: find more sophisticated solution
        for (const currentClient of RoomInstance.users) {
            // @todo: handle it somehow
            if (params.client === currentClient) {
                throw new InvalidRequest('User is already in room');
            }
        }
    }

    const NewRoom = new Room(params.client.userData);
    params.rooms.push(NewRoom);
    return NewRoom.getInfo();
};

module.exports.getRooms = async function getRooms(params) {
    return params.rooms.map((room) => {
        return room.getInfo();
    });
};
