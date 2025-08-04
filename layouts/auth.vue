<template>
  <v-responsive class="scrooll">
    <v-app class="bloc">
      <v-row justify="center" class="pa-0" align="center">
        <main>
          <div class="full">
            <img src="@/assets/images/logo.png" class="imagePage" alt="" />
          </div>
          <slot />
        </main>
      </v-row>
    </v-app>
  </v-responsive>
</template>

<style scoped>
:root {
  --primary-color: #1e3a8a;
  --secondary-color: #1e3a8a;
  --border-color: #0000001c;
}

.bloc {
  background: #f0f2f5;
  padding: none !important;
}

.imagePage {
  width: 3rem;
}

main {
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Ombre plus visible */
  padding: 1rem 2rem 1.5rem; /* Espace interne */
  overflow: hidden;
}

.full {
  width: 100%;
  display: flex;
  justify-content: center;
}


/* Mobile optimizations */
@media (max-width: 650px) {
  main {
    margin: 0 1.2em;
    padding: 1rem 1.2rem 1.5rem; /* Espace interne */
  }
}
</style>
