use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput, Lit, Meta};

#[proc_macro_derive(Eventline, attributes(eventline))]
pub fn derive_eventline(input: TokenStream) -> TokenStream {
    let input = parse_macro_input!(input as DeriveInput);
    let name_ident = input.ident.clone();
    let mut name = name_ident.to_string();
    let mut version: u16 = 1;

    for attr in input.attrs.iter().filter(|a| a.path().is_ident("eventline")) {
        if let Meta::List(list) = &attr.meta {
            let _ = list.parse_nested_meta(|meta| {
                if meta.path.is_ident("name") {
                    let value = meta.value()?;
                    let lit: Lit = value.parse()?;
                    if let Lit::Str(s) = lit {
                        name = s.value();
                    }
                }
                if meta.path.is_ident("version") {
                    let value = meta.value()?;
                    let lit: Lit = value.parse()?;
                    if let Lit::Int(i) = lit {
                        version = i.base10_parse::<u16>().unwrap_or(1);
                    }
                }
                Ok(())
            });
        }
    }

    let gen = quote! {
        impl anchor_eventline::schema::EventMeta for #name_ident {
            fn schema() -> anchor_eventline::schema::EventSchema {
                let disc = anchor_eventline::event::discriminator_for(#name, #version);
                anchor_eventline::schema::EventSchema {
                    name: #name,
                    version: #version,
                    fields: &[],
                    discriminator: disc,
                }
            }
        }
    };
    gen.into()
}
