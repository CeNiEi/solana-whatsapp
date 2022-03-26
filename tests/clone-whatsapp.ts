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
      await program.rpc.sendMessage('veganism', room.publicKey, {
        accounts: {
          message: message.publicKey,
          author: program.provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [
          message
        ],
      });
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

    messageAccounts.forEach((acc) => {
      assert.equal(acc.account.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    })

  });

  it('can filter messages by author', async () => {
    const authorPublicKey = program.provider.wallet.publicKey
    const messageAccounts = await program.account.message.all([
      {
        memcmp: {
          offset: 8,
          bytes: authorPublicKey.toBase58(),
        }
      }
    ]);

    assert.equal(messageAccounts.length, 11);
    assert.ok(messageAccounts.every(messageAccount => {
      return messageAccount.account.author.toBase58() === authorPublicKey.toBase58()
    }))
  });

});
