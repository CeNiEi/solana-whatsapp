import { web3 } from '@project-serum/anchor'
import { useWorkspace } from '../composables'
import { Chat } from '../models'

export const sendMessage = async (content, roomPublicKey) => {
    const { wallet, program, provider } = useWorkspace()
    const message = web3.Keypair.generate()


    const tx = await program.value.rpc.sendMessage(content, roomPublicKey, {
        accounts: {
            author: wallet.value.publicKey,
            message: message.publicKey,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [message]
    })

    //console.log(message.publicKey.toBase58());
    //await provider.value.connection.confirmTransaction(tx, 'confirmed'); 
    //const messageAccount = await program.value.account.message.fetch(message.publicKey);


    const messageAccount = await program.value.account.message.fetch(message.publicKey)
    return new Chat(message.publicKey, messageAccount)
}