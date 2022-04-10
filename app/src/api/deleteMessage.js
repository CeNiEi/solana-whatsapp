import { useWorkspace } from '../composables'

export const deleteMessage = async (messagePublicKey) => {
    const { wallet, program } = useWorkspace();

    await program.value.rpc.deleteMessage({
        accounts: {
            author: wallet.value.publicKey,
            message: messagePublicKey
        }
    });
}