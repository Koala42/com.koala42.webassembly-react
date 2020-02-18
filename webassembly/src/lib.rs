mod utils;

use wasm_bindgen::prelude::*;
// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn factorialize(mut num: u32) -> u32 {
    let mut result = num;

    if num == 0 || num == 1 {
        1;
    } 
    while num >  1 {
      num = num - 1;
      result = result * num;
    }
    return result;
  }

#[wasm_bindgen]
pub fn factorialize_fib(n: u32) -> u32 {
 
    let mut a:u32 = 0;
    let mut temp:u32 = 0;
    let mut b:u32 = 1;
 
    let mut i:u32 = 1;
 
    while i < n {
        a = temp;
        temp = b;
        b = a + temp;
        factorialize(b);
        i = i + 1;
    }
    return b;
}

