use sha2::{Digest, Sha256};

pub fn discriminator_for(name: &str, version: u16) -> [u8; 8] {
    let mut hasher = Sha256::new();
    hasher.update(name.as_bytes());
    hasher.update(version.to_le_bytes());
    let hash = hasher.finalize();
    let mut out = [0u8; 8];
    out.copy_from_slice(&hash[..8]);
    out
}
