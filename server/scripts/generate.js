// KDFs
/*
import { pbkdf2Sync } from "ethereum-cryptography/pbkdf2.js";
import { scryptSync } from "ethereum-cryptography/scrypt.js";

// Random
import { getRandomBytesSync } from "ethereum-cryptography/random.js";

// AES encryption
import { encrypt } from "ethereum-cryptography/aes.js";

// secp256k1 elliptic curve operations
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";

// BIP32 HD Keygen, BIP39 Mnemonic Phrases
import { HDKey } from "ethereum-cryptography/hdkey.js";
import { generateMnemonic } from "ethereum-cryptography/bip39/index.js";
import { wordlist } from "ethereum-cryptography/bip39/wordlists/english.js";

// utilities
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
*/

const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { hexToBytes, toHex, utf8ToBytes } = require("ethereum-cryptography/utils.js");

const privateKey = secp256k1.utils.randomPrivateKey()
const publicKey = secp256k1.getPublicKey(privateKey)

console.log('privateKey: ', toHex(privateKey))
console.log('publicKey: ', toHex(publicKey))

const privateKey1 = "b7a5ef798f71df207b0e6091fe63ca4add695fcc53c2827b64c41c695a861f2a"
const publicKey1 = "0399bd4d18bf0c902dc1e475bff42ecfdb725fa3e3f4fdbdbba0911ab4bb3d3369"

const privateKey2 = "91a9ac8efac7f0ac52fdd85654f171620a1c2cbde84dc2a0828c45ed59e63937"
const publicKey2 = "0367096677267a0f7cac16056a0ade1e57d759ee28230e07a314f7c9115efd7e15"

const privateKey3 = "b0c48ec6306d11fbf1755f1fe378379c1f0b37456dc999d7b581b2d68c2ddb8d"
const publicKey3 = "02150d6969efb134d0d47891f261246418df69405bb1ab6a9242cf54f2b0f3ad70"

const messageHash = "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";

const signature = secp256k1.sign(messageHash, privateKey3);

console.log('signature: ', signature);

const isSigned = secp256k1.verify(signature, messageHash, publicKey3);
console.log('isSigned: ', isSigned)
