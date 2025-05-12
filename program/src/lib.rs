use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod cpop_program {
    use super::*;

    /// Initialize a new event with compressed tokens
    pub fn initialize_event(
        ctx: Context<InitializeEvent>,
        event_name: String,
        event_description: String,
        token_supply: u64,
    ) -> Result<()> {
        let event = &mut ctx.accounts.event;
        let creator = &ctx.accounts.creator;

        // Set event data
        event.creator = creator.key();
        event.event_name = event_name;
        event.event_description = event_description;
        event.token_supply = token_supply;
        event.tokens_claimed = 0;
        event.is_active = true;
        event.created_at = Clock::get()?.unix_timestamp;

        // In a real implementation, this would initialize the compressed token mint
        // using Light Protocol's compressed token library

        msg!("Event initialized: {}", event_name);
        Ok(())
    }

    /// Claim a compressed token for an event
    pub fn claim_token(ctx: Context<ClaimToken>) -> Result<()> {
        let event = &mut ctx.accounts.event;
        let claimer = &ctx.accounts.claimer;

        // Check if event is active
        require!(event.is_active, ErrorCode::EventInactive);

        // Check if there are tokens left to claim
        require!(event.tokens_claimed < event.token_supply, ErrorCode::NoTokensLeft);

        // In a real implementation, this would mint a compressed token to the claimer
        // using Light Protocol's compressed token library

        // Update event state
        event.tokens_claimed += 1;

        msg!("Token claimed by: {}", claimer.key());
        Ok(())
    }

    /// Deactivate an event
    pub fn deactivate_event(ctx: Context<DeactivateEvent>) -> Result<()> {
        let event = &mut ctx.accounts.event;
        let creator = &ctx.accounts.creator;

        // Ensure only the creator can deactivate the event
        require!(event.creator == creator.key(), ErrorCode::Unauthorized);

        event.is_active = false;
        msg!("Event deactivated: {}", event.event_name);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeEvent<'info> {
    #[account(init, payer = creator, space = Event::LEN)]
    pub event: Account<'info, Event>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimToken<'info> {
    #[account(mut)]
    pub event: Account<'info, Event>,
    #[account(mut)]
    pub claimer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeactivateEvent<'info> {
    #[account(mut)]
    pub event: Account<'info, Event>,
    pub creator: Signer<'info>,
}

#[account]
pub struct Event {
    pub creator: Pubkey,
    pub event_name: String,
    pub event_description: String,
    pub token_supply: u64,
    pub tokens_claimed: u64,
    pub is_active: bool,
    pub created_at: i64,
}

impl Event {
    pub const LEN: usize = 8 + // discriminator
                             32 + // creator pubkey
                             4 + 100 + // event_name (max 100 chars)
                             4 + 500 + // event_description (max 500 chars)
                             8 + // token_supply
                             8 + // tokens_claimed
                             1 + // is_active
                             8; // created_at
}

#[error_code]
pub enum ErrorCode {
    #[msg("Event is not active")]
    EventInactive,
    #[msg("No tokens left to claim")]
    NoTokensLeft,
    #[msg("Unauthorized operation")]
    Unauthorized,
}
