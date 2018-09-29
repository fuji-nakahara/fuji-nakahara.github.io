var Entry = {
  props: ['entry'],
  computed: {
    title: function () {
      return this.entry.find('title').text()
    },
    link: function () {
      return this.entry.find('link').attr('href')
    },
    published: function () {
      return moment(this.entry.find('published').text())
    },
    isNew: function () {
      return this.published.isAfter(moment().add(-30, 'days'))
    }
  },
  template: `
    <a :href="link" class="list-group-item list-group-item-action">
      <div class="d-flex justify-content-between align-items-center">
        {{ title }}
        <small :class="isNew ? 'badge badge-primary' : ''">{{ published.fromNow() }}</small>
      </div>
    </a>
  `
}

var Feed = {
  props: ['feed'],
  computed: {
    title: function () {
      return this.feed.find('feed').children('title').text()
    },
    subtitle: function () {
      return this.feed.find('feed').children('subtitle').text()
    },
    link: function () {
      return this.feed.find('feed').children('link').last().attr('href')
    },
    entries: function () {
      return this.feed.find('entry').toArray().map(function (e) { return $(e) })
    }
  },
  components: {
    'entry': Entry
  },
  template: `
    <div class="col-sm-6 col-lg-4 mb-3">
      <section class="card">
        <div class="card-body">
          <h4 class="card-title">
            <a :href="link" class="text-dark">{{ title }}</a>
          </h4>
          <p class="card-text text-muted">{{ subtitle }}</p>
        </div>
        <div class="list-group list-group-flush">
          <entry v-for="entry in entries"
                 :key="entry.find('id').text()"
                 :entry="entry"
                 >
          </entry>
        </div>
      </section>
    </div>
  `
}

var FeedList = {
  props: ['feedUrls'],
  data: function () {
    return {
      feeds: []
    }
  },
  created: function () {
    var vm = this
    this.feedUrls.split(',').forEach(function (feedUrl) {
      $.get(feedUrl, function (data) {
        vm.feeds.push($(data))
        vm.feeds.sort(function (a, b) {
          aDate = new Date(a.find('feed').children('updated').text())
          bDate = new Date(b.find('feed').children('updated').text())
          return bDate.getTime() - aDate.getTime()
        })
      })
    })
  },
  components: {
    'feed': Feed
  },
  template: `
    <div class="row">
      <feed v-for="feed in feeds"
            :key="feed.find('feed').children('id').text()"
            :feed="feed"
            >
      </feed>
    </div>
  `
}

var vm = new Vue({
  el: '#feeds',
  components: {
    'feed-list': FeedList
  }
})
