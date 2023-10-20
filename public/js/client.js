const app = (() => {
  const coosTable = document.querySelector('.user-coos');

  async function deleteCoo(id) {
    await fetch('/coo/' + id, {
      method: 'DELETE'
    });

    window.location.reload();
  }

  function confirmDeletion(id) {
    const del_confirm = confirm('Click OK if you are sure.');

    if (del_confirm) deleteCoo(id);
  }

  function init() {
    coosTable && coosTable.addEventListener('click', (e) => {

      if (e.target.classList.contains('delete-btn'))
        confirmDeletion(e.target.dataset.id);
    })
  }

  return { init }
})();

app.init();
