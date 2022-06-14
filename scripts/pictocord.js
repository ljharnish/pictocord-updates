const queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);

//Client ID for Scaledrone
const CLIENT_ID = urlParams.get('code');

if (urlParams.has('name') == false) {
  urlParams.set('name', '');
}

if (urlParams.has('code') == false) {
  urlParams.set('code', '');
}

// Passwords for Badged Accounts
const ljharnishCode = 'bWFyenl0';
const milesCode = 'cGV0ZXIgcGFya2Vy';
const shawnCode = 'IUAzMzYyNTcwNzAy';
const mitchCode = 'bWl0Y2hlbGwxMTIxXw==';
// Badged Accounts
const OGBadges = ['miles#', 'mitch#'];
const DEBadges = ["shawn doos#", "shawn does#"];
const BUMBadges = ['miles#'];
const purBadge = ['mitch#'];

var theme = 'dark';
var colorWell;
var defaultColor = "#0000ff";
let unreadMessages = 0;
const blacklistedWords = ["nigga", 'nigger']
const favicon = document.querySelector('link[rel=icon]');
const imageTypes = [
'.png',
'.jpeg', 
'.jpg', 
'.gif',
'.webp',
'data:image/png;base64',
'data:image/jpeg;base64',  
'data:image/gif;base64,', 
'data:image/webp;base64',
'data:image/svg+xml;base64']

fixedname = urlParams.get('name');
color = getRandomColor();

if (fixedname.length > 10) fixedname = fixedname.substring(0, 25);

function checkInput(input, words) {
  return words.some(word => input.toLowerCase().includes(word.toLowerCase()));
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function onlySpaces(str) {
  return str.trim().length === 0;
}

if (onlySpaces(fixedname) == true || checkInput(fixedname, blacklistedWords) == true) {
  fixedname = getRandomName();
}

const tag = Math.floor(Math.random() * 10000).toString();

if (tag.length == 1) {
  fixedtag = "000" + tag;
} else if (tag.length == 2) {
  fixedtag = "00" + tag;
} else if (tag.length == 3) {
  fixedtag = "0" + tag;
} else if (tag.length == 4) {
  fixedtag = tag;
}
if(fixedname === 'miles'){
  color = '#f5820c'
} else if(fixedname === 'ljharnish'){
  color = '#da40c5'
} else if(fixedname.toLowerCase() === 'shawn does' || fixedname.toLowerCase() === 'shawn doos') {
  color = '#deeb20'
}

fixedname = fixedname + "#" + fixedtag;
console.log("Name: " + fixedname + "\n\nColor: " + color);

var drone = new ScaleDrone(CLIENT_ID, {
  data: {
    name: fixedname,
    color: color,
  },
});

let members = [];

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        window.location.href = 'http://pictocord.ml/m'
}

window.onload = function() {
  console.log("Pictocord v2.0");
  $("#editname").text(fixedname);
  $("#editname").css("color", color);
    if(checkInput(fixedname.toLowerCase(), ['ljharnish#']) || checkInput(fixedname.toLowerCase(), OGBadges) || checkInput(fixedname.toLowerCase(), DEBadges) || checkInput(fixedname.toLowerCase(), purBadge)){
      document.getElementById('id03').style.display='block'
    }
    setTimeout(() => { $('.disclaimer').remove(); }, 50);
  if( document.cookie.indexOf('messages=') < 0 ) { 
      messageCounter = 0
  } else {
      messageCounter = getCookie('messages')
  }
}

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  const room = drone.subscribe('observable-room');
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    getIP();
    console.log('Successfully joined room');
  });

  room.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  room.on('member_join', member => {
    members.push(member);
    const memberJoinDiv = document.getElementById('messageholder').appendChild(document.createElement('div'));
    memberJoinDiv.appendChild(document.createElement('br'));
    const memberJA = memberJoinDiv.appendChild(document.createElement('a'));
    memberJA.classList.add('username');
    memberJA.appendChild(document.createTextNode("Member '" + member.clientData.name + "' has joined the chat."));
    memberJA.style = 'color: red';
    updateMembersDOM();
  });

  room.on('member_leave', ({ id }) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });

  room.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });
});

drone.on('close', event => {
  $("#editname").text('Disconnected.')
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});

function getRandomName() {
  const adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    "_" +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

const nameStuff = {
  input: document.querySelector('.nameInput'),
};
///#[0-9][0-9][0-9][0-9]/gm
function changeName () {
  const urlParams = new URLSearchParams(window.location.search);
  var newName = document.getElementById("nameInput").value;
  urlParams.set('name', newName);
  window.location.search = urlParams;
}

//------------- DOM STUFF

var msgBox = document.getElementById('message-box');
msgBox.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage();
  }
});

function isURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};

/*document.addEventListener('visibilitychange', function(ev) {
  if(document.visibilityState == 'visible'){
    unreadMessages = 0;
    changeFavicon();
  }
});



function changeFavicon() {
  if(unreadMessages == 0) {
      favicon.href = "https://Pictocord.ljharnish.repl.co/images/favicons/icon0.png";
  } else if(unreadMessages == 1) {
      favicon.href = "https://Pictocord.ljharnish.repl.co/images/favicons/icon1.png";
  } else if(unreadMessages == 2) {
      favicon.href = "https://Pictocord.ljharnish.repl.co/images/favicons/icon2.png";
  } else if(unreadMessages == 3) {
      favicon.href = "https://Pictocord.ljharnish.repl.co/images/favicons/icon3.png";
  } else if(unreadMessages == 4) {
      favicon.href = "https://Pictocord.ljharnish.repl.co/images/favicons/icon4.png";
  } else if(unreadMessages == 5) {
      favicon.href = "https://Pictocord.ljharnish.repl.co/images/favicons/icon5.png";
  } else if(unreadMessages == 6) {
      favicon.href = "https://Pictocord.ljharnish.repl.co/images/favicons/icon6.png";
  } else if(unreadMessages == 7) {
      favicon.href = "https://Pictocord.ljharnish.repl.co/images/favicons/icon7.png";
  } else if(unreadMessages == 8) {
      favicon.href = "https://Pictocord.ljharnish.repl.co/images/favicons/icon8.png";
  } else if(unreadMessages == 9) {
      favicon.href = "https://Pictocord.ljharnish.repl.co/images/favicons/icon9.png";
  } else if(unreadMessages == 10) {
      favicon.href = "https://Pictocord.ljharnish.repl.co/images/favicons/icon9+.png";
  }
}*/

function sendMessage() {
  const value = document.getElementById('message-box').value;
  if (value === '') {
    return;
  }
  document.getElementById('message-box').value = '';
  if (onlySpaces(value) == true) {

  } else if (checkInput(value, blacklistedWords) == true) {

  } else if (checkInput(value, blacklistedWords) == false) {
    uploadMessage(value);
    messageCounter++
    document.cookie = "messages=" + messageCounter;
    checkMsgCount(getCookie('messages'))
  }
}

function checkMsgCount(count){
    if(count == 1000){
        document.getElementById('1000MSG').style.display = 'block';
    } else if(count == 10000){
        document.getElementById('10000MSG').style.display = 'block';
    } else if(count == 100000){
        document.getElementById('100000MSG').style.display = 'block';
    } else if(count == 1000000){
        document.getElementById('1000000MSG').style.display = 'block';
    }
}

var badgeDiv
var badge
var badgeSpan

function checkBadgesML(name, el) {
  if(name.toLowerCase().includes('ljharnish#')){
    badgeDiv = el.appendChild(document.createElement('div'));
    badgeDiv.classList.add('tooltip');
    badge = badgeDiv.appendChild(document.createElement('img'));
    badge.src = "./images/badges/owner.svg";
    badge.title = 'Owner Badge';
    badge.classList.add('badge');
    badgeSpan = badgeDiv.appendChild(document.createElement('span'));
    badgeSpan.classList.add('tooltiptext')
    badgeSpan.appendChild(document.createTextNode('Owner Badge'))
  } else if(name === 'Pictocord'){
    badgeDiv = el.appendChild(document.createElement('div'));
    badgeDiv.classList.add('tooltip');
    badge = badgeDiv.appendChild(document.createElement('img'));
    badge.src = "./images/badges/pictocord.svg";
    badge.title = 'Pictocord'
    badge.classList.add('badge');
    badgeSpan = badgeDiv.appendChild(document.createElement('span'));
    badgeSpan.classList.add('tooltiptext'); badgeSpan.appendChild(document.createTextNode('Official Pictocord'));
  } else if(containsAny(name.toLowerCase(), OGBadges)){
    badgeDiv = el.appendChild(document.createElement('div'));
    badgeDiv.classList.add('tooltip');
    badge = badgeDiv.appendChild(document.createElement('img'));
    badge.src = "./images/badges/og.svg";
    badge.title = 'OG Badge'
    badge.classList.add('badge');
    badgeSpan = badgeDiv.appendChild(document.createElement('span'));
    badgeSpan.classList.add('tooltiptext')
    badgeSpan.appendChild(document.createTextNode('OG Badge\n(Before Feb 2022)'))
    if(containsAny(name.toLowerCase(), BUMBadges)){
      badgeDiv = el.appendChild(document.createElement('div'));
    badgeDiv.classList.add('tooltip');
    badge = badgeDiv.appendChild(document.createElement('img'));
    badge.src = "./images/badges/bum.svg";
    badge.title = 'B.U.M. Badge'
    badge.classList.add('badge');
    badgeSpan = badgeDiv.appendChild(document.createElement('span'));
    badgeSpan.classList.add('tooltiptext')
    badgeSpan.appendChild(document.createTextNode('B.U.M. (Balls Under Management)'))
    }
    if(containsAny(name.toLowerCase(), purBadge)){
    badgeDiv = el.appendChild(document.createElement('div'));
    badgeDiv.classList.add('tooltip');
    badge = badgeDiv.appendChild(document.createElement('img'));
    badge.src = "./images/badges/purple.svg";
    badge.title = "Purple. That's it."
    badge.classList.add('badge');
    badgeSpan = badgeDiv.appendChild(document.createElement('span'));
    badgeSpan.classList.add('tooltiptext');
    badgeSpan.appendChild(document.createTextNode("Purple. That's it."));
    }
  } else if(containsAny(name.toLowerCase(), DEBadges)){
    badgeDiv = el.appendChild(document.createElement('div'));
    badgeDiv.classList.add('tooltip');
    badge = badgeDiv.appendChild(document.createElement('img'));
    badge.src = "./images/badges/designer.svg";
    badge.title = 'Designer Badge'
    badge.classList.add('badge');
    badgeSpan = badgeDiv.appendChild(document.createElement('span'));
    badgeSpan.classList.add('tooltiptext')
    badgeSpan.appendChild(document.createTextNode('Designed the HTML Layout'))
  } else if(name.includes('DS User: ')){
     badgeDiv = el.appendChild(document.createElement('div'));
    badgeDiv.classList.add('tooltip');
    badge = badgeDiv.appendChild(document.createElement('img'));
    badge.src = "./images/badges/ds.png";
    badge.title = 'DS User'
    badge.classList.add('badge');
    badge.classList.add('pixelated');
    badgeSpan = badgeDiv.appendChild(document.createElement('span'));
    badgeSpan.classList.add('tooltiptext')
    badgeSpan.appendChild(document.createTextNode('DS User'))
  }
}

function createMemberElement(member) {
  const { name, color } = member.clientData;
  const el = document.createElement('div');
  checkBadgesML(name, el)
  el.appendChild(document.createTextNode(name));
  
  el.className = 'member';
  el.style.color = color;
  return el;
}

function updateMembersDOM() {
  document.getElementById('members-count').innerHTML = `${members.length} users in room.`;
  document.getElementById('members-list').innerHTML = '';
  members.forEach(member =>
    document.getElementById('members-list').appendChild(createMemberElement(member))
  );
}

function addMessageToListDOM(text, member) {
  if (member.clientData.name == "Pictocord"){
    createMessageElement(text, member);
  } else if (isURL(text) == true && checkInput(text, imageTypes) == false) {
    createURLMessageElement(text, member);
  } else if(isURL(text) == true || text.startsWith("data:") && checkInput(text, imageTypes) == true) {
    createImageMessageElement(text, member);
  } else if(text.includes('<SYSIGNORE>')){}
  else if(text.includes('Embed: ')){
      fixedEmbed = text.split('Embed: ')
      args = fixedEmbed[1].split(' & ')
    createEmbed(member, args[0], args[1], args[2]);
  }else{
    createMessageElement(text, member);
  }

  /*if(document.visibilityState == "hidden"){ ELECTRON DOESN'T WORK WITH THIS
    if(unreadMessages > -1 && unreadMessages < 10){
      unreadMessages++;
      changeFavicon();
    } else if(unreadMessages == 10){
      changeFavicon();
    }
  }*/
}