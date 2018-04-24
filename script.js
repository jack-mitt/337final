
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
    
    
    topBanner.appendChild(logoImg);
    topBanner.appendChild(titleDiv);
    
    page.appendChild(topBanner);
}