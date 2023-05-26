import { WagaHandlerCallback } from "../types";

type Iterable<T> = Set<T> | T[];

export function isIterable<T>(obj: any): obj is Iterable<T> {
  if(!obj) return false;
  return typeof obj[Symbol.iterator] === 'function';
}

export function isIterableWith<T>(obj: Iterable<T>, fn: (item: any) => item is T) {
  if(!isIterable(obj)) throw new TypeError(`"obj" must be iterable`);
  for(let item of obj) {
    if(!fn(item)) return false;
  }
  return true;
}

export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

export function isWagaHandlerCallback(obj: any): obj is WagaHandlerCallback {
  if(!isFunction(obj)) return false;
  if(obj.length > 3) return false;
  return true;
}