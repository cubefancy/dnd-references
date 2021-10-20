const ignite = async function(category) {
  if (category == "monsters") {
    let status = await populate(category);
  }
  else {
    let status = await repop(category);
  }
  let kids = document.getElementById("shell").childNodes;
  for (let i = 0; i < kids.length; i++) {
    if (kids[i].id == "tag") {
      kids[i].addEventListener("click", function(event) {
        const url = "https://api.open5e.com/monsters/" + kids[i].name;
        let code = "";
        fetch(url)
          .then(function(response) {
            return response.json();
          }).then(function(json) {
            code += "<h2>" + json.name + "</h2>";

            console.log(json);

            code += "<p>Alignment: " + json.alignment + "</p>";
            code += "<p>Hit points: " + json.hit_points + "</p>";
            code += "<p>Hit dice: " + json.hit_dice + "</p>";
            code += "<p>Armor class: " + json.armor_class + "</p>";
            code += "<p>Type: " + json.type + "</p>";

            document.getElementById("shell").innerHTML = code;
          });
      });
    }
    if (kids[i].id == "followup") {
      kids[i].addEventListener("click", function(event) {
        ignite(kids[i].name);
      });
    }
  }
}

const repop = async function(next) {
  let result = new Promise((resolve, reject) => {
    const url = next;
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let stuff = "<h2>Monster Bestiary</h2>";
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
