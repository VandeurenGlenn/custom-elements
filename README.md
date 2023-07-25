# custom-elements
> set of custom (vanilla) elements following Material Design 3 spec

<small>disclaimer: This is not as advanced as the [material-components](https://github.com/material-components/material-web) set</small>
<br>

[demo](https://vandeurenglenn.github.io/custom-elements/)

## Elements
-----------
<br>

## custom-theme

&nbsp;&nbsp;the start for all elements (for now).
&nbsp;&nbsp;custom-theme can be used to switch defined token values<br>
&nbsp;&nbsp;the idea is just to use material design tokens<br>
&nbsp;&nbsp;this should allow us to use DSP generated tokens<br>
&nbsp;&nbsp;<small>note: only JS tokens supported for now.</small>
&nbsp;&nbsp;
```html
<custom-theme language="css" path="./themes/default/theme.css"></custom-theme>
```

<br>

## Under the hood
-----------------
<br>

### lit-html
&nbsp;&nbsp;Uses lit-html to render,<br>
&nbsp;&nbsp;this brings allot of extra features checkout [lit-html](https://lit.dev/docs/libraries/standalone-templates/)
<br>

#### examples
<br>

##### bind to attribute

```js
html`<my-el value=${this.value}></my-el>`
```
<br>

##### bind to property
```js
html`<my-el .value=${this.value}></my-el>`
```
<br>

##### setting attributes
```js
html`<my-el ?disabled=${this.disabled}></my-el>`
```
<br>

##### declarative events
```js
html`<my-el @click=${() => console.log('click')}></my-el>`
```
