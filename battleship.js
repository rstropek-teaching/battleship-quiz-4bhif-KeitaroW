$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {
    // Here you have to add your code for building a random battleground.

    // Tip: The next line of code demonstrates how you can select a table cell
    // using coordinates, remove CSS classes and add CSS classes. 
    //$('td[data-r="1"][data-c="1"]').removeClass('water').addClass('ship');
    //$('td[data-r="2"][data-c="1"]').removeClass('water').addClass('ship');
    //$('td[data-r="3"][data-c="1"]').removeClass('water').addClass('ship');
    
    //clearing battleground
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        $('td[data-r="' + row + '"][data-c="' + column + '"]').removeClass('ship').addClass('water');
      }
    }
    
    var battleships = [2, 3, 3, 4, 5];
    for (let i = 0; i < battleships.length; i++) {
      while (!createShip(i, battleships));
    }
  });
});

function createShip(i, battleships) {
  var dir = Math.round(Math.random());
  var posx = Math.round(Math.random() * 9);
  var posy = Math.round(Math.random() * 9);
  if (dir == 1) {
    //checking above, below, before and behind
    if (posx + battleships[i] > 9) {
      return false;
    }
    for (let j = (posx - 1); j < posx + battleships[i] + 1 && j < 10; j++) {
      if (j > -1 && $('td[data-r="' + posy + '"][data-c="' + j + '"]').hasClass('ship')) {
        return false;
      }
      if (j > -1 && (posy + 1) < 10 && $('td[data-r="' + (posy + 1) + '"][data-c="' + j + '"]').hasClass('ship')) {
        return false;
      }
      if (j > -1 && (posy - 1) > -1 && $('td[data-r="' + (posy - 1) + '"][data-c="' + j + '"]').hasClass('ship')) {
        return false;
      }
    }
    //placing ship
    for (let j = posx; j < posx + battleships[i]; j++) {
      $('td[data-r="' + posy + '"][data-c="' + j + '"]').removeClass('water').addClass('ship');
    }
    return true;
  } else if (dir == 0) {
    //checking above, below, before and behind
    if (posy + battleships[i] > 9) {
      return false;
    }
    for (let j = (posy - 1); j < posy + battleships[i] + 1 && j < 10; j++) {
      if (j > -1 && $('td[data-r="' + j + '"][data-c="' + posx + '"]').hasClass('ship')) {
        return false;
      }
      if (j > -1 && (posx + 1) < 10 && $('td[data-r="' + j + '"][data-c="' + (posx + 1) + '"]').hasClass('ship')) {
        return false;
      }
      if (j > -1 && (posx - 1) > -1 && $('td[data-r="' + j + '"][data-c="' + (posx - 1) + '"]').hasClass('ship')) {
        return false;
      }
    }
    //placing ship
    for (let j = posy; j < posy + battleships[i]; j++) {
      $('td[data-r="' + j + '"][data-c="' + posx + '"]').removeClass('water').addClass('ship');
    }
    return true;
  }
}