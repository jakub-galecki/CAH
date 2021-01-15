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

    const NewRoom = new Room(params.client);
    params.rooms.push(NewRoom);
    console.log(`Rooms num = ${params.rooms.length}`);
    console.log('New room created!');
    // @todo: change it
    return NewRoom;
};

