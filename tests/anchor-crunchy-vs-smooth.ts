import * as anchor from '@project-serum/anchor';
import assert from 'assert';
import { Program } from '@project-serum/anchor';
import { AnchorCrunchyVsSmooth } from '../target/types/anchor_crunchy_vs_smooth';

const { web3, BN } = anchor;
const { SystemProgram, } = web3;

describe('anchor-crunchy-vs-smooth', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace
    .AnchorCrunchyVsSmooth as Program<AnchorCrunchyVsSmooth>;

  it('Initializes with 0 votes for crunchy and smooth', async () => {
    const [voteAccount, accountBump] =
      await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from('vote_account')],
        program.programId
      );

    console.log('Testing Initialize...');
    // The last element passed to RPC methods is always the transaction options
    // Because voteAccount is being created here, we are required to pass it as a signers array
    await program.rpc.initialize(new BN(accountBump) as unknown as number, {
      accounts: {
        voteAccount: voteAccount,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      }
    });

    const account = await program.account.votingState.fetch(
      voteAccount
    );
    console.log('Crunchy: ', account.crunchy.toString());
    console.log('Smooth: ', account.smooth.toString());
    assert.ok(
      parseInt(account.crunchy.toString()) == 0 && parseInt(account.smooth.toString()) == 0
    );
  });
  it('Votes correctly for crunchy', async () => {
    const [voteAccount] =
      await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from('vote_account')],
        program.programId
      );

    console.log('Testing voteCrunchy...');
    await program.rpc.voteCrunchy({
      accounts: {
        voteAccount: voteAccount,
      },
    });

    const account = await program.account.votingState.fetch(
      voteAccount
    );
    console.log('Crunchy: ', account.crunchy.toString());
    console.log('Smooth: ', account.smooth.toString());

    assert.ok(
      parseInt(account.crunchy.toString()) == 1 && parseInt(account.smooth.toString()) == 0
    );
  });
  it('Votes correctly for smooth', async () => {
    console.log('Testing voteSmooth...');

    const [voteAccount] =
      await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from('vote_account')],
        program.programId
      );

    await program.rpc.voteSmooth({
      accounts: {
        voteAccount: voteAccount,
      },
    });

    const account = await program.account.votingState.fetch(
      voteAccount
    );
    console.log('Crunchy: ', account.crunchy.toString());
    console.log('Smooth: ', account.smooth.toString());

    assert.ok(
      parseInt(account.crunchy.toString()) == 1 && parseInt(account.smooth.toString()) == 1
    );
  });
});
