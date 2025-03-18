<script>
    import { weeks } from "../stores";
    import Card from "./Card.svelte";
    
</script>

  <div class="d-inline-flex flex-wrap gap-4 align-conent-around justify-conent-evenly">
    {#each $weeks as week}
        <Card {week} />
    {/each}
  </div>
  