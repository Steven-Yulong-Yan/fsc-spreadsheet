window.onunload = function () {
  sessionStorage.clear();
}

const refreshButton = document.getElementById("refresh");
refreshButton.addEventListener("click", function onClick() {
  window.location.reload();
});

let bold = false;
let boldButton = document.querySelector(".bold");
boldButton.addEventListener("click", function onClick() {
  if (!bold) {
    boldButton.classList.add("active-button");
    bold = true;
  } else {
    boldButton.classList.remove("active-button");
    bold = false;
  }
});

let underline = false;
let underlineButton = document.querySelector(".underline");
underlineButton.addEventListener("click", function onClick() {
  if (!underline) {
    underlineButton.classList.add("active-button");
    underline = true;
  } else {
    underlineButton.classList.remove("active-button");
    underline = false;
  }
});

let italic = false;
let italicButton = document.querySelector(".italic");
italicButton.addEventListener("click", function onClick() {
  if (!italic) {
    italicButton.classList.add("active-button");
    italic = true;
  } else {
    italicButton.classList.remove("active-button");
    italic = false;
  }
});

let Capitals;
for (let i = 0; i < 101; i++) {
  const row = document.querySelector("table").insertRow(-1);
  for (let j = 0; j < 101; j++) {
    if (j === 0) {
      Capitals = "";
    } else {
      Capitals = String.fromCharCode(65 + (j - 1) % 26).repeat(Math.floor((j - 1) / 26) + 1);
    }
    row.insertCell(-1).innerHTML = i && j ? "<input id='" + Capitals + i + "'/>" : i || Capitals;
  }
}

const data = {}
const cells = [].slice.call(document.querySelectorAll("input"));
cells.forEach(function(element) {
  element.onfocus = function(e) {
    e.target.value = sessionStorage[e.target.id] || "";
    if (bold) {
      e.target.style.fontWeight = 'bold';
    } else {
      e.target.style.fontWeight = 'normal';
    }
    if (underline) {
      e.target.style.textDecoration = 'underline';
    } else {
      e.target.style.textDecoration = 'none';
    }
    if (italic) {
      e.target.style.fontStyle = 'italic';
    } else {
      e.target.style.fontStyle = 'normal';
    }
  };
  element.onblur = function(e) {
    sessionStorage[e.target.id] = e.target.value;
    computeAll();
  };
  const getter = function () {
    const value = sessionStorage[element.id] || "";
    if (value.charAt(0) === "=") {
      with (data) {
        return eval(value.substring(1))
      }
    } else {
      return isNaN(parseFloat(value)) ? value : parseFloat(value);
    }
  };
  Object.defineProperty(data, element.id, { get:getter });
  Object.defineProperty(data, element.id.toLowerCase(), { get:getter });
});
(window.computeAll = function() {
  cells.forEach(function(element) { try { element.value = data[element.id]; } catch(err) {} });
})();

