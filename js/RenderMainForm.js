export class RenderMainForm {
    constructor() {

    }
    render() {
        let root = document.getElementById('root');
        let section = document.createElement('section');
        let h1 = document.createElement('h1');
        h1.innerText = 'Todo List';
        let listItems = document.createElement('ul');
        listItems.classList.add('listItems');
        listItems.id = 'ul';
        let btnCreate = document.createElement('button');
        btnCreate.classList.add('btnCreate');
        btnCreate.innerText = 'Create';
        let inputCreateName = document.createElement('input');
        inputCreateName.classList.add('inputCreateName');
        inputCreateName.type = 'text';
        inputCreateName.ariaPlaceholder = 'todo'
        let divCreateNewItem = document.createElement('div');
        divCreateNewItem.classList.add('createNewItem');
        
        
        root.appendChild(section);
        section.appendChild(h1);
        section.appendChild(listItems);
        section.appendChild(divCreateNewItem);
        divCreateNewItem.appendChild(inputCreateName);
        divCreateNewItem.appendChild(btnCreate);

        
    }
}