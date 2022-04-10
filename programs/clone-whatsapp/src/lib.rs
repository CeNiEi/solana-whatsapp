mod state;

use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("7XXgV81GPUBL2YMZV32cD2C6NtjsqDZP2EmdNdJoZY3h");

#[program]
pub mod clone_whatsapp {
    use super::*;
    pub fn send_message(ctx: Context<SendMessage>, content: String, room_key: Pubkey) -> ProgramResult {
        let message = &mut ctx.accounts.message;
        let author = &ctx.accounts.author;
        let clock = Clock::get().unwrap();

        if content.chars().count() > 256 {
            return Err(ErrorCode::ContentTooLong.into());
        }

        message.author = *author.key;
        message.timestamp = clock.unix_timestamp;
        message.content = content;
        message.room = room_key;

        Ok(())
    }

    pub fn create_room(ctx: Context<CreateRoom>, name: String, description: String) -> ProgramResult {
        let room = &mut ctx.accounts.room;
        let author = &ctx.accounts.author;
        let clock = Clock::get().unwrap();

        if description.chars().count() > 256 {
            return Err(ErrorCode::ContentTooLong.into());
        }

        if name.chars().count() > 256 {
            return Err(ErrorCode::ContentTooLong.into());
        }

        room.author = *author.key;
        room.name = name;
        room.timestamp = clock.unix_timestamp;
        room.description = description;

        Ok(())

    }

    pub fn delete_message(_ctx: Context<DeleteMessage>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct DeleteMessage<'info> {
    #[account(mut, has_one = author, close = author)]
    pub message: Account<'info, state::Message>,
    pub author: Signer<'info>
}

#[derive(Accounts)]
pub struct SendMessage<'info> {
    #[account(init, payer = author, space = state::Message::LEN)]
    pub message: Account<'info, state::Message>,
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CreateRoom<'info> {
    #[account(init, payer = author, space = state::Room::LEN)]
    pub room: Account<'info, state::Room>, 
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>
}
#[error]
pub enum ErrorCode {
    #[msg("The provided content should be 256 characters long maximum.")]
    ContentTooLong,
}


