var money = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

(() => {
  Kashacter = {};

  Kashacter.ShowUI = function (data) {
    $("body").fadeIn();

    // Mostrar solo un character a la vez, se remueve el anterior si existiera
    $("#character").remove();

    // Vista previa del personaje en el div con charid=2
    $("[data-charid=2]").html(`
      <!-- Aquí puedes agregar la vista previa del personaje, como imagen o datos -->
    `).attr("data-ischar", "true");

    // Mostrar información del personaje en el div con charid=1
    $("[data-charid=1]").html(`
      <div id="character">
        <h3 class="h3">${data.firstname} ${data.lastname}</h3>
        <p class="parraf">
          <span class="material-symbols-outlined font-18" id="verified">verified</span>${data.dateofbirth}
        </p>
        <p class="parraf">
          <span class="material-symbols-outlined font-18" id="sex">wc</span>${data.sex}
        </p>
        <p class="parraf">
          <span class="material-symbols-outlined font-18" id="work">work</span>${data.job}
        </p>
        <p class="parraf">
          <span class="material-symbols-outlined font-18" id="money">local_atm</span>${money.format(data.money)}
        </p>
        <p class="parraf">
          <span class="material-symbols-outlined font-18" id="bank">account_balance</span>${money.format(data.bank)}
        </p>
      </div>
    `).attr("data-ischar", "true");

    // Agregar evento click para agregar borde al div con id="character"

  };

  Kashacter.CloseUI = function () {
    $("body").fadeOut();

    // Limpiar la vista previa del personaje y los datos
    $("[data-charid=1]").html(`
      <h3 class="character-fullname"></h3>
      <div class="character-info"><p class="character-info-new"></p></div>
    `);
    $("[data-charid=2]").html(''); // Limpiar la vista previa del personaje
  };

  window.onload = function (e) {
    window.addEventListener("message", function (event) {
      switch (event.data.action) {
        case "openui":
          Kashacter.ShowUI(event.data.character);
          break;
        case "closeui":
          Kashacter.CloseUI();
          break;
      }

      let data = event.data;
      if (data.type == "resetdata") {
        console.log("resetting data...");
        $("#option").remove();
        $("#option").remove();
        $("#option").remove();
        $("#option").remove();
        $("#option").remove();
      }
      if (data.type == "createcharacters") {
        let ui = `
           <div class="characters" id="characters" onclick="selectoption(${data.value})">
           <div class="image-preview" style="background: ulr(${data.image});"></div>
              <p id="parraf" style="font-size:20px !important;font-family:'Fustat' !important;">
            <span class="material-symbols-outlined font-18">person</span>${data.label}
          </p>
        </div>`;
        document.getElementById("none-class").insertAdjacentHTML("beforeend", ui);
        ui = null;
      }
      $("#characters").hover(
        function() {
          // Cuando el mouse entra (hover in)
          $(this).css({
            "border-radius": "2px 25px" // Border-radius de 20px
          });
        },
        function() {
          // Cuando el mouse sale (hover out)
          $(this).css({
            "border-radius": ""
          });
        }
      );      
    });
  };
})();

function selectoption(value) {
  $.post(
    `https://${GetParentResourceName()}/previewcharacter`,
    JSON.stringify(value)
  );

  const element = document.getElementById("select");
  const element1 = document.getElementById("delete");
  element.remove();
  element1.remove();
  let data = value;
  let ui = `
  <button class="play" id="select"  onclick="selectcharacter(${data})"><span class="material-symbols-outlined">play_arrow</span></button>
  `;
  document.getElementById("select-button").insertAdjacentHTML("beforeend", ui);
  $("#select-button").fadeIn();
  ui = null;
}

function deletecharacter(value) {
  $.post(
    `https://${GetParentResourceName()}/deletecharacter`,
    JSON.stringify(value)
  );
}

function selectcharacter(value) {
  $.post(
    `https://${GetParentResourceName()}/selectcharacter`,
    JSON.stringify(value)
  );
}
