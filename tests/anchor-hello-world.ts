import * as assert from 'assert';
import BN from 'bn.js';
import * as anchor from '@project-serum/anchor';
import { Provider, Program } from '@project-serum/anchor';
import { PublicKey, Keypair, SystemProgram } from '@solana/web3.js';
//import { AnchorHelloWorld } from '../target/types/anchor_hello_world';

describe('anchor-hello-world', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.local();
  anchor.setProvider(provider);

  //const program = anchor.workspace.AnchorHelloWorld as Program<AnchorHelloWorld>;
  const program = anchor.workspace.AnchorHelloWorld;

  const counter = Keypair.generate();

  it('Create a counter', async () => {
    await program.rpc.initialize(new anchor.BN(0), {
      accounts: {
        counter: counter.publicKey, 
        authority: provider.wallet.publicKey, 
        systemProgram: SystemProgram.programId, 
      }, 
      signers: [counter], 
    });
  });

  it('Increment a counter', async () => {
    await program.rpc.increment({
      accounts: {
        counter: counter.publicKey, 
        authority: provider.wallet.publicKey, 
      }, 
    });

    const account = await program.account.counter.fetch(counter.publicKey);
    assert.ok(account.count == 1);
    assert.ok(account.authority.equals(provider.wallet.publicKey));
  });

});
