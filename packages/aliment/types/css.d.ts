import * as CSS from 'csstype';

declare module 'csstype' {
  interface CSSProperties extends CSS.Properties<string | number> {
    // Add a missing property
    'object-fit'?: string;
    'pointer-events'?: string;
  }
}
