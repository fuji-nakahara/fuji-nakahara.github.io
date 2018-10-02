<template>
  <b-card no-body class="mb-3">
    <b-card-body>
      <h4 class="card-title mb-0">
        <b-link :href="feed.link" class="text-dark">{{ feed.title }}</b-link>
        <b-badge v-show="isNew(feed.items[0].isoDate)" variant="primary" class="ml-2">更新</b-badge>
      </h4>
    </b-card-body>
    <b-list-group flush>
      <b-list-group-item v-for="item in feed.items"
                         :key="item.id"
                         :href="item.link"
                         class="d-flex align-items-start justify-content-between">
        {{ item.title }}
        <small :class="{ 'text-primary': isNew(item.isoDate) }">{{ fromNow(item.isoDate) }}</small>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import moment from 'moment';

moment.locale('ja');

export default {
  name: 'Feed',
  props: {
    feed: Object,
  },
  methods: {
    isNew(date) {
      return moment(date).isAfter(moment().add(-1, 'months'));
    },
    fromNow(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
