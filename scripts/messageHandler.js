function containsAny(str, substrings) {
  for (var i = 0; i != substrings.length; i++) {
     var substring = substrings[i];
     if (str.indexOf(substring) != - 1) {
       return substring;
     }
  }
  return null; 
}

function twemojiParser() {
twemoji.parse(document.body, {folder: 'svg', ext: '.svg'});
}

window.onload = function(){
twemoji.parse(document.body, {folder: 'svg', ext: '.svg'});
}

function emojis(msg){
msg = msg.replaceAll(':grinning:', '😀');
msg = msg.replaceAll(':smiley:', '😃');
msg = msg.replaceAll(':smile:', '😄');
msg = msg.replaceAll(':grin:', '😁');
msg = msg.replaceAll(':laughing:', '😆');
msg = msg.replaceAll(':satisfied:', '😆');

msg = msg.replaceAll(':raised_eyebrow:', '🤨');







msg = msg.replaceAll(':pensive:', '😔');







msg = msg.replaceAll(':weary:', '😩');


msg = msg.replaceAll(':sob:', '😭');

msg = msg.replaceAll(':melting_face:', '🫠');
return msg;
}

function checkBadges(name, userA) {
if(name.toLowerCase().includes('ljharnish#')){
  badgeDiv = userA.appendChild(document.createElement('div'));
  badgeDiv.classList.add('tooltip');
  badge = badgeDiv.appendChild(document.createElement('img'));
  badge.src = "./images/badges/owner.svg";
  badge.title = 'Owner Badge';
  badge.classList.add('badge');
  badgeSpan = badgeDiv.appendChild(document.createElement('span'));
  badgeSpan.classList.add('tooltiptext')
  badgeSpan.appendChild(document.createTextNode('Owner Badge'))
} else if(name === 'Pictocord'){
  badgeDiv = userA.appendChild(document.createElement('div'));
  badgeDiv.classList.add('tooltip');
  badge = badgeDiv.appendChild(document.createElement('img'));
  badge.src = "./images/badges/pictocord.svg";
  badge.title = 'Pictocord'
  badge.classList.add('badge');
  badgeSpan = badgeDiv.appendChild(document.createElement('span'));
  badgeSpan.classList.add('tooltiptext'); badgeSpan.appendChild(document.createTextNode('Official Pictocord'));
} else if(containsAny(name.toLowerCase(), OGBadges)){
  badgeDiv = userA.appendChild(document.createElement('div'));
  badgeDiv.classList.add('tooltip');
  badge = badgeDiv.appendChild(document.createElement('img'));
  badge.src = "./images/badges/og.svg";
  badge.title = 'OG Badge'
  badge.classList.add('badge');
  badgeSpan = badgeDiv.appendChild(document.createElement('span'));
  badgeSpan.classList.add('tooltiptext')
  badgeSpan.appendChild(document.createTextNode('OG Badge\n(Before Feb 2022)'))
  if(containsAny(name.toLowerCase(), BUMBadges)){
    badgeDiv = userA.appendChild(document.createElement('div'));
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
  badgeDiv = userA.appendChild(document.createElement('div'));
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
  badgeDiv = userA.appendChild(document.createElement('div'));
  badgeDiv.classList.add('tooltip');
  badge = badgeDiv.appendChild(document.createElement('img'));
  badge.src = "./images/badges/designer.svg";
  badge.title = 'Designer Badge'
  badge.classList.add('badge');
  badgeSpan = badgeDiv.appendChild(document.createElement('span'));
  badgeSpan.classList.add('tooltiptext')
  badgeSpan.appendChild(document.createTextNode('Designed the HTML Layout'))
} else if(name.includes('DS User: ')){
   badgeDiv = userA.appendChild(document.createElement('div'));
  badgeDiv.classList.add('tooltip');
  badge = badgeDiv.appendChild(document.createElement('img'));
  badge.src = "./images/badges/ds.png";
  badge.title = 'DS User'
  badge.classList.add('badge');
  badgeSpan = badgeDiv.appendChild(document.createElement('span'));
  badgeSpan.classList.add('tooltiptext');
  badgeSpan.appendChild(document.createTextNode('DS User'));
}
}

function createMessageElement(text, member) {
const time = new Date();
let ampm;
let minPre = '';
mins = time.getMinutes();
hours = time.getHours() % 12 || 12;
if(mins<10){minPre='0';}
if(time.getHours()<12){ampm='AM';}else{ampm='PM';} 
const msgDiv = document.getElementById('messageholder').appendChild(document.createElement('div'));
const userA = msgDiv.appendChild(document.createElement('a'));
msgDiv.appendChild(document.createElement('br'));
const msgA = msgDiv.appendChild(document.createElement('a'));
checkBadges(member.clientData.name, userA);
userA.classList.add('username');
userA.style = `color: ${member.clientData.color}`;
userA.appendChild(document.createTextNode(member.clientData.name));
const timeP = userA.appendChild(document.createElement('p'));
timeP.appendChild(document.createTextNode(`ㅤToday at ${hours}:${minPre}${mins} ${ampm}.`))
timeP.classList.add('time');
if(member.clientData.name == fixedname){
    msgDiv.classList.add('ownMessage');
}else{
    msgDiv.classList.add('otherMessage');
}
msgA.classList.add('msg');  
msgA.appendChild(document.createTextNode("> " + emojis(text)));
twemojiParser();
}

function createURLMessageElement(text, member) {
const msgDiv = document.getElementById('messageholder').appendChild(document.createElement('div'));
const userA = msgDiv.appendChild(document.createElement('a'));
msgDiv.appendChild(document.createElement('br'));
const msgA = msgDiv.appendChild(document.createElement('a'));
userA.classList.add('username');
userA.style = `color: ${member.clientData.color}`;
userA.appendChild(document.createTextNode(member.clientData.name));
msgA.classList.add('msg');
msgA.href = text;
msgA.style = "color: #2B87D3";
msgA.appendChild(document.createTextNode(text));
}

function createImageMessageElement(text, member) {
const msgDiv = document.getElementById('messageholder').appendChild(document.createElement('div'));
const userA = msgDiv.appendChild(document.createElement('a'));
msgDiv.appendChild(document.createElement('br'));
const msgA = msgDiv.appendChild(document.createElement('img'));
userA.classList.add('username');
userA.style = `color: ${member.clientData.color}`;
userA.appendChild(document.createTextNode(member.clientData.name));
console.log(text);
msgA.style.height = '100px';
msgA.src = text;
}

function createEmbed(member, title, description, footer){
  console.log(`Member: ${member.clientData.name}, Title: ${title}, Description: ${description}, Footer: ${footer}.`)
}

function uploadMessage(message) {
if(message.length > 1966){
  message.slice(0, 1965)
}
drone.publish({
  room: 'observable-room',
  message: message,
});
document.cookie = "messages=" + messageCounter;
}