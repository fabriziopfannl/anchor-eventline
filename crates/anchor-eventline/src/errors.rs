use thiserror::Error;

#[derive(Error, Debug)]
pub enum EventlineError {
    #[error("invalid discriminator")]
    InvalidDiscriminator,
    #[error("invalid schema")]
    InvalidSchema,
    #[error("unsupported version")]
    UnsupportedVersion,
}
