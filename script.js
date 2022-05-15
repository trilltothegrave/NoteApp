
const createBtn = document.querySelector(".create_btn"),
deleteBtn = document.querySelector(".delete_btn"),
listNotes = document.querySelector(".list_notes"),
noteHeading = document.querySelector("input"),
noteDesc = document.querySelector("textarea"),
form = document.querySelector("form");

let currentID; //Хранит id текущей заметки

const notes = JSON.parse(localStorage.getItem("notes") || "[]"); //Хранит заметки в локальном хранилище

function showStaticNote() {
    //Если список заметок пуст, то создает статичную заметку
    if (notes == 0) {
        const staticNote = {heading: "Привет!", description: "Создавайте свои заметки здесь" };
        notes.push(staticNote); //Добавляет заметку в notes
        localStorage.setItem("notes", JSON.stringify(notes)); //Сохраняет ее в локальном хранилище
        
    }
}

showStaticNote();

function showNotes() {
    //
    document.querySelectorAll(".note").forEach(note => note.remove());
    //Создание блока новой заметки
    notes.forEach((note, id) => {
        let noteBlock = `<li class="note" onclick="openNote(${id}, '${note.heading}', '${note.description}')">
                            <p>${note.heading}</p>
                         </li>`;
        listNotes.insertAdjacentHTML("afterbegin", noteBlock);                
    });
}

showNotes();

function openNote(openedId, head, desc) {
    //Заполняет input и texarea 
    noteHeading.value = head;
    noteDesc.value = desc;
    //Записывает id открытой заметки в глобальную переменную
    currentID = openedId;
   
    noteHeading.focus();
}

createBtn.addEventListener("click", e => {
    e.preventDefault();
    
    let noteInfo = {heading: noteHeading.value, description: noteDesc.value}

    //Если заголовок или описание заполнены, то создает заметку
    if (noteHeading.value || noteDesc.value) {
        notes.push(noteInfo);
        localStorage.setItem("notes", JSON.stringify(notes));

        showNotes();
        form.reset();
        noteHeading.focus();
    }
});


deleteBtn.addEventListener("click", () => {
    notes.splice(currentID, 1);//Удаляет 1 заметку из массива
    localStorage.setItem("notes", JSON.stringify(notes));

    showNotes();
    form.reset();
    noteHeading.focus();
});
