<template>
  <transition-group
    name="feed-list"
    tag="section"
    enter-active-class="animated slideInUp"
    @after-enter="$emit('enter-feed')"
    class="row"
  >
    <div
      v-for="feed in feeds"
      :key="feed.title"
      class="col-sm-6 col-lg-4"
    >
      <TheFeedListItem :feed="feed"/>
    </div>
  </transition-group>
</template>

<script>
import feedparser from 'feedparser-promised';
import TheFeedListItem from './TheFeedListItem.vue';

export default {
  name: 'TheFeedList',
  data() {
    return {
      feedUrls: [
        'https://fuji-nakahara.hatenablog.com/feed',
        'https://fuji-nakahara.github.io/genron-sf-2018/feed.xml',
        'https://fuji-nakahara.github.io/cyborg-classmate/feed.xml',
      ],
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
    TheFeedListItem,
  },
};
</script>

<style scoped>
.feed-list-move {
  transition: transform 1s;
}
</style>
