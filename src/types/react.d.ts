import * as React from 'react';

declare module 'react' {
  export = React;
  export as namespace React;

  export interface FC<P = {}> {
    (props: P): React.ReactElement | null;
    displayName?: string;
  }

  export type ReactNode = 
    | React.ReactElement
    | string
    | number
    | boolean
    | null
    | undefined
    | React.ReactNodeArray;

  export interface ReactNodeArray extends Array<ReactNode> {}

  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  export type Key = string | number;

  export interface JSXElementConstructor<P> {
    (props: P): ReactElement<P, any> | null;
  }

  export interface FormEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }

  export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }

  export interface SyntheticEvent<T = Element, E = Event> {
    nativeEvent: E;
    currentTarget: T;
    target: EventTarget & T;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
    timeStamp: number;
    type: string;
  }

  export interface EventTarget {}

  export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    autoFocus?: boolean;
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    name?: string;
    type?: 'submit' | 'reset' | 'button';
    value?: string | ReadonlyArray<string> | number;
  }

  export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Standard HTML Attributes
    className?: string;
    hidden?: boolean;
    id?: string;
    style?: React.CSSProperties;
    title?: string;
  }

  export interface AriaAttributes {}

  export interface DOMAttributes<T> {
    children?: ReactNode;
    onClick?: (event: MouseEvent<T>) => void;
  }

  export interface MouseEvent<T = Element> extends SyntheticEvent<T> {}

  export interface CSSProperties {}
}
