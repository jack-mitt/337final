
function getTopBanner(){
    var page = document.getElementById('pagecontainer');
    
    var topBanner = document.createElement('div');
    topBanner.className = 'topbanner';
    
    var logoImg = document.createElement('img');
    logoImg.src='images/azlogo.png';
    logoImg.className="topbannerlogo";
    
    var titleDiv = document.createElement('div');
    titleDiv.className='topbannertitle';
    titleDiv.innerHTML='UA SWAP';
    
    let userDiv = document.createElement('div');
    userDiv.className = 'dropdown';
    userDiv.id='userpanel';
    let userIcon = document.createElement('img');
    userIcon.className='dropbtn';
    userIcon.id='usericon';
    userIcon.src = 'images/usericon.png';
    
    let accountLinkDiv = document.createElement('div');
    accountLinkDiv.className = 'dropdown-content';
    
    let accountLink = document.createElement('a');
    
    accountLink.innerHTML = 'Link1';
    accountLink.href = '#';
    
    let logoutLink = document.createElement('a');
    logoutLink.innerHTML = 'Link2';
    logoutLink.href = '#';
    
    accountLinkDiv.appendChild(accountLink);
    accountLinkDiv.appendChild(logoutLink);
        
    userDiv.appendChild(userIcon);
    userDiv.appendChild(accountLinkDiv);
    
    topBanner.appendChild(logoImg);
    topBanner.appendChild(titleDiv);
    topBanner.appendChild(userDiv);
    
    page.appendChild(topBanner);
}