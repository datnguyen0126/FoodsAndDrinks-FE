<template>
  <div>
    <h2>Category</h2>
    <vue-tree-list
        @click="onClick"
        :model="data"
      v-bind:default-expanded="false"
    >
      <template v-slot:leafNameDisplay="slotProps">
        <span>
          {{ slotProps.model.name }} <span class="muted">#{{ slotProps.model.id }}</span>
        </span>
      </template>


    </vue-tree-list>
  </div>
</template>
 
<script>
  import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'
  export default {
    components: {
      VueTreeList
    },
    data() {
      return {
        newTree: {},
        data: new Tree([
          {
            name: 'Node 1',
            id: 1,
            addLeafNodeDisabled: true,
            addTreeNodeDisabled: true,
            editNodeDisabled: true,
            delNodeDisabled: true,
            children: [
              {
                name: 'Node 1-2',
                id: 2,
                isLeaf: true,
                editNodeDisabled: true,
                delNodeDisabled: true,
              }
            ]
          },
          {
            name: 'Node 2',
            id: 3,
          },
          {
            name: 'Node 3',
            id: 4,

          }
        ])
      }
    },
    methods: { 
      onClick(params) {
        console.log(params)
      },
 
      addNode() {
        var node = new TreeNode({ name: 'new node', isLeaf: false })
        if (!this.data.children) this.data.children = []
        this.data.addChildren(node)
      },
    }
  }
</script> 