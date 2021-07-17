import * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    // Add a missing property
    'object-fit'?: string;
  }
}
