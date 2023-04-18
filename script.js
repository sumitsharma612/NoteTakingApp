const addBtn = document.querySelector('#addBtn');
const main = document.querySelector('#main');

const saveNotes = () =>{
    const notes = document.querySelectorAll('.note textarea');
    console.log(notes);
    const data = [];
    notes.forEach(
        (note)=>{
            data.push(note.value);
        }
    )
    // console.log(data);
    if(data.length == 0){
        localStorage.removeItem('notes')
    }
    else{
        localStorage.setItem('notes',JSON.stringify(data));
    }
}

addBtn.addEventListener('click',()=>{
    addNote();
});


const addNote = (text = "")=>{
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
    <div class="tool">
    <i class="save fa-solid fa-floppy-disk"></i>
    <i class="trash fa-solid fa-trash"></i>
    </div>
    <textarea>${text}</textarea>`;
    
    note.querySelector('.trash').addEventListener('click',()=>{
        note.remove()
        saveNotes()
    });
    
    note.querySelector('.save').addEventListener('click',()=>{
        saveNotes();
    });
    note.querySelector('textarea').addEventListener('focusout',()=>{
        saveNotes()
    })
    main.appendChild(note);
    saveNotes();
}

(()=>{
    const LSnotes = JSON.parse(localStorage.getItem('notes'));
    if(LSnotes === null){
        addNote()
    }
    else{
        LSnotes.forEach(
            (LSnote)=>{
                addNote(LSnote)
            }
        )
    }
})()
