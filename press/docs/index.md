<script setup>
import { useData } from 'vitepress'
const  {site,page,theme,lang}  = useData()
import home from './components/home.vue'
</script>
<home />