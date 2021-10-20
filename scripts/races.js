const ignite = async function(category) {
  let status = await populate(category);
  let kids = document.getElementById("shell").childNodes;
  for (let i = 0; i < kids.length; i++) {
    if (kids[i].id == "tag") {
      kids[i].addEventListener("click", function(event) {
        const url = "https://api.open5e.com/" + category + "/" + kids[i].name;
        let code = "";
        fetch(url)
          .then(function(response) {
            return response.json();
          }).then(function(json) {
            code += "<h2>" + json.name + "</h2>";

            console.log(json);

            code += "<p>" + json.desc + "</p>";
            code += "<p>" + json.asi_desc + "</p>";
            code += "<p>" + json.languages + "</p>";
            code += "<p>" + json.traits + "</p>";

            document.getElementById("shell").innerHTML = code;
          });
      });
    }
  }
}
