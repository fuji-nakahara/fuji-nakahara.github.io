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
import feedparser from 'feedparser-promised';
import Feed from './Feed.vue';

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
      const items = await feedparser.parse(feedUrl);

      const feed = items[0].meta;
      feed.items = items;

      this.feeds.push(feed);
      this.feeds.sort((a, b) => b.items[0].pubDate.getTime() - a.items[0].pubDate.getTime());
    });
  },
  components: {
    Feed,
  },
};
</script>
