<script>
  import Router from "svelte-spa-router";

  import { link } from "svelte-spa-router";

  import routes from "./routes";

  import store from "store";

  // import Voyager from './components/voyager.svg'

  let admin = store.get("voyager_admin");

  function routeLoaded(event) {
    console.info("Caught event routeLoaded", event.detail);

    if (event.detail.userData && event.detail.userData.isAdmin) {
    }
  }

  function setAdmin(adminStatus) {
    store.set("voyager_admin", adminStatus);
    admin = adminStatus;
  }

</script>

<style lang="scss">
  @import './theme.scss';
  body {
    font-family: $fontBody;
  }
</style>

<body>

  <ul class="nav">

    <li>
      <a use:link href="/">Home</a>
    </li>

    {#if admin}
      <li>
        <a use:link href="/settings">Settings</a>
      </li>
    {/if}
    <li>
      <a use:link href="/intro">Intro</a>
    </li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li>
      <a use:link={'/concept/1'}>Concept 1</a>
    </li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li>
      <a use:link={'/concept/2'}>Concept 2</a>
    </li>
    <li>
      <a use:link href="/outro">Outro</a>
    </li>
  </ul>

  <Router {routes} on:routeLoaded={routeLoaded} />

  {#if admin}
    <p>Also, you're an admin.</p>
    <button on:click={() => setAdmin(false)}>Exit Admin Mode</button>
  {:else}
    <button on:click={() => setAdmin(true)}>Become an Admin</button>
  {/if}

</body>
