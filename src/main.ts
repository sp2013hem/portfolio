import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

declare global {
  interface Object {
    forEach: (arg1?: any, arg2?: any) => any;
  }
  interface String {
    capitalize: () => any;
  }
}

if (!Object.prototype.forEach) {
  Object.defineProperty(Object.prototype, 'forEach', {
    value(callback: (a: any, b: any, c: any) => any, thisArg: any) {
      if (this == null) {
        throw new TypeError('Not an object');
      }
      thisArg = thisArg || window;
      for (const key in this) {
        if (this.hasOwnProperty(key)) {
          callback.call(thisArg, this[key], key, this);
        }
      }
    },
  });
}
Object.defineProperty(String.prototype, 'capitalize', {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

platformBrowserDynamic().bootstrapModule(AppModule).catch(console.error);
