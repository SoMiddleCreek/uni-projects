<script>
  export let week;
  let cardClass = '';

  if(week.problem) {
    cardClass = 'bg-myRed';
  } else {
    cardClass = 'bg-myGreen';
  }
  
</script>

<div class="card {cardClass} rounded-4">
  <div class="card-body container text-wrap" style="width: 15rem;">
    <h3 class="card-title"><strong>{("0" + week.weekId).slice(-2)}</strong></h3>
    <h5 class="card-subtitle mb-4">{week.title}</h5>
    <p class="card-text">{week.description}</p>
  </div>
</div>

<style>
  .bg-myGreen {
    background-color: rgba(103,255,182,255);
  }
  .bg-myRed {
    background-color: rgba(255,192,134,255);
  }
</style>