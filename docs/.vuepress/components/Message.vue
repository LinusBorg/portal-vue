<template>
  <div>
    <MountingPortal mountTo="#message-target" append>
      <Portal v-if="show" slot-scope="{ to }" :to="to" name="msgSource">
        <div class="note">
          <div class="note-inner">
            <span class="title">Docs for {{$__VERSION__}}</span>
            <p>
              These docs are for the current beta version {{$__VERSION__}}.
              <br>If you are looking for the v1 docs, they can be found here:
            </p>
            <a class="link" href="/portal-vue/v1/index.html#/guide">Documentation for v1.*
              <OutboundLink/>
            </a>
            <button @click="close" class="button">Close Message</button>
          </div>
        </div>
      </Portal>
    </MountingPortal>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: true,
  }),
  methods: {
    close() {
      this.show = false
    },
  },
}
</script>

<style scoped lang="stylus">
.note {
  position: absolute;
  top: 100px;
  right: 80px;
  min-width: 350px;
  min-height: 250px;
  color: white;
  background-color: rgba(62, 175, 124, 0.9);
  border: 1px solid #DDD;
  border-radius: 5px;
  display: flex;
}

.note-inner {
  position: relative;
  padding: 20px;
}

.title {
  font-size: 22px;
  margin-bottom: 10px;
}

.link, .link:hover, .link:active, .link:visited {
  color: white;
}

.button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: 1px solid white;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 16px;
  color: rgb(62, 175, 124);
}
</style>