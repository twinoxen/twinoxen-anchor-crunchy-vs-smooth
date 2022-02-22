use anchor_lang::prelude::*;

declare_id!("JBtS6J2Z8R6TbXoiDyTpThQK4eKa3bdg77dHvfWuHRox");

#[program]
pub mod anchor_crunchy_vs_smooth {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
