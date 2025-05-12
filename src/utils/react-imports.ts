import React from 'react';

export const {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  createContext,
  useContext
} = React;

export type FormEvent<T = Element> = React.FormEvent<T>;
export type ChangeEvent<T = Element> = React.ChangeEvent<T>;
export type MouseEvent<T = Element> = React.MouseEvent<T>;

export default React;
