// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"9e85220734262039b57cd367b66d2e20":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "fdb486cc5a3f410992a8e09ba38a4eed";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('???? [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] ???? Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ??? Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          ???? ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"36bb694935dd05086a048288ecc1c354":[function(require,module,exports) {
// const { findIndex } = require("core-js/core/array");
const form = document.querySelector('.form');
const formInput = document.querySelector('.form__input');
const list = document.querySelector('.todo-lists'); // const navFooter = document.querySelector('.footer-nav');
// const active = document.querySelector('.active');

const completed = document.querySelector('.completed');
const toggleThemeBtn1 = document.querySelector('.toggle-theme-1');
const toggleThemeBtn2 = document.querySelector('.toggle-theme-2');
toggleThemeBtn1.addEventListener('click', function () {
  document.querySelector('body').classList.add('dark');
  document.querySelector('.box').classList.add('dark-box');
  toggleThemeBtn1.style.display = 'none';
  toggleThemeBtn2.style.display = 'block';
});
toggleThemeBtn2.addEventListener('click', function () {
  document.querySelector('body').classList.remove('dark');
  document.querySelector('.box').classList.remove('dark-box');
  toggleThemeBtn1.style.display = 'block';
  toggleThemeBtn2.style.display = 'none';
});
let todoList = [];

const renderTodo = function (todo) {
  const list = document.querySelector('.todo-lists');
  const item = document.querySelector(`[data-key='${todo.id}']`); // To persist the data

  localStorage.setItem('todoItemsRef', JSON.stringify(todoList)); // To remove deleted element from DOM

  if (todo.deleted) {
    item.remove(); // To activate the empty state in the css

    if (todoList.length === 0) {
      list.innerHTML = '';
    }

    return;
  }

  const isChecked = todo.checked ? 'done' : '';
  li = document.createElement('li');
  li.setAttribute('class', `todo-item ${isChecked}`);
  li.setAttribute('data-key', todo.id);
  const markup = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick"></label>
    <span>${todo.inputText}</span>
    <button class="delete">
    </button>
      `;
  li.insertAdjacentHTML('afterbegin', markup); // const complete = document.querySelectorAll('.done');
  // console.log(Array.from(complete));

  if (item) {
    list.replaceChild(li, item);
  } else {
    list.append(li);
  }
};

let complete = [];

const addTodo = function (inputText) {
  const todo = {
    inputText,
    checked: false,
    id: Date.now()
  };
  const counts = document.querySelector('.counts');
  todoList.push(todo);
  counts.innerHTML = `
      <p class="counts">${todoList.length} items left</p>

      `;
  renderTodo(todo);
};

const deleteTodo = function (key) {
  const i = todoList.findIndex(item => item.id === +key);
  const todo = {
    deleted: true,
    ...todoList[i]
  };
  console.log(todo); // this will filter just the elements that are not deleted and leave it in the todolist array.

  todoList = todoList.filter(item => item.id !== +key); // console.log(todoList);

  const counts = document.querySelector('.counts');
  counts.innerHTML = `
      <p class="counts">${todoList.length} items left</p>
      `;
  renderTodo(todo);
};

const toggle = function (key) {
  const i = todoList.findIndex(list => list.id === +key);
  todoList[i].checked = !todoList[i].checked; // console.log(todoList[i]);

  renderTodo(todoList[i]);
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  formInputValue = formInput.value;

  if (formInputValue !== '') {
    addTodo(formInputValue);
  }

  formInput.value = '';
  formInput.focus();
});

const completedTodo = function (key) {
  todoList = todoList.filter(todo => {
    if (!todo.checked) return;
    complete.push(todo);
  });
  console.log(complete); // renderTodo(complete[0]
};

completed.addEventListener('click', function (e) {
  const listKey = todoList.map(todo => todo.id);
  completedTodo(listKey);
});
list.addEventListener('click', function (e) {
  // to mark completed task
  if (e.target.classList.contains('tick')) {
    const listKey = e.target.parentElement.dataset.key; // console.log(listKey);

    toggle(listKey);
  } // Delete task


  if (e.target.classList.contains('delete')) {
    const listKey = e.target.parentElement.dataset.key;
    deleteTodo(listKey);
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItemsRef'); // console.log(ref);

  if (ref) {
    todoList = JSON.parse(ref);
    todoList.forEach(t => {
      renderTodo(t);
    });
    const counts = document.querySelector('.counts');
    counts.innerHTML = `
    <p class="counts">${todoList.length} items left</p>
    `;
  }
}); // const completedTodo = function (key) {
//   //   const index = todoList.findIndex(item => item.id === +key);
//   todoList.forEach((i) => {
//     const todo = {
//       completed: [],
//       ...todoList[i],
//     };
//     console.log(todo);
//   });
// };
// navFooter.addEventListener('click', function (e) {
//   if (e.target.classList.contains('completed')) {
//     const listKey = e.target.parentElement.dataset.key;
//     // console.log(e.target);
//     // console.log(listKey);
//     // completedTodo(listKey);
//   }
// });
},{}]},{},["9e85220734262039b57cd367b66d2e20","36bb694935dd05086a048288ecc1c354"], null)

//# sourceMappingURL=controller.fdb486cc.js.map
