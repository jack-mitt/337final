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

  var postDesc = document.createElement('textarea');
  postDesc.className = 'inputfield';

  var addImageButton = document.createElement('button');
  addImageButton.value = 'Add Imamge';
  addImageButton.className = 'defbutton';
  addImageButton.innerHTML = 'Add Image';

  var submitButton = document.createElement('button');
  submitButton.value = 'Create';
  submitButton.className = 'defbutton';
  submitButton.innerHTML = 'Create';
  var title = postTitle.value;
  var desc = postDesc.value;
  //CODE FOR IMAGE NEEDS TO BE ADDED
  submitButton.onclick = 'createListing(title, desc)';

  page.appendChild(mainDiv);
  mainDiv.appendChild(heading);
  mainDiv.innerHTML += 'Title: ';
  mainDiv.innerHTML += '<br>';
  mainDiv.appendChild(postTitle);
  mainDiv.innerHTML += '<br><br>';
  mainDiv.innerHTML += "Description: ";
  mainDiv.innerHTML += '<br>';
  mainDiv.appendChild(postDesc);
  mainDiv.innerHTML += '<br><br>';
  mainDiv.appendChild(addImageButton);
  mainDiv.appendChild(submitButton);

}
