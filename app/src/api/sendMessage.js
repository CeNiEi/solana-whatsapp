import { web3 } from '@project-serum/anchor'
import { useWorkspace } from '../composables'
import { Chat } from '../models'

export const sendMessage = async (content, roomPublicKey) => {
    const { wallet, program } = useWorkspace()
    const message = web3.Keypair.generate()

    await program.value.rpc.sendMessage(content, roomPublicKey, {
        accounts: {
            author: wallet.value.publicKey,
            message: message.publicKey,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [message]
    })

    const messageAccount = await program.value.account.message.fetch(message.publicKey)
    return new Chat(message.publicKey, messageAccount)
}