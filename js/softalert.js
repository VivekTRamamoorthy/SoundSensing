function softalert(text) {
  let container = document.createElement("div");
  container.classList.add("SoftAlertContainer");
  container.onclick = (e) => {
    if (e.target === container) {
      container.remove();
    }
  };

  let div = document.createElement("div");
  div.classList.add("SoftAlert");

  let textElem = document.createElement("div");
  textElem.classList.add("SoftAlertText");
  textElem.innerText = text;
  div.appendChild(textElem);

  let buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("SoftAlertButtonsDiv");

  // let copyBtn = document.createElement("button");
  // copyBtn.classList.add("SoftAlertCopyBtn");
  // copyBtn.innerText = "COPY";
  // copyBtn.onclick = () => {
  //   navigator.clipboard.writeText(text);
  //   disappearingMessage("Copied to clipboard!",800)
  //   container.remove();
  // };
  // buttonsDiv.appendChild(copyBtn);

  let closeBtn = document.createElement("button");
  closeBtn.classList.add("SoftAlertCloseBtn");
  closeBtn.innerText = "CLOSE";
  closeBtn.onclick = () => {
    container.remove();
  };
  buttonsDiv.appendChild(closeBtn);

  div.appendChild(buttonsDiv);
  container.appendChild(div);
  document.querySelector("body").appendChild(container);
}

function disappearingMessage(text,timer = 300) {
    let container = document.createElement("div");
    container.classList.add("SoftAlertContainer");
    container.onclick = (e) => {
      if (e.target === container) {
        container.remove();
      }
    };

    let div = document.createElement("div");
    div.classList.add("DisappearingMessage");
    div.innerText= text;
        container.appendChild(div);
        document.querySelector("body").appendChild(container);



    setTimeout(()=>{container.remove()},timer);

}
