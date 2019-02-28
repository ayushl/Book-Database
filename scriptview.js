const $ = (a) => { return document.getElementById(a); };
function formDisplayMain() {
    $('bookListTable').style.display = "none";
    $('headerButtons').style.display = "none";
    $('formForBook').style.display = "block";
    $('myInput').value = "";
    $('myAuthor').value = "";
    $('myPublisher').value = "";
    $('myPrice').value = "";
    $('myInput').focus();
    $('myInput').disabled=false;
}

function checkboxesItemcheck() {
    checkboxes = document.getElementsByClassName('non');
    var k = 0;
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == true)
            k++;
    }
    if (k == 1) {
        return true;
    }
    else {
        if (k == 0) {
            alert("Select atleast one!!");
        }
        else {
            alert("Cannot Update more than one!!");
        }
        return false;
    }
}

function findIcheckBox() {
    checkboxes = document.getElementsByClassName('non');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == true)
            return i;
    }

}

function formUpdatePage(source) {
    var i = findIcheckBox();
    var book = source.getDetails(i);
    $('myInput').value = book.bookname;
    $('myInput').disabled=true;
    $('myAuthor').value = book.author;
    $('myPublisher').value = book.publisher;
    $('myPrice').value = book.price;
    $('bookListTable').style.display = "none";
    $('headerButtons').style.display = "none";
    $('formForBook').style.display = "block";
}

function displayInitial() {
    $('formForBook').style.display = "none";
    $('duplicateerror').style.display = "none";
    var model = new bookmodel();
    var control = new controller(model, this);
    this.viewMain = function () {
        var text = "<table id='bookTable'><tr><th>Select all<br><input type='checkbox' id='c' onclick='toggler(this)'></th><th>Book Name</th><th>Book Author</th><th>Book Publisher</th><th>Price</th></tr>";
        for (var i = 0; i < model.BookList.length; i++) {
            text += "<tr id=" + i + "><td><input type='checkbox' id='checkerbox' class='non' > </td><td  id='myitemval' class='status'> " + model.BookList[i].bookname + " </td><td> " + model.BookList[i].author + " </td><td> " + model.BookList[i].publisher + " </td><td> " + model.BookList[i].price + " </td></tr>";
        }
        text += "</table>"
        return text;
    }
    $('bookListTable').innerHTML = viewMain();
    this.toggler = function (source) {
        checkboxes = document.getElementsByClassName('non');
        for (var i = 0; i < checkboxes.length; i++) {
            //if (checkboxes[i].getAttribute('type') == 'checkbox')
                checkboxes[i].checked = source.checked;
        }
    }
    $('myInput').onblur = function () {
       
        var status = control.itemcheck($('myInput').value);
        if (status == true) {
            $('duplicateerror').style.display = "block";
            $('myInput').focus();
            $('myInput').style = "border-color:red";
        }else {
            $('duplicateerror').style.display = "none";
            $('myInput').style = "border-color:none";
        }
    }
        $('formAddButton').onclick = function () {
        if(document.getElementById("myInput").value=="" || document.getElementById("myPublisher").value=="" ||  document.getElementById("myPrice").value=="" || document.getElementById("myAuthor").value=="" ){
            alert("Enter all the feilds!");
            return;
            }
        control.addelementnew($('myInput').value, $('myAuthor').value,$('myPublisher').value, $('myPrice').value);
        $('bookListTable').style.display = "block";
        $('headerButtons').style.display = "block";
        $('formForBook').style.display = "none";
        $('bookListTable').innerHTML = viewMain();
    }

        $('addNewBook').onclick = function () {
        $('formAddButton').style="display:block";
        $('formUpdateButton').style.display = "none";
        formDisplayMain();
        
    }

        $('updateABook').onclick = function () {
        var status = checkboxesItemcheck();
        if (status == true) {
            
            formUpdatePage(model);
          $('formUpdateButton').style.display = "block";
            $('formAddButton').style="display:none";
           
        }
    }

    $('formUpdateButton').onclick = function () {
        
        control.updateEntry($('myInput').value, $('myAuthor').value,$('myPublisher').value, $('myPrice').value);
        $('bookListTable').style.display = "block";
        $('headerButtons').style.display = "block";
        $('formForBook').style.display = "none";
        $('bookListTable').innerHTML = viewMain();
    }

        $('formCancelButton').onclick = function () {
        $('bookListTable').style.display = "block";
        $('headerButtons').style.display = "block";
        $('formForBook').style.display = "none";
    }
        $('DeleteBookS').onclick = function () {
        checkboxes = document.getElementsByClassName('non');

        for (var i = checkboxes.length-1; i >=0 ; i--) {
            if (checkboxes[i].checked == true){
                model.delete(i);
            }
        }
        $('bookListTable').innerHTML = viewMain();

}
}
