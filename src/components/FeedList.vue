<template>
  <transition-group enter-active-class="animated slideInUp"
                    tag="section"
                    class="row">
    <div v-for="feed in feeds" :key="feed.title" class="col-sm-6 col-lg-4">
      <Feed :feed="feed"></Feed>
    </div>
  </transition-group>
</template>

<script>
import Parser from 'rss-parser';
import Feed from './Feed.vue';

const parser = new Parser();

export default {
  name: 'FeedList',
  props: {
    feedUrls: Array,
  },
  data() {
    return {
      feeds: [],
    };
  },
  created() {
    this.feedUrls.forEach(async (feedUrl) => {
      const feed = await parser.parseURL(feedUrl);
      this.feeds.push(feed);
      this.feeds.sort((a, b) => {
        const aDate = new Date(a.items[0].isoDate);
        const bDate = new Date(b.items[0].isoDate);
        return bDate.getTime() - aDate.getTime();
      });
    });
  },
  components: {
    Feed,
  },
};
</script>
