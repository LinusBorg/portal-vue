<template>
  <div>
    <div class="">
      <ul class="controls">
        <li class="controls--item">
          <input type="text" @input="event => this.c1 = event.target.value" />
          <input type="text" @input="event => this.c2 = event.target.value" />
        </li>
      </ul>
    </div>
    <div class="wrapper">

      <container type="source">
        <portal to="props-to-target" :class="c1">
          some content from 1
        </portal>

        <portal to="props-to-target" class='static-class-2' :class="c2">
          some content from 2
        </portal>
      </container>

      <container type="destination">
        <portal-target name="props-to-target" multiple />
      </container>

    </div>
  </div>
</template>

<script>
export default {
  name: "PropsToTarget",
  data() {
    return { c1: "", c2: "" };
  }
};
</script>

<style>
.red {
  background: red;
}
.green {
  background: green;
}
.blue {
  background: blue;
}

.red.green {
  background: yellow;
}

.red.blue {
  background: purple;
}

.green.blue {
  background: cyan;
}
</style>
