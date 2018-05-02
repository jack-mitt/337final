
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
  postTitle.required = 'true';
  postTitle.className = 'inputfield';
  postTitle.name = 'title';

  var postDesc = document.createElement('textarea');
  postDesc.className = 'inputfield';
  postDesc.required = 'true';
  postDesc.rows = '8';
  postDesc.cols = '100';
  postDesc.name = 'desc';

  var addImageButton = document.createElement('input');
  addImageButton.type='file';
  addImageButton.name='image'
  addImageButton.required = 'true';
  addImageButton.className = 'defbutton';
  addImageButton.innerHTML = 'Add Image';

  var submitButton = document.createElement('input');
  submitButton.value = 'Create';
  submitButton.name = "submit";
  submitButton.className = 'defbutton';
  submitButton.type = "submit";

  var imgNameDiv = document.createElement('div');
  imgName = imgNameDiv.innerHTML;

  var mainForm = document.createElement('form');
  mainForm.action = "controller.php";
  mainForm.method = "POST";
  mainForm.id = 'addlistform';
  mainForm.enctype = 'multipart/form-data';

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
              aux.value = data[i]['id'];
              console.log(aux.value);
              cDrop.add(aux);
            }
        }
      });
}
  var location = document.createElement('input');
  location.className = 'inputfield';
  location.name = 'location';
  location.required = 'true';
  location.id = 'location';

  var price = document.createElement('input');
  price.type = 'number';
  price.id = 'price';
  price.required = 'true';
  price.name = 'price';
    
  var emailInput = document.createElement('input');
  emailInput.type = 'text';
  emailInput.id = 'email';
  emailInput.requred = 'true';
  emailInput.name = 'email';
  emailInput.pattern = ".+\@.+\..+";
  emailInput.title = 'Please enter a valid email address';


  page.appendChild(mainDiv);
  mainDiv.appendChild(heading);
  mainDiv.appendChild(mainForm);
  mainForm.innerHTML += "<br><br>";
  mainForm.innerHTML += "<br><br>";
  
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
  mainForm.innerHTML += "Contact Email: ";
  mainForm.innerHTML += '<br>';
  mainForm.appendChild(emailInput);
  mainForm.innerHTML += '<br><br>';
  mainForm.innerHTML += "Image: (must be jpg, less than 3MB) ";
  mainForm.innerHTML += '<br>';    
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
