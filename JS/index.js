// Inputs Variables
var bookmarkNameInput = document.getElementById('bookmarkName');
var bookmarkLinkInput = document.getElementById('bookmarkLink');
var bookmarkDescriptionInput = document.getElementById('bookmarkDescription')
var bookmarkCategoryInput = document.getElementById('datalistInput');
var rowDataInput = document.getElementById('rowData');
var searchBoxInput = document.getElementById('searchBox');
var searchInput = document.getElementById('searchInput');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');




var bookmarksContainer;
if(localStorage.getItem('bookmarks') == null){
    bookmarksContainer =[];
}else{
    bookmarksContainer = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmarks();
}

function addBookmark(){
    if (validationForm(bookmarkNameInput) && validationForm(bookmarkLinkInput) && validationForm(bookmarkDescriptionInput) && validationForm(bookmarkCategoryInput)){
          var bookmark ={
        title: bookmarkNameInput.value,
        link: bookmarkLinkInput.value,
        description: bookmarkDescriptionInput.value,
        category: bookmarkCategoryInput.value
    }


    bookmarksContainer.push(bookmark);
    localStorage.setItem('bookmarks' , JSON.stringify(bookmarksContainer));
    clearForm();
    displayBookmarks();
}
  
}

function clearForm(){
    bookmarkNameInput.value = null;
    bookmarkLinkInput.value = null;
    bookmarkDescriptionInput.value = null;
    bookmarkCategoryInput.value = null; 

    bookmarkNameInput.classList.remove('is-valid', 'is-invalid');
    bookmarkLinkInput.classList.remove('is-valid', 'is-invalid');
    bookmarkDescriptionInput.classList.remove('is-valid', 'is-invalid');
    bookmarkCategoryInput.classList.remove('is-valid', 'is-invalid');
}

function displayBookmarks(){
    var cartona = ``;
    for(var i=0; i<bookmarksContainer.length;i++){
        cartona += ` <div class="col-md-4 mb-4">
        <div class="bookmark-card d-flex flex-column">
            <h3 class="ff-Press-Start h6">${bookmarksContainer[i].link}</h3>
            <div class="d-flex align-items-baseline justify-content-between">
              <h2 class="ff-Bungee">${bookmarksContainer[i].title}</h2>
              <p class="ff-Bungee"><span># </span>${bookmarksContainer[i].category}</p>
            </div>
            <div class="desc-border">
              <p class="ff-Press-Start mb-0">
              ${bookmarksContainer[i].description}
              </p>
            </div>
            <div class="card-btns d-flex justify-content-end">
              <button onclick="deleteBookmark(${i})" type="button" id="deleteBtn" class="btn btn-primary">
                <i class="fa-solid fa-trash fa-lg"></i>
              </button>
              <button onclick="setFormForUpdate(${i})" type="button" id="editBtn" class="btn btn-primary">
                <i class="fa-solid fa-pen-to-square fa-lg"></i>              </button>
             <a href="${bookmarksContainer[i].link}" target="_blank" class="btn btn-primary">
  <span>Visit</span> <i class="fa-regular fa-share-from-square fa-lg ms-2"></i>
</a>
            </div>
          </div></div>`
          
    }

    rowDataInput.innerHTML = cartona; 
    searchBoxInput.classList.remove('d-none')
}

function searchBookmark(searchTerm){
    var searchTerm = searchInput.value;
    var cartona = ``;
    for(var i =0; i<bookmarksContainer.length; i++){
        if(bookmarksContainer[i].title.toLowerCase().includes(searchTerm.toLowerCase()) || bookmarksContainer[i].category.toLowerCase().includes(searchTerm.toLowerCase()))
{cartona += ` <div class="col-md-4 mb-4">
    <div class="bookmark-card d-flex flex-column">
        <h3 class="ff-Press-Start h6">${bookmarksContainer[i].link}</h3>
        <div class="d-flex align-items-baseline justify-content-between">
          <h2 class="ff-Bungee">${bookmarksContainer[i].title}</h2>
          <p class="ff-Bungee"><span># </span>${bookmarksContainer[i].category}</p>
        </div>
        <div class="desc-border">
          <p class="ff-Press-Start mb-0">
          ${bookmarksContainer[i].description}
          </p>
        </div>
        <div class="card-btns d-flex justify-content-end">
          <button onclick="deleteBookmark(${i})" type="button" id="deleteBtn" class="btn btn-primary">
            <i class="fa-solid fa-trash fa-lg"></i>
          </button>
          <button onclick="setFormForUpdate(${i})" type="button" id="editBtn" class="btn btn-primary">
            <i class="fa-solid fa-pen-to-square fa-lg"></i>              </button>
              <a href="${bookmarksContainer[i].link}" target="_blank" class="btn btn-primary">
  <span>Visit</span> <i class="fa-regular fa-share-from-square fa-lg ms-2"></i>
</a>
        </div>
      </div></div>`}
    }

    rowDataInput.innerHTML = cartona; 
}

function deleteBookmark(deletedIndex){
    bookmarksContainer.splice(deletedIndex,1);
    displayBookmarks();
    localStorage.setItem('bookmarks' , JSON.stringify(bookmarksContainer))
}
var updatedIndex;
function setFormForUpdate (i){
    updatedIndex = i;
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');

    bookmarkNameInput.value = bookmarksContainer[i].title;
    bookmarkLinkInput.value = bookmarksContainer[i].link;
    bookmarkDescriptionInput.value = bookmarksContainer[i].description;
    bookmarkCategoryInput.value = bookmarksContainer[i].category;

}

function updateBookmark(){
    if (validationForm(bookmarkNameInput) && validationForm(bookmarkLinkInput) && validationForm(bookmarkDescriptionInput) && validationForm(bookmarkCategoryInput)){

    bookmarksContainer[updatedIndex].title = bookmarkNameInput.value;
    bookmarksContainer[updatedIndex].link = bookmarkLinkInput.value;
    bookmarksContainer[updatedIndex].description = bookmarkDescriptionInput.value;
    bookmarksContainer[updatedIndex].category = bookmarkCategoryInput.value;

    displayBookmarks();
    localStorage.setItem('bookmarks' , JSON.stringify(bookmarksContainer));

    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    clearForm();
    }
}



// Validation Form
function validationForm(element){
    var regex ={
        bookmarkName: /^(?=.*\b[a-zA-Z0-9]{3,}\b)([a-zA-Z0-9]{1,}\s?){1,3}$/,
        bookmarkLink: /^https?:\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
        bookmarkDescription: /^[a-zA-Z0-9 ]{1,80}$/,
        datalistInput:  /^(Coding|Design|Food Recipes|Travelling|Shopping)$/
    }
    if (regex[element.id].test(element.value)){
        element.classList.add('is-valid')
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.add('d-none');
        return true;
      } else {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        element.nextElementSibling.classList.remove('d-none');
        return false;
      }
}

