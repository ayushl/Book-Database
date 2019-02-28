var Book = function (a, b, c, d) {
    this.bookname = a;
    this.author = b;
    this.publisher = c;
    this.price = d;
}

var bookmodel = function () {
    this.BookList = [];
    this.BookMapper = {};
    this.defaulter();
}
bookmodel.prototype.defaulter = function () {
    var a = new Book("Book1", "Author1", "Publisher1", 150);
    this.BookList.push(a);
    this.mappingset(a);
    var b = new Book("Memes", "Ayush", "Ayush", 950);
    this.BookList.push(b);
    this.mappingset(b);
    //this.refresher();
}

bookmodel.prototype.getDetails = function (i){
    return this.BookList[i];
}

bookmodel.prototype.mappingset = function (a) {
    this.BookMapper[a.bookname] = a;
}

bookmodel.prototype.newelement = function (a, b, c, d) {
    var k = new Book(a, b, c, d);
    this.BookList.push(k);
    this.mappingset(k);
    //this.refresher();
}
bookmodel.prototype.elementExists = function (a) {
    var b = this.BookMapper[a];
    if (b!=null) {
        return true;
    }
    else {
        return false;
    }
}

bookmodel.prototype.update = function (a,b,c,d) {
    index = this.BookList.findIndex(x => x.bookname==a);
    this.BookList[index].author = b;
    this.BookList[index].price=d;  
    this.BookList[index].publisher=c;
    
}

bookmodel.prototype.refresher = function(){
    this.BookList=[];
    for (var key in this.BookMapper){
        var a = this.BookList[key];
        var b = new Book(a.bookname,a.author,a.publisher,a.price);
        this.BookList.push(b);
    }
}

bookmodel.prototype.delete = function(i) {
    var result = confirm("Want to delete?");
    if (result) {
        this.BookMapper[this.BookList[i].bookname]=null;
    this.BookList.splice(i,1); 
    }
    else{
        return;
    }
    
    
}

