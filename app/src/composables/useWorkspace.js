import { computed } from 'vue';
import { Connection, PublicKey } from '@solana/web3.js';
import { useAnchorWallet } from 'solana-wallets-vue';
import { Provider, Program } from '@project-serum/anchor';
import idl from '../../../target/idl/clone_whatsapp.json';

const preflightCommitment = 'processed';
const commitment = 'processed';
const programId = new PublicKey(idl.metadata.address);
let workspace = null;

export const useWorkspace = () => workspace;

export const initWorkspace = () => {
    const wallet = useAnchorWallet();
    const connection = new Connection('http://127.0.0.1:8899');
    const provider = computed(() => new Provider(connection, wallet.value, { preflightCommitment, commitment }))
    const program = computed(() => new Program(idl, programId, provider.value));

    workspace = {
        wallet, 
        connection, 
        provider,
        program
    };
}