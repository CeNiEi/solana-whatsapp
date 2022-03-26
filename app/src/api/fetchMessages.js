import { useWorkspace } from '../composables'
import { Chat } from '../models'

export const fetchMessages = async (roomPublicKey) => {
    const { program } = useWorkspace();
    const messages = await program.value.account.message.all(roomPublicKey => ({
        memcmp: {
            offset: 8 + 32, 
            bytes: roomPublicKey,
        }
    }));
    return messages.map(message => new Chat(message.publicKey, message.account));
}

