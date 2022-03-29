import { web3 } from '@project-serum/anchor'
import { useWorkspace } from '../composables'
import { Chat } from '../models'

export const sendMessage = async (content, roomPublicKey) => {
    const { wallet, program, provider } = useWorkspace()
    const message = web3.Keypair.generate()


    const tx = await program.value.rpc.sendMessage(content, roomPublicKey, {
        accounts: {
            message: message.publicKey,
            author: wallet.value.publicKey,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [message]
    })

    console.log(tx);
    //provider.value.connection.confirmTransaction(tx, 'confirmed'); 
    const messageAccount = await program.value.account.message.fetch(message.publicKey)

    /*


    try {
        console.log(message.publicKey.toBase58())
        const messageAccount = await program.value.account.message.fetch(message.publicKey)
        return new Chat(message.publicKey, messageAccount)
    } catch(err) {
        console.log(err);
    }
    */
}