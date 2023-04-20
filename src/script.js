$(document).ready(function() {
  $('#successModal').modal('show');
  $('#searchInput').keyup(function() {
    var searchText = $(this).val().toLowerCase();

    // Filtre la table en fonction du texte de recherche
    $('table tbody tr').filter(function() {
      return $(this).text().toLowerCase().indexOf(searchText) === -1;
    }).hide();

    // Affiche les lignes correspondantes au texte de recherche
    $('table tbody tr').filter(function() {
      return $(this).text().toLowerCase().indexOf(searchText) !== -1;
    }).show();
  });
});
