<template>
  <div class="demo">
    <nav>
      <nuxt-link to="/"><h1>Vueleton</h1></nuxt-link>
      <section class="demo-nav-items">
        <nuxt-link to="/code/">Code</nuxt-link>
        <nuxt-link to="/dropdown/">Dropdown</nuxt-link>
        <nuxt-link to="/modal/">Modal</nuxt-link>
        <nuxt-link to="/tooltip/">Tooltip</nuxt-link>
      </section>
      <footer>
        <p>Designed with &hearts; by <a href="https://gerald.top">Gerald</a></p>
      </footer>
    </nav>
    <div><slot /></div>
  </div>
</template>
