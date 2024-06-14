<!-- 
  @author : andy
  @description : 热力图组件
 -->
 <template>
  <MeLayer v-bind="layer">
    <MeSource v-bind="source" />
  </MeLayer>
</template>
<script lang="ts" setup>
import { LayerOptions } from '../../../types/layer';
import MeLayer from '../../layer';
import MeSource from '../../source';
import { SourceOptions } from '../../../types/scene';
export type HeatmapLayerProps = {
  layer?: LayerOptions;
  source?: SourceOptions;
}
withDefaults(defineProps<HeatmapLayerProps>() , {
  source () {
    return {
      data : {
        type  : 'FeatureCollection',
        features : []
      }
    }
  }
});
</script>