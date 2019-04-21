<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#" id="navbar"><i class="far fa-caret-square-left fa-2x"></i> Kanban <h3></h3></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Not yet implemented" disabled></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" dsiabled>Search</b-button>
        </b-nav-form>


          <!-- Using 'button-content' slot -->
        <!-- <b-nav-item-dropdown right>
          <template slot="button-content"><em>User</em></template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
    name:"Navbar"
}
</script>

<style scoped>
#navbar {
  display:flex;
  align-items: center;
}

.fa-caret-square-left {
  margin-right: 10px;
}
</style>


