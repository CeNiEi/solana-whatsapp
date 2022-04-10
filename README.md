# **SolWApp**

## **A WhatsApp Clone which is powered by Solana**

Allows the user to create a Group, send, view and delete messages in any group.

**Currently supports only Phantom Wallet**

Deployed on Devnet => [https://solana-whatsapp.netlify.app](https://solana-whatsapp.netlify.app)

---

## How to Run Locally 

- On LocalHost

    1. [First, Make Sure you have Rust, anchor-cli, solana and yarn installed](https://project-serum.github.io/anchor/getting-started/installation.html#installing-dependencies)
    2. Run `solana config set --url localhost` to shift to work on localhost
    3. Make Sure you have a local keypair by running `solana address` in a terminal. If not then run `solana-keygen new` and follow the steps.
    4. Clone the repo and run `yarn` in the root directory as well as in *app* directory.
    5. Now build the program by running `anchor build` in a terminal.
    6. Start the local ledger by running `solana-test-validator` and deploy the program by running `anchor deploy` in another terminal.
    7. Run `solana address -k target/deploy/clone_whatsapp-keypair.json` to generate your program_id.
    8. Open *Anchor.toml* in the root directory and replace the address occurences in `program.localnet` and `program.devnet` fields with the address generated in the previous command
    9. Open *programs/clone-whatsapp/src/lib* and replace the address in `declare_id` macro as well with your program_id.
    10. Run `anchor build` and `anchor deploy` once more.
    11. Make sure you have [*Phantom*](https://phantom.app/) wallet installed and running on localhost.
    12. In the root directory run `anchor run copy-idl`.
    13. Start your local ledger by running `anchor localnet`
    14. AirDrop some *SOL* to your phantom wallet by running `solana airdrop 100 <YOUR-PHANTOM-WALLET-ADDRESS>`.
    15. `cd` to the app subdirectory and run `yarn serve`. 
---
- On DevNet
    1. Run `solana config set --url devnet` to shift to work on devnet.
    2. In the root directory run `anchor run copy-idl`.
    3. Run `solana airdrop 2` to fund your local wallet to deploy the program. Run the command once more if more funds are required to deploy the program.
    4. Fund your phantom wallet by running `solana airdrop 2 <YOUR-PHANTOM-WALLET-ADDRESS>`.
    15. `cd` to the app subdirectory and run `yarn serve:devnet`.


---



![image](https://user-images.githubusercontent.com/52526849/161444795-708756b3-5eb7-4ec8-874c-7c9af31fae80.png)


![image](https://user-images.githubusercontent.com/52526849/161444824-08421b6b-e24f-4589-8acf-97320da31de2.png)


![image](https://user-images.githubusercontent.com/52526849/161444878-8186e40e-e8e3-4882-8e06-fb642960dde8.png)


![image](https://user-images.githubusercontent.com/52526849/161444972-263fd998-8dab-4177-9e52-f61ac1642067.png)

---
The avatars were taken from the DiceBear api =>
1. [adventurer](https://avatars.dicebear.com/styles/adventurer) 
2. [identicon](https://avatars.dicebear.com/styles/identicon)
