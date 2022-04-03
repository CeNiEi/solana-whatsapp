import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { CloneWhatsapp } from '../target/types/clone_whatsapp';
import * as assert from 'assert';

describe('clone-whatsapp', () => {

  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.CloneWhatsapp as Program<CloneWhatsapp>;

  it('can create a room and send a new message', async () => {

    const message = anchor.web3.Keypair.generate();
    const room = anchor.web3.Keypair.generate();

    await program.rpc.createRoom('second_group_name', 'second_group_desc', {
      accounts: {
        room: room.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [
        room
      ]
    });

    for (var i = 0; i <= 10; ++i) {
      const message = anchor.web3.Keypair.generate();
      const other = anchor.web3.Keypair.generate();
      const signature = await program.provider.connection.requestAirdrop(other.publicKey, 1000000000);
      await program.provider.connection.confirmTransaction(signature);

      const res = await program.rpc.sendMessage('temp', room.publicKey, {
        accounts: {
          message: message.publicKey,
          author: other.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [
          message, other
        ],
      });

      //await program.provider.connection.confirmTransaction(res, 'confirmed')

      const messageRes = await program.account.message.fetch(message.publicKey);
      assert.equal(messageRes.author.toBase58(), other.publicKey.toBase58())
    }

    const messages = await program.account.message.all();
    messages.forEach(message => assert.equal(message.account.room.toBase58(), room.publicKey.toBase58()));

    const roomAccount = await program.account.room.fetch(room.publicKey);

    assert.equal(roomAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(roomAccount.name, 'second_group_name');
    assert.equal(roomAccount.description, 'second_group_desc');
    assert.ok(roomAccount.timestamp);

  });

  it('can fetch all rooms', async () => {
    const roomAccounts = await program.account.room.all();
    assert.equal(roomAccounts.length, 1);
  })

  it('can fetch all messages', async () => {
    const messageAccounts = await program.account.message.all();
    assert.equal(messageAccounts.length, 11);

  });

});
