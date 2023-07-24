import pubsub from "scoped-pubsub"
import { PropertyDeclarations, ReactiveController, ReactiveElement } from 'lit';
import { property } from "lit/decorators.js";


globalThis.pubsub = pubsub
export const publish = (name, initialValue) => {
  return (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      set: (value) => {
        globalThis.pubsub.publish(name, value)
        target[`_${propertyKey}`] = value
      },
      get() {
        return target[`_${propertyKey}`]
      }
    })
  }
}

export const subscribe = (name, options) => {
   return function(target, propertyKey) {
    globalThis.pubsub.subscribe(name, (value) => {
      target[`${propertyKey}`] = options.onchange ? options.onchange(value) : value
      console.log('changed');
    })

    console.log(target);
  
    // return target.constructor.createProperty(propertyKey, options)
  }
}