import { createContext } from 'react';
import { IContext } from '../types';

export const Context = createContext<Partial<IContext>>({});