/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { LitElement, html } from '@polymer/lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import {Router} from '@vaadin/router';
import './my-view2';
import './my-view3';
import { resolveCss } from '../node_modules/@polymer/polymer/lib/utils/resolve-url';
// import './my-view404';
// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
// setRootPath(MyAppGlobals.rootPath);

const onNavigate = (context)=>{
  return new Promise(async (resolve,reject)=>{
    try{
      switch (context.pathname){
        case '/view1':
        console.log("Importing file");
          await import('./my-view1.js');
      }
      resolve();
    }catch(err){
      console.log(err);
      reject(err);
    }
    console.log();
    context.next();
  })
}

class MyApp extends LitElement {
  _firstRendered(){
		const router = new Router(this.shadowRoot.querySelector('#outlet'));

		router.setRoutes([
			// {path: '/', component: 'my-view1'},
			{path: '/view1', component: 'my-view1', bundle: 'src/my-view1.js'},
			{path: '/view2', component: 'my-view2'},
			{path: '/view3', component: 'my-view3'}
    ]);
    
}

  _render() {
    return html`
      <a href="/view1">View 1</a>
      <a href="/view2">View 2</a>
      <a href="/view3">View 3</a>
      <a href="/asdasd">Error</a>
      <div id="outlet"></div>
    `;
  }
  constructor(){
    super();
    
  }

  static get properties() {
    return {
      router: Router
    };
  }

  
  
}

window.customElements.define('my-app', MyApp);
