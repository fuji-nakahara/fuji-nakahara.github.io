<template>
  <transition-group
    name="feed-list"
    tag="section"
    enter-active-class="animated slideInUp"
    class="row"
    @after-enter="$emit('enter-feed')"
  >
    <div
      v-for="feed in feeds"
      :key="feed.title"
      class="col-sm-6 col-lg-4 col-xl-3"
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
  components: {
    TheFeedListItem,
  },
  data() {
    return {
      feedUrls: [
        'https://fuji-nakahara.hatenablog.com/feed',
        'https://fuji-nakahara.page/genron-sf-2018/feed.xml',
        'https://fuji-nakahara.page/cyborg-classmate/feed.xml',
        'https://fuji-nakahara.page/transparent-blood-relation/feed.xml',
        'https://fuji-nakahara.page/ai-a-convenience-store-clerk/feed.xml',
      ],
      feeds: [],
    };
  },
  created() {
    this.feedUrls.forEach(async (feedUrl) => {
      const items = await feedparser.parse(feedUrl);

      const feed = items[0].meta;
      feed.items = items.slice(0, 10);

      this.feeds.push(feed);
      this.feeds.sort((a, b) => b.items[0].pubDate.getTime() - a.items[0].pubDate.getTime());
    });
  },
};
</script>

<style scoped>
.feed-list-move {
  transition: transform 1s;
}
</style>
