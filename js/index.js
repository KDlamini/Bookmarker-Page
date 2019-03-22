document.getElementById('bookmark-form').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    let pageName = document.getElementById('pageName').value;
    let pageURL = document.getElementById('pageURL').value;

    if (!validateForm(pageName, pageURL)) {
        return false;
    }

    let bookmark = {
        name: pageName,
        url: pageURL
    }

    //Test if bookmarks is empty in localStorage
    if (localStorage.getItem('bookmarks') === null) {

        let bookmarks = [];
        bookmarks.push(bookmark);

        //Set bookmarks array to localStorage as string
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //Get existing bookmarks from localStorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);

        //re-set localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Clear form after submition
    document.getElementById('bookmark-form').reset();
    //re-fetch bookmarks to update changes
    fetchBookmarks();
    //Prevent form from submitting on load
    e.preventDefault();
}

function fetchBookmarks() {
    let output = document.getElementById('output');
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Built output
    output.innerHTML = '';
    for (let i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        
        output.innerHTML += '<div class="well bg-light">'+
                                      '<h3>'+
                                      '<a class="badge badge-info" target="_blank" href="'+url+'">'+name+'</a> ' +
                                      '<a onclick="deleteBookmark(\''+url+'\')" class="badge badge-danger" href="#">X</a> ' +
                                      '<style>.badge.badge-danger {float: right; margin: 5px;} .badge.badge-info {margin: 5px;} .well {border-radius: 5px;}</style>' +
                                      '</h3>'+
                                      '</div>';
    }
}

function validateForm(pageName, pageURL) {
    if (!pageName || !pageURL) {
        alert('Please fill in the form');
        return false;
    }

    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if (!pageURL.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }
    return true;
}

function deleteBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Iterate through all bookmarks
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {

            bookmarks.splice(i, 1);
        }
        
    }
 
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}
