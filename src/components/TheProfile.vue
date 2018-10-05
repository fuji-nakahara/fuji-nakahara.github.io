<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
  >
    <div class="row align-items-center justify-content-center">
      <div class="col-auto text-center mb-2 mb-md-0">
        <img
          alt="robot"
          src="/robot.png"
          width="150"
          height="150"
          class="img-fluid rounded-circle bg-white"
        >
      </div>
      <div class="col-md-auto text-center text-md-left">
        <h1>
          {{ name }}
        </h1>
        <address class="lead mb-0">
          <a :href="'mailto:' + email">{{ email }}</a>
          <ul class="list-inline">
            <li
              v-for="account in accounts"
              :key="account.name"
              class="account list-inline-item"
            >
              <a
                :href="account.url"
                target="_blank"
              >
                {{ account.name }}
              </a>
            </li>
          </ul>
        </address>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TheProfile',
  data() {
    return {
      name: process.env.VUE_APP_NAME,
      email: process.env.VUE_APP_EMAIL,
      accounts: [
        {
          name: 'Twitter',
          url: `https://twitter.com/${process.env.VUE_APP_TWITTER_USERNAME}`,
        },
        {
          name: 'GitHub',
          url: `https://github.com/${process.env.VUE_APP_GITHUB_USERNAME}`,
        },
        {
          name: 'Hatena',
          url: 'http://profile.hatena.ne.jp/fuji-nakahara/',
        },
        {
          name: 'カクヨム',
          url: 'https://kakuyomu.jp/users/fuji-nakahara',
        },
        {
          name: 'amakan',
          url: `https://amakan.net/@${process.env.VUE_APP_TWITTER_USERNAME}`,
        },
      ],
    };
  },
};
</script>

<style scoped>
li.account {
  margin-right: 0;
}
li.account:not(:last-child):after {
  content: "・";
}
</style>
