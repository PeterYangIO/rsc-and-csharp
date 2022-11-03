/**
 * A very janky hack so TypeScript is okay with async React components.
 */
 declare namespace React {
    interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
        type?: T;
        props?: P;
        key?: Key | null;
        finally: VoidFunction;
    }
}
