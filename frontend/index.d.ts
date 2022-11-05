/**
 * A very janky hack so TypeScript is okay with async React components.
 * Inject `finally` so there is overlap with `Promise`, mark all fields as optional in case it is a promise.
 */
 declare namespace React {
    interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
        type?: T;
        props?: P;
        key?: Key | null;
        finally: VoidFunction;
    }
}
