<script>
  import { weeks } from "../stores";

  let week = {
    weekId: null,
    problem: false,
    title: "",
    description: "",
  };

  let usedWeeks = [];
  weeks.subscribe((weeks) => (usedWeeks = weeks));
  console.log(usedWeeks);
  

  const write = () => {
  const newWeek = {
    weekId: week.weekId,
    problem: week.problem,
    title: week.title,
    description: week.description,
  };

  if (
    newWeek.weekId > 0 &&
    newWeek.weekId <= 32 &&
    !usedWeeks.some((w) => w.weekId === newWeek.weekId)
  ) {
    // Reset the usedWeeks array before adding new entries
    usedWeeks = [];
    
    usedWeeks.push(newWeek);
    weeks.update((existingWeeks) => [...existingWeeks, newWeek]);
    
    week = {
      weekId: null,
      problem: false,
      title: "",
      description: "",
    };
  } else {
    console.log(
      "The week could not be added. Use a value between 1 and 32 for the week ID or make sure the week ID doesn't exist yet."
    );
    alert(
      "The week could not be added. Use a value between 1 and 32 for the week ID or make sure the week ID doesn't exist yet."
    );
  }
};


  const testReset = () => {
    weeks.set([]);
  };
</script>

<form class="my-5">
  <div class="row p-2">
    <div class="col">
      <div class="form-group row">
        <label for="weekId" class="col-4 col-form-label">Week ID</label>
        <div class="col">
          <input
            id="weekId"
            class="form-control bg-dark bg-gradient text-light"
            type="number"
            min="1"
            max="32"
            placeholder="0"
            bind:value={week.weekId}
          />
        </div>
      </div>

      <div class="form-group row my-3">
        <div class="col-4 col-form-label">Problem</div>
        <div class="col">
          <div class="form-switch">
            <input
              type="checkbox"
              id="problem"
              class="form-check-input bg-dark"
              role="switch"
              bind:checked={week.problem}
            />
          </div>
        </div>
      </div>

      <div class="form-group row">
        <label for="title" class="col-4 col-form-label">Titel</label>
        <div class="col">
          <input
            id="title"
            class="form-control bg-dark bg-gradient text-light"
            type="text"
            placeholder="Hier eingeben ..."
            bind:value={week.title}
          />
        </div>
      </div>
    </div>

    <div class="col">
      <label for="description" class="form-label">Beschreibung</label>
      <br />
      <textarea
        id="description"
        class="form-control bg-dark bg-gradient text-light"
        placeholder="Hier eingeben ..."
        rows="4"
        bind:value={week.description}
      />
    </div>

    <div class="d-grid gap-1 col-2">
      <button type="button" class="btn btn-primary btn-lg" on:click={write}
        ><h1>+</h1></button
      >
    </div>

    <div class="col" />
  </div>
</form>

<style>
  ::placeholder {
    color: rgb(90, 90, 90);
  }
</style>
