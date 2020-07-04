
import Settings from './components/Settings.svelte'
import Concept from './components/Concept.svelte'
import Intro from './components/Intro.svelte'
import Outro from './components/Outro.svelte'
import NotFound from './components/NotFound.svelte'
import Home from './components/Home.svelte'

import {wrap} from 'svelte-spa-router'

 const routes = {
  // Exact path
  "/": Home,

  "/concept/:conceptId/:promptId?": Concept,

  "/intro": Intro,
  "/outro": Outro,

  "/settings": Settings,

  // Catch-all
  "*": NotFound,
};

export default routes