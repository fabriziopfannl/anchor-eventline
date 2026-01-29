#[derive(Clone, Copy, Debug)]
pub struct EventField {
    pub name: &'static str,
    pub ty: &'static str,
}

#[derive(Clone, Copy, Debug)]
pub struct EventSchema {
    pub name: &'static str,
    pub version: u16,
    pub fields: &'static [EventField],
    pub discriminator: [u8; 8],
}

pub trait EventMeta {
    fn schema() -> EventSchema;
    fn discriminator() -> [u8; 8] {
        Self::schema().discriminator
    }
}
