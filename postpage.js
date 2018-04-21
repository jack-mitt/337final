function getPostPage(){
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

  page.appendChild(mainDiv);
  mainDiv.appendChild(heading);
  mainDiv.appendChild(mainForm);
  mainDiv.innerHTML += 'Title: ';
  mainDiv.innerHTML += '<br>';
  mainDiv.appendChild(postTitle);
  mainDiv.innerHTML += '<br><br>';
  mainDiv.innerHTML += "Description: ";
  mainDiv.innerHTML += '<br>';
  mainDiv.appendChild(postDesc);
  mainDiv.innerHTML += '<br><br>';
  mainDiv.appendChild(addImageButton);
  mainDiv.innerHTML += '<br>';
  mainDiv.appendChild(submitButton);

}
/*
function createListing(title, desc){
  var ajax = new XMLHttpRequest();
  ajax.open("POST", "controller.php?mode=createlisting&title=" + title + "&desc=" + desc, true);
  ajax.send();
}*/
