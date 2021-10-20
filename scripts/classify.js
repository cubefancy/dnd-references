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

            code += "<p>Hit die: " + json.hit_dice + "</p>";
            code += "<p>Your HP at first level: " + json.hp_at_1st_level + "</p>";
            code += "<p>HP at higher levels: " + json.hp_at_higher_levels + "</p>";
            code += "<p>Weapon proficiencies: " + json.prof_weapons + "</p>";
            code += "<p>Armor proficiencies: " + json.prof_armor + "</p>";
            code += "<p>Spellcasting ability: " + json.spellcasting_ability;
            if (json.spellcasting_ability == "") {
              code += "None";
            }
            code += "</p>";

            document.getElementById("shell").innerHTML = code;
          });
      });
    }
  }
}
