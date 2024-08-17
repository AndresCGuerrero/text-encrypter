const d = document;

let messageContainer = d.getElementsByClassName("message")[0];
let message = d.querySelector(".message h2");
let message2 = d.querySelector(".message p");
let textOutput = d.getElementById("convert-text");

function initialMessage() {
  let textEntry = d.getElementById("submit-text").value;
  if (textEntry.trim() === "") {
    message.textContent = "No se ha detectado un texto";
    message2.textContent = "Por favor, ingresa el texto a encriptar";
  }
}

initialMessage();

function verifyData() {
  let textEntry = d.getElementById("submit-text").value.trim();

  message.textContent = "";
  message2.textContent = "";

  if (textEntry === "") {
    message.textContent = "El campo no puede estar vacio.";
    message2.classList.add("hidden");
    return false;
  }

  let textRegExp = /^[a-z\s]*$/;
  if (!textRegExp.test(textEntry)) {
    message.textContent =
      "El texto debe contener solo letras minusculas, sin acentos ni caracteres especiales.";
    message2.classList.add("hidden");
    return false;
  }

  messageContainer.classList.add("hidden");
  return true;
}

// encrypting and decrypting the text

function encryptData() {
  if (!verifyData()) {
    return "";
  }

  let textEntry = d.getElementById("submit-text").value;

  let encryptText = textEntry
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");

  return encryptText;
}

function decryptData() {
  if (!verifyData()) {
    return "";
  }

  let textEntry = d.getElementById("submit-text").value;

  let decryptText = textEntry
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ai/g, "a")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");

  return decryptText;
}

// show results
function showData(event) {
  let action = event.target.id;

  let result = "";

  if (action === "encrypt") {
    result = encryptData();
  } else if (action === "decrypt") {
    result = decryptData();
  }

  if (result) {
    textOutput.innerText = result;
    messageContainer.classList.add("hidden");
  }
}

function copyText() {
  let textCopied = textOutput.value;
  console.log(textCopied);
  if (textCopied) {
    navigator.clipboard.writeText(textCopied);
    console.log(textCopied);
    message2.innerText = "Texto copiado.";
    message.classList.add("hidden");
    messageContainer.classList.remove("hidden");
    textOutput.innerText = "";
  } else {
    alert("No se encontró texto para copiar.");
  }
}

// reset interface

function resetInterface() {
  d.getElementById("submit-text").value = "";
  textOutput.innerText = "";
  messageContainer.classList.remove("hidden");
  message.classList.remove("hidden");
  message2.classList.remove("hidden");
  initialMessage();
}

function buttons() {
  let encrypt = d.getElementById("encrypt");
  let decrypt = d.getElementById("decrypt");
  let clear = d.getElementById("clear");
  let copy = d.getElementById("copy");

  encrypt.addEventListener("click", showData);
  decrypt.addEventListener("click", showData);
  clear.addEventListener("click", resetInterface);
  copy.addEventListener("click", copyText);
}

d.addEventListener("DOMContentLoaded", buttons);
