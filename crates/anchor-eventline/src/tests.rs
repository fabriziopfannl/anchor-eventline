use crate::event::discriminator_for;

#[test]
fn discriminator_is_deterministic() {
    let a = discriminator_for("SwapEvent", 1);
    let b = discriminator_for("SwapEvent", 1);
    assert_eq!(a, b);
}

#[test]
fn discriminator_changes_with_version() {
    let a = discriminator_for("SwapEvent", 1);
    let b = discriminator_for("SwapEvent", 2);
    assert_ne!(a, b);
}
