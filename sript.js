let playerData = []; // Variable para almacenar los datos del archivo CSV

document.getElementById("csvFile").addEventListener("change", function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const csv = e.target.result;
    playerData = parseCSV(csv);
    console.log("Archivo CSV cargado:", playerData);
  };

  reader.readAsText(file);
});

function parseCSV(csv) {
  const lines = csv.split('\n');
  const data = [];
  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length === headers.length) {
      const player = {};
      for (let j = 0; j < headers.length; j++) {
        player[headers[j].trim()] = values[j].trim();
      }
      data.push(player);
    }
  }

  return data;
}

function searchPlayers() {
  const searchTerm = document.getElementById("searchField").value.toLowerCase();
  const results = playerData.filter(player => {
    for (const key in player) {
      if (player[key].toLowerCase().includes(searchTerm)) {
        return true;
      }
    }
    return false;
  });

  displayResults(results);
}

function displayResults(results) {
  const resultsDiv = document.getElementById("searchResults");
  resultsDiv.innerHTML = "";

  if (results.length === 0) {
    resultsDiv.innerHTML = "No results found.";
  } else {
    const resultList = document.createElement("ul");
    results.forEach(player => {
      const listItem = document.createElement("li");
      listItem.textContent = JSON.stringify(player);
      resultList.appendChild(listItem);
    });
    resultsDiv.appendChild(resultList);
  }
}

