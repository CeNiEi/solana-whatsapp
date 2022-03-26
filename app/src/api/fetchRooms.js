import { useWorkspace } from "src/composables";
import { Room } from "src/models";

export const fetchRooms = async () => {
    const { program } = useWorkspace();
    const rooms = await program.value.account.room.all();
    return rooms.map(room => new Room(room.publicKey, room.account));
}