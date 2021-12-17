export class Render {
  constructor(array) {
    this.array = array;
  }

  render() {
    if (this.array.arrayItems[0] !== undefined) {
      const nodeUl = document.getElementById("ul");
      while (nodeUl.firstChild) nodeUl.removeChild(nodeUl.firstChild);

      this.array.arrayItems.forEach((element) => {
        let listItems = document.querySelector(".listItems");
        let saveBtn = document.createElement("button");
        let inputChange = document.createElement("input");
        const newItems = document.createElement("li");
        newItems.classList.add("parentPosition");
        newItems.setAttribute("id", element.id);
        if (element.deleted === true) {
          newItems.classList.add("deleted");
        }
        const buttonCheck = document.createElement("input");
        buttonCheck.type = "checkbox";
        buttonCheck.classList.add("check");
        const p = document.createElement("p");
        p.innerText = `${element.name}`;
        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("buttonGroup");
        const buttonChange = document.createElement("button");
        buttonChange.classList.add("change");
        buttonChange.innerText = "Change";
        const buttonDelete = document.createElement("button");
        buttonDelete.classList.add("delete");
        buttonDelete.innerText = "Delete";

        // saveBtn
        saveBtn.classList.add("saveBtn");
        saveBtn.innerText = "save";
        saveBtn.style.display = "none";
        buttonGroup.classList.add("parentPosition");
        buttonGroup.appendChild(saveBtn);
        // end saveBtn

        //inputChange
        inputChange.type = "text";
        inputChange.classList.add("inputChange");
        inputChange.setAttribute("maxlength", "50");
        inputChange.style.display = "none";
        newItems.appendChild(inputChange);
        //end inputChange

        buttonGroup.appendChild(buttonChange);
        buttonGroup.appendChild(buttonDelete);
        newItems.appendChild(p);
        newItems.appendChild(buttonCheck);
        newItems.appendChild(buttonGroup);
        listItems.appendChild(newItems);
        if (element.checked === true) {
          buttonCheck.setAttribute("checked", "true");
          p.classList.add("pCheck");
        }
        if (element.editing === true) {
          inputChange.value = element.name;
          saveBtn.style.display = "block";
          inputChange.style.display = "block";
        }
      });
    }
  }
}
