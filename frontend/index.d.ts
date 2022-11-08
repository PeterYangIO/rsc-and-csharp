import * as React from "react";

/**
 * A very janky hack so TypeScript is okay with async React components.
 *   - Inject `finally` so there is overlap with `Promise`
 *   - Mark all fields as optional so it doesn't complain about missing fields
 */
declare global {
    module React {
        interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
            type?: T;
            props?: P;
            key?: Key | null;
            finally?: VoidFunction;
        }
    }
}
