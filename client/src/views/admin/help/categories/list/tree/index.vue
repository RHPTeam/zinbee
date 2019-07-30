<template>
  <ol class="tree-list">
    <li v-for="(tree, index) in treeData" :key="index">
      <node :node="tree" />
    </li>
  </ol>
</template>

<script>
import Node from "./node/index";
export default {
  components: {
    Node
  },
  props: {
    treeData: Array
  }
};
</script>
