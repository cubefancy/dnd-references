const temp = function() {
  document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("search").value;
    if (value == "") {
      return;
    }
    const url = "https://api.open5e.com/search/?text=" + value;
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
      });
  });
}

let extension = "";

const populate = async function(category) {
  let result = new Promise((resolve, reject) => {
    if (category == "") {
      return;
    }
    const url = "https://api.open5e.com/" + category + "/";
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let stuff = "<h2>";
        switch (category) {
          case ("classes"):
            stuff += "Player Classes";
            break;
          case ("races"):
            stuff += "Playable Races";
            break;
          case ("monsters"):
            stuff += "Monster Bestiary";
            break;
        }
        stuff += "</h2>";
        console.log(json);
        for (let i = 0; i < json.results.length; i++) {
          stuff += "<br><button class='btn btn-link btn-lg' id='tag' name='" + json.results[i].slug + "'>";
          stuff += json.results[i].name + "</button>";
        }
        if (json.next != null) {
          stuff += "<br><button class='btn btn-link btn-lg' style='color: red;' id='followup' name='";
          stuff += json.next + "'>Next Page</button>";
        }
        document.getElementById("shell").innerHTML = stuff;
        extension = json.next;

      }).then(function() {
        resolve(1);
      });
  });
  return result;
};

const loadUp = async function(pageUp) {
    document.getElementById("followup").addEventListener("click", function(event) {
      event.preventDefault();
      const url = extension;
      fetch(url)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          let stuff = "<h2>Monster Bestiary</h2>";
          for (let i = 0; i < json.results.length; i++) {
            stuff += "<br><button class='btn btn-link btn-lg' id='tag' name='" + json.results[i].name + "'>";
            stuff += json.results[i].name + "</button>";
          }
          if (json.next != null) {
            stuff += "<br><button class='btn btn-link btn-lg' style='color: red;' id='followup'>Next Page</button>";
            stuff += "<script src='scripts/getmore.js'></script>";
            stuff += "<script>extension = json.next;</script>";
          }
          document.getElementById("shell").innerHTML = stuff;
          extension = json.next;
          loadUp(extension);
        });
    });
};
