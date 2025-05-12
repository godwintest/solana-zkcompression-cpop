import { Connection, PublicKey, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';
import { Program, AnchorProvider, web3, BN } from '@project-serum/anchor';

// This would be the actual program ID in a real implementation
const PROGRAM_ID = new PublicKey('Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS');

/**
 * Initialize a new event with compressed tokens
 * @param connection Solana connection
 * @param wallet The wallet that will pay for the transaction
 * @param eventName Name of the event
 * @param eventDescription Description of the event
 * @param tokenSupply Number of tokens to mint
 * @returns Transaction signature and event public key
 */
export async function initializeEvent(
  program: Program,
  wallet: web3.Keypair | web3.PublicKey,
  eventName: string,
  eventDescription: string,
  tokenSupply: number
): Promise<{ txSignature: string, eventPubkey: PublicKey }> {
  // In a real implementation, this would use the actual program to initialize an event
  // For now, we'll simulate the process
  
  // Generate a new keypair for the event account
  const eventKeypair = web3.Keypair.generate();
  
  try {
    // Call the program to initialize the event
    const tx = await program.methods.initializeEvent(
      eventName,
      eventDescription,
      new BN(tokenSupply)
    )
    .accounts({
      event: eventKeypair.publicKey,
      creator: wallet instanceof web3.Keypair ? wallet.publicKey : wallet,
      systemProgram: SystemProgram.programId,
    })
    .signers(wallet instanceof web3.Keypair ? [wallet, eventKeypair] : [eventKeypair])
    .rpc();
    
    return {
      txSignature: tx,
      eventPubkey: eventKeypair.publicKey
    };
  } catch (error) {
    console.error('Error initializing event:', error);
    throw error;
  }
}

/**
 * Claim a compressed token for an event
 * @param program Anchor program
 * @param wallet The wallet that will claim the token
 * @param eventPubkey The public key of the event
 * @returns Transaction signature
 */
export async function claimToken(
  program: Program,
  wallet: web3.Keypair | web3.PublicKey,
  eventPubkey: PublicKey
): Promise<string> {
  try {
    // Call the program to claim a token
    const tx = await program.methods.claimToken()
    .accounts({
      event: eventPubkey,
      claimer: wallet instanceof web3.Keypair ? wallet.publicKey : wallet,
      systemProgram: SystemProgram.programId,
    })
    .signers(wallet instanceof web3.Keypair ? [wallet] : [])
    .rpc();
    
    return tx;
  } catch (error) {
    console.error('Error claiming token:', error);
    throw error;
  }
}

/**
 * Deactivate an event
 * @param program Anchor program
 * @param wallet The creator's wallet
 * @param eventPubkey The public key of the event
 * @returns Transaction signature
 */
export async function deactivateEvent(
  program: Program,
  wallet: web3.Keypair | web3.PublicKey,
  eventPubkey: PublicKey
): Promise<string> {
  try {
    // Call the program to deactivate the event
    const tx = await program.methods.deactivateEvent()
    .accounts({
      event: eventPubkey,
      creator: wallet instanceof web3.Keypair ? wallet.publicKey : wallet,
    })
    .signers(wallet instanceof web3.Keypair ? [wallet] : [])
    .rpc();
    
    return tx;
  } catch (error) {
    console.error('Error deactivating event:', error);
    throw error;
  }
}

/**
 * Get event details
 * @param program Anchor program
 * @param eventPubkey The public key of the event
 * @returns Event details
 */
export async function getEventDetails(program: Program, eventPubkey: PublicKey) {
  try {
    // Fetch the event account data
    const eventAccount = await program.account.event.fetch(eventPubkey);
    
    return {
      creator: eventAccount.creator,
      eventName: eventAccount.eventName,
      eventDescription: eventAccount.eventDescription,
      tokenSupply: eventAccount.tokenSupply.toNumber(),
      tokensClaimed: eventAccount.tokensClaimed.toNumber(),
      isActive: eventAccount.isActive,
      createdAt: new Date(eventAccount.createdAt.toNumber() * 1000)
    };
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
}
