
function getPostPage(){
  var categories = ["Jobs", "Services", "Cars", "School Supplies", "Pets", "Electronics"];

  var page = document.getElementById('pagecontainer');

  var mainDiv = document.createElement('div');
  mainDiv.className = 'content';

  var heading = document.createElement('h2');
  heading.className = 'defheading';
  heading.innerHTML = "New Listing";

  var postTitle = document.createElement('input');
  postTitle.id = 'post_title';
  postTitle.className = 'inputfield';
  postTitle.name = 'title';

  var postDesc = document.createElement('textarea');
  postDesc.className = 'inputfield';
  postDesc.rows = '8';
  postDesc.cols = '100';
  postDesc.name = 'desc';

  var addImageButton = document.createElement('button');
  addImageButton.value = 'Add Imamge';
  addImageButton.className = 'defbutton';
  addImageButton.innerHTML = 'Add Image';

  var submitButton = document.createElement('input');
  submitButton.value = 'Create';
  submitButton.className = 'defbutton';
  submitButton.type = "submit";

  //CODE FOR IMAGE NEEDS TO BE ADDED

  var imgNameDiv = document.createElement('div');
  imgName = imgNameDiv.innerHTML;

  var mainForm = document.createElement('form');
  mainForm.action = "controller.php";
  mainForm.method = "POST";
  mainForm.id = 'addlistform';

  var cDrop = document.createElement('select');
  cDrop.name = 'category';
  cDrop.id = 'catas';
  cDrop.classname = ''
  populateCategories();

  function populateCategories(){

    $.ajax({
          url: 'controller.php?request=getCategories',
          type: 'get',
          //contentType: 'array',
          //dataType: 'array',
          cache: false,
          success: function(data, status) {
            var cDrop = document.getElementById('catas');
            console.log(data);
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++){
              //console.log(cDrop.name);
              var aux = document.createElement('option');
              aux.text = data[i]['name'];
              aux.value = data[i]['name'];
              console.log(aux.value);
              cDrop.add(aux);
            }
        }
      });
}
  var location = document.createElement('input');
  location.className = 'inputfield';
  location.name = 'location';
  location.id = 'location';

  var price = document.createElement('input');
  price.type = 'number';
  price.id = 'price';
  price.name = 'price';


  page.appendChild(mainDiv);
  mainDiv.appendChild(heading);
  mainDiv.appendChild(mainForm);
  mainForm.appendChild(cDrop);
  mainForm.innerHTML += "<br><br>";
  mainForm.innerHTML += 'Title: ';
  mainForm.innerHTML += '<br>';
  mainForm.appendChild(postTitle);
  mainForm.innerHTML += '<br><br>';
  mainForm.innerHTML += 'Location: ';
  mainForm.innerHTML += '<br>';
  mainForm.appendChild(location);
  mainForm.innerHTML += '<br><br>';
  mainForm.innerHTML += 'Price: ';
  mainForm.innerHTML += '<br>';
  mainForm.appendChild(price);
  mainForm.innerHTML += '<br><br>';
  mainForm.innerHTML += "Description: ";
  mainForm.innerHTML += '<br>';
  mainForm.appendChild(postDesc);
  mainForm.innerHTML += '<br><br>';
  mainForm.appendChild(addImageButton);
  mainForm.innerHTML += '<br>';
  mainForm.appendChild(submitButton);

}
/*
function createListing(title, desc){
  var ajax = new XMLHttpRequest();
  ajax.open("POST", "controller.php?mode=createlisting&title=" + title + "&desc=" + desc, true);
  ajax.send();
}*/
