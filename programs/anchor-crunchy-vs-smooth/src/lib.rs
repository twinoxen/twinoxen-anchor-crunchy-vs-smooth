use anchor_lang::prelude::*;

declare_id!("JBtS6J2Z8R6TbXoiDyTpThQK4eKa3bdg77dHvfWuHRox");

#[program]
pub mod anchor_crunchy_vs_smooth {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, vote_account_bump: u8) -> ProgramResult {
        ctx.accounts.vote_account.bump = vote_account_bump;
        Ok(())
    }

    pub fn vote_crunchy(ctx: Context<Vote>) -> ProgramResult {
        ctx.accounts.vote_account.crunchy +=1;
        Ok(())
    }

    pub fn vote_smooth(ctx: Context<Vote>) -> ProgramResult {
        ctx.accounts.vote_account.smooth +=1;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(vote_account_bump: u8)]
pub struct Initialize<'info> {
    #[account(
        init,
        seeds = [b"vote_account".as_ref()],
        bump = vote_account_bump,
        payer = user
    )]
    vote_account: Account<'info, VotingState>,
    user: Signer<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(
        mut, 
        seeds = [b"vote_account".as_ref()],
        bump = vote_account.bump,
    )]
    vote_account: Account<'info, VotingState>,
}

#[account]
#[derive(Default)]
pub struct VotingState {
    crunchy: u64,
    smooth: u64,
    bump: u8,
}
