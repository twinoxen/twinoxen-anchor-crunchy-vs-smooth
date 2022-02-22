import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { AnchorCrunchyVsSmooth } from '../target/types/anchor_crunchy_vs_smooth';

describe('anchor-crunchy-vs-smooth', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.AnchorCrunchyVsSmooth as Program<AnchorCrunchyVsSmooth>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
