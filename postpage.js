function getPostPage(){
  var page = document.getElementById('pagecontainer');

  var mainDiv = document.createElement('div');
  mainDiv.className = 'content';

  var heading = document.createElement('h2');
  heading.className = 'defheading';
  heading.innerHTML = "New Listing";

  var postTitle = document.createElement('input');
  postTitle.id = 'post_title';


  var postDesc = document.createElement('textarea');


  var addImageButton = document.createElement('button');
  addImageButton.value = 'Add Imamge';
  addImageButton.className = 'defbutton';

  var submitButton = document.createElement('button');
  submitButton.value = 'Create';
  submitButton.className = 'defbutton';
  var title = postTitle.value;
  var desc = postDesc.value;
  //CODE FOR IMAGE NEEDS TO BE ADDED
  submitButton.onclick = 'createListing(title, desc)';

  page.appendChild(mainDiv);
  mainDiv.appendChild(heading);
  mainDiv.appendChild(postTitle);
  mainDiv.innerHTML += '<br><br>';
  mainDiv.appendChild(postDesc);
  mainDiv.innerHTML += '<br><br>';
  mainDiv.appendChild(addImageButton);
  mainDiv.appendChild(submitButotn);

}
