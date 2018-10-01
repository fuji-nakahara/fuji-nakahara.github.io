<template>
  <section class="row">
    <div v-for="feed in feeds" :key="feed.title" class="col-sm-6 col-lg-4">
      <Feed :feed="feed"></Feed>
    </div>
  </section>
</template>

<script>
import Parser from 'rss-parser'
import Feed from './Feed.vue'

let parser = new Parser()

export default {
  name: 'FeedList',
  props: {
    feedUrls: Array
  },
  data () {
    return {
      feeds: []
    }
  },
  created () {
    let vm = this
    this.feedUrls.forEach(async feedUrl => {
      let feed = await parser.parseURL(feedUrl)
      vm.feeds.push(feed)
      vm.feeds.sort((a, b) => {
        let aDate = new Date(a.items[0].isoDate)
        let bDate = new Date(b.items[0].isoDate)
        return bDate.getTime() - aDate.getTime()
      })
    })
  },
  components: {
    Feed
  }
}
</script>
