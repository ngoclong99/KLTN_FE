<template>
  <div class="container-fluid sticky-top">
    <div class="row">
      <b-navbar toggleable="lg" class="nav-heading">
        <b-navbar-brand class="nav-heading__img">
          <img src="../../assets/logo1.png" alt="Logo" class="img-logo" />
          <span class="">Clinic</span>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
        <b-collapse id="nav-text-collapse" is-nav>
          <b-navbar-nav class="nav-heading__menu">
            <!-- Home -->
            <!-- :to="{ name: 'HomePage', query: {locate: 'vi', browse: 'chrome'}}" -->
            <b-nav-item class="nav-heading__menu-text">
              <router-link :to="{ name: 'HomePage', hash: '#home' }">
                <font-awesome-icon icon="home" class="icon-heading" />
                <span>Home</span>
              </router-link>
            </b-nav-item>
            <!-- About Us -->
            <b-nav-item class="nav-heading__menu-text">
              <router-link :to="{ name: 'HomePage', hash: '#about' }">
                <font-awesome-icon icon="users" class="icon-heading" />
                <span>About Us</span>
              </router-link>
            </b-nav-item>
            <!-- Contact Us -->
            <b-nav-item class="nav-heading__menu-text">
              <router-link :to="{ name: 'HomePage', hash: '#contact' }">
                <font-awesome-icon icon="phone-volume" class="icon-heading" />
                <span>Contact Us</span>
              </router-link>
            </b-nav-item>
            <b-nav-item class="nav-heading__menu-text">
              <router-link :to="{ name: 'HomePage', hash: '#blog' }">
                <font-awesome-icon icon="newspaper" class="icon-heading" />
                <span>Blogs</span>
              </router-link>
            </b-nav-item>
            <b-nav-item class="nav-heading__menu-text">
              <router-link :to="{ name: 'LoginPage' }">
                <font-awesome-icon icon="sign-in-alt" class="icon-heading" />
                <span>Login</span>
              </router-link>
            </b-nav-item>
            <b-nav-item class="nav-heading__menu-text">
              <router-link :to="{ name: 'RegisterPage' }">
                <font-awesome-icon icon="user-plus" class="icon-heading" />
                <span>Register</span>
              </router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  
};
</script>

<style scoped lang="scss">
@media (max-width: 430px) {
  .nav-heading__img span {
    display: none;
  }
}
.nav-heading {
  width: 100%;
  position: relative;
  background-color: var(--bg-color-main);
  .nav-heading__img {
    color: var(--color-white);
    float: left;
    margin-left: 20px;
    &:hover {
      color: var(--color-white);
    }
    img {
      max-height: 50px;
      min-height: 35px;
    }
    span {
      font-size: var(--font-text-content-m);
      font-style: italic;
      font-weight: bold;
    }
  }
  .nav-heading__menu {
    width: 100%;
    justify-content: flex-end;
    .nav-heading__menu-text {
      margin: 6px 15px;
      .icon-heading {
        margin-right: 5px;
        transition: 0.3s linear;
      }
      span {
        font-size: var(--font-text-content);
        font-weight: 700;
        transition: 0.3s linear;
      }
      &:hover {
        .icon-heading,
        span {
          color: var(--color-black-m);
        }
      }
    }
  }
}
.navbar {
  padding: 0 !important;
}
.navbar-brand {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

a {
  color: var(--color-white) !important;
}
a:hover {
  text-decoration: none !important;
}
</style>
