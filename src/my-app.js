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
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import  * as page from 'page';
// import './my-view404';
// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);


class MyApp extends LitElement {

  _render({_view}) {
    return html`
    <style>
      [view] > * {
        display: none;
        padding: 0 16px;
      }
      [view=view1] my-view1,
      [view=view2] my-view2,
      [view=view3] my-view3,
      [view=view404] my-view404 {
        display: block;
      }
    </style>
      <a href="/">Home</a>
      <a href="/view1">View 1</a>
      <a href="/view2">View 2</a>
      <a href="/view3">View 3</a>
      <a href="/asdasd">Error</a>
      <div view$="${_view}">
        <my-view1></my-view1>
        <my-view2></my-view2>
        <my-view3></my-view3>
        <my-view404></my-view404>
      </div>
    `;
  }
  constructor(){
    super();
    console.log(MyAppGlobals.rootPath);
  }

  static get properties() {
    return {
      _view: String
    };
  }

  ready(){
    super.ready();
    
    page('/', home);
    page('/view1', myView1);
    page('/view2', myView2);
    page('/view3', myView3);
    page.base('404', myView404)
  }

  home(){
    this._view = undefined; 
  }

  myView1(){
    import('./my-view1').then(()=>{
      this._view = 'view1';
    })
  }
  myView2(){
     import('./my-view2').then(()=>{
      this._view = 'view2';
    });
  }
  myView3(){
    import('./my-view3').then(()=>{
      this._view = 'view3';
    });
  }
  myView404(){
    import('./my-view404').then(()=>{
      this._view = 'view404';
    });
  }
  
}

window.customElements.define('my-app', MyApp);
