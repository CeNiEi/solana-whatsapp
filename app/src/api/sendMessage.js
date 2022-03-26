import { web3 } from '@project-serum/anchor'
import { useWorkspace } from '../composables'
import { Chat } from '../models'

export const sendMessage = async (content, roomPublicKey) => {
    const { wallet, program } = useWorkspace()
    const message = web3.Keypair.generate()

    await program.value.rpc.sendMessage(content, roomPublicKey, {
        accounts: {
            message: message.publicKey,
            author: wallet.value.publicKey,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [message]
    });

    try {
        //console.log(message.publicKey.toBase58());
        const messageAccount = await program.value.account.message.fetch(message.publicKey)
        return new Chat(message.publicKey, messageAccount)
    } catch (err) {
        console.log(err);
    }
}