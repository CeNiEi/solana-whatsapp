import { web3 } from '@project-serum/anchor'
import { useWorkspace } from '../composables'
import { Room } from '../models'

export const createRoom = async (name, description) => {
    const { wallet, program } = useWorkspace()
    const room = web3.Keypair.generate()

    await program.value.rpc.createRoom(name, description, {
        accounts: {
            author: wallet.value.publicKey,
            room: room.publicKey,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [room]
    })

    const roomAccount = await program.value.account.room.fetch(room.publicKey)
    return new Room(room.publicKey, roomAccount)
}