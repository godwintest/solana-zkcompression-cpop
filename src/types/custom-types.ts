import { PublicKey, Keypair } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';

// Define interfaces that match the structure of the classes
export interface IPublicKey extends PublicKey {}
export interface IKeypair extends Keypair {}
export interface IBN extends BN {}
