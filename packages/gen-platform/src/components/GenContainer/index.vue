<template>
  <div :class="$style['gen-page-container']">
    <vue-draggable
      v-model="draggableComponentList"
      v-bind="draggableOptions"
      item-key="id"
      @change="onDraggableChange"
      @start="onDraggableStart"
    >
      <template #item="{element}">
        <gen-edit-component-warp
          :schema="element">
          <gen-component :schema="element">
            <template
              v-for="innerItem in element.child"
              :key="innerItem.id"
            >
              <gen-component :schema="innerItem"/>
            </template>
          </gen-component>
        </gen-edit-component-warp>
      </template>
    </vue-draggable>
  </div>
</template>

<script lang="ts">
import VueDraggable, { DraggedContext } from 'vuedraggable'
import GenComponent from '../GenComponent/index.vue'
import GenEditComponentWarp from '../GenEditComponentWarp/index.vue'
import { defineComponent } from 'vue'

export type VueDraggableOptions = {
  animation?: number,
  group?: string,
  disabled?: boolean,
  ghostClass?: string,
  filter?: string,
  draggable?: string,
  tag?: string,
  swapThreshold?: number,
  forceFallback?: boolean,
  fallbackTolerance?: number
}

export default defineComponent({
  components: {
    VueDraggable,
    GenComponent,
    GenEditComponentWarp
  },
  data (): Record<string, unknown> {
    return {
      list: []
    }
  },
  props: {
    componentList: {
      type: Array,
      default: () => []
    },
    isFullScreen: {
      type: Boolean,
      default: true
    },
    isModifiable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    draggableOptions (): VueDraggableOptions {
      return {
        animation: 300,
        group: 'listComponentsGroup',
        disabled: this.isModifiable,
        ghostClass: 'ghost',
        filter: 'disabled',
        draggable: '.draggableItem',
        tag: 'div',
        swapThreshold: 0.3
        // forceFallback: true
        // fallbackTolerance: 0
      }
    },
    draggableComponentList: {
      get (): any[] {
        return this.componentList
      },
      set (val: any) {
        console.log(val)
      }
    }
  },
  methods: {
    onDraggableChange (e: DraggedContext<typeof GenEditComponentWarp>) {
      console.log(e)
    },
    onDraggableStart (e: DraggedContext<typeof GenEditComponentWarp>) {
      console.log(e)
    }
  }
})
</script>

<style lang="scss" module scoped>
.gen-page-container {

}
</style>
