use anchor_lang::prelude::*;
use anchor_eventline::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod eventline_example {
    use super::*;

    pub fn emit_events(_ctx: Context<EmitEvents>) -> Result<()> {
        emit!(SwapEvent {
            user: Pubkey::default(),
            amount_in: 100,
            amount_out: 95,
        });

        emit!(DepositEvent {
            user: Pubkey::default(),
            amount: 1000,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct EmitEvents {}

#[event]
#[derive(Eventline)]
#[eventline(name = "SwapEvent", version = 1)]
pub struct SwapEvent {
    pub user: Pubkey,
    pub amount_in: u64,
    pub amount_out: u64,
}

#[event]
#[derive(Eventline)]
#[eventline(name = "DepositEvent", version = 1)]
pub struct DepositEvent {
    pub user: Pubkey,
    pub amount: u64,
}
