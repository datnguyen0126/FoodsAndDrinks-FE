<template>
  <div
    style="
    margin-top: 50px;
    margin-bottom: 40px;
    padding: 30px;
    border: 1px solid #eee;
    border-radius: 5px;"
  >
    <h2>Categories</h2>
    <vue-tree-list @click="onClick" :model="data" v-bind:default-expanded="false">
      <template v-slot:leafNameDisplay="slotProps">
        <h4 class="panel-title">
          {{ slotProps.model.name }}
        </h4>
      </template>
    </vue-tree-list>
  </div>
</template>
 
<script>
import { VueTreeList, Tree ,TreeNode } from "vue-tree-list";
import { categoryService } from "../_services/category.services";
import { mapActions } from "vuex";

export default {
  components: {
    VueTreeList,
  },
  data() {
    return {
      newTree: {},
      data: {},
    };
  },

  created() {
    categoryService.getAll().then((res) => {
      this.data = new Tree(res);
    });
  },

  methods: {
    ...mapActions("foods", {
      getByCategory: "getByCategory",
      getAll: "getAll",
    }),
    onClick(params) {
      params.id===0 ? this.getAll(0) : this.getByCategory({ id: params.id });
    },
    addNode() {
      var node = new TreeNode({ name: "new node", isLeaf: false });
      if (!this.data.children) this.data.children = [];
      this.data.addChildren(node);
    },
  },
};
</script> 
