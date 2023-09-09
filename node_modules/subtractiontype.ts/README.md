# subtractiontype.ts
Subtraction types for TypeScript: e.g. `Sub<'a' | 'b', 'a'>` and `Dissoc<{a: number, b: number}, 'a'>`.
## Installation
```
npm install --save-dev subtractiontype.ts
```
## Usage
```ts
// with modules
import {Sub, Dissoc} from 'subtractiontype.ts'

// without modules (yes, it says 'import', but it still doesn't count as a module and you 
// don't have to repeat the type parameters like you would with `type = `)
///<reference path="node_modules/subtractiontype.ts/index.d.ts"/>
import Sub = nla.Sub
import Dissoc = nla.Dissoc 

// string literal unions:
type A = Sub<'X' | 'Y' | 'Z', 'X' | 'Z'> // 'Y'
type B = Sub<'X' | 'Y', 'A'> // 'X' | 'Y'

// object types:
type C = Dissoc<{a: number, b: string}, 'a' | 'c'> // {b: string}

// if you want to subtract two object types, use `keyof`:
type D = Dissoc<{a: number, b: string}, keyof {a: number}> // {b: string}
```

## License
MIT