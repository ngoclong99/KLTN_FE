<template>
  <div id="app">
    <router-view name="TheHeader" />
    <router-view></router-view>
    <router-view name="TheFooter" />
  </div>
</template>

<style>
:root {
  --height-header: 60px;
  --color-white: #fff;
  --color-black: #000;
  --color-black-m: rgb(71, 69, 69);
  --font-text-content: 16px;
  --font-text-content-m: 20px;
  --font-text-title: 36px;
  --font-text-big: 48px;
  --bg-color-main: rgb(74, 97, 161);
  --bg-color-title: rgb(58 101 216);
  --bg-color-main-m: rgb(238, 238, 238);
  --bg-color-main-hover: rgba(85, 109, 175, 0.5);
  --bg-color-main-hover-bold: rgb(0 39 146 / 50%);
  --bg-color-blue-m: rgb(235, 240, 248);
  --bg-color-blue-b: rgb(235, 240, 248);
  --bg-color-main-m: rgb(238, 238, 238);
}
* {
  box-sizing: border-box;
  font-size: var(--font-text-content);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.height-100 {
  height: 100%;
}
.height-50 {
  height: 50%;
}
.width-100 {
  widows: 100%;
}
.width-50 {
  widows: 50%;
}
.padding-y {
  padding-top: 15px;
  padding-bottom: 15px;
}
.b-card-text:hover {
  text-decoration: none !important;
}
/* a {
  color: var(--color-white) !important;
}
a:hover {
  text-decoration: none !important;
} */
</style>
