import { writable } from 'svelte/store';
import { get } from 'svelte/store';

// https://stackoverflow.com/a/33486055
export const MD5 = function(d){let result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

// room

export const rooms = writable([]);

export function roomList(email) {
  let db = firebase.firestore();

  return db.collection("rooms").where("members", "array-contains", email)
    .get()
    .then(function(querySnapshot) {
        let _rooms = [];
        querySnapshot.forEach(function(roomRef) {
          let room = roomRef.data();
          room.id = roomRef.id;
          _rooms = [..._rooms, room];
        });
        rooms.set(_rooms);

        return _rooms;
    })
    .catch(function(error) {
        console.log("Error getting rooms: ", error);
    });
}

export function addRoom(name, owner, members) {
  let db = firebase.firestore();

  let uniq_members = Array.from(new Set(members.concat(owner)));

  let room = {
    name: name, 
    owner: owner,
    members: uniq_members
  };
  
  return db.collection("rooms").add(room)
  .then(function(docRef) {
    return docRef.get();
  })
  .then(function(docRef) {
    let added = docRef.data();
    added.id = docRef.id;

    console.log("A room written with ID: ", added.id);

    // 登録したroomをUIに追加(Svelte)
    rooms.update(list => list.concat(added));

    return added;
  });
}

export function editRoomName(roomId, name) {
  let _rooms = get(rooms);
  const idx = _rooms.findIndex(r => r.id === roomId);

  _rooms[idx].name = name;
  rooms.update(list => {
    list[idx].name = name;
    return list;
  });
}

export function getRoom(roomId) {
  let _rooms = get(rooms);
  return _rooms.find(r => r.id === roomId);
}


// message

export const messages = writable([]);
let messageHistories = {};

export function getMessages(roomId) {
  let roomMessages = messages[roomId];
  if (!roomMessages) {
    roomMessages = writable([]);
    messages[roomId] = roomMessages;
  }
  return roomMessages;
}

function newMessage(messageId, user, text) {
  return {id: messageId, userId: user.id, userName: user.name, text: text, timestamp: new Date()};
}

export function addMessage(room, user, text) {
  console.log('adding message', room, user, text);
  
  let db = firebase.firestore();

  let message = {
    from: user.email,
    text: text,
    members: room.members,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  return db.collection("rooms").doc(room.id).collection("messages").add(message)
  .then(function(docRef) {
    return docRef.get();
  })
  .then(function(docRef) {
    let added = docRef.data();
    added.id = docRef.id;
    
    console.log("A message written with ID: ", added.id);

    // 登録したmessageをUIに追加(Svelte)
    getMessages(room.id).update(list => list.concat(added));

    return added;
  });
}

export function editMessage(roomId, user, messageId, text) {
  let _messages = get(messages);

  const message = newMessage(messageId, user, text);

  messageHistories[messageId] = [...getMessageHistories(messageId), message];

  const idx = _messages[roomId].findIndex(m => m.id === messageId);
  _messages[roomId][idx] = message;

  getMessages(roomId).update(list => {
    list[idx] = message;
    return list;
  });
}

export function deleteMessage(messageId) {
  let _messages = get(messages);

  const idx = _messages.findIndex(m => m.id === messageId);
  _messages[roomId][idx].deleted = true;

  getMessages(roomId).update(list => {
    list[idx].deleted = true;
    return list;
  });
}

export function getMessageHistories(messageId) {
  return messageHistories[messageId] || [];
}

export function searchMessages(roomId, text) {
  let _messages = get(messages);
  return (_messages[roomId] || []).filter(message => message.text.includes(text));
}

// user account

export const currentUser = writable(null);

export function signIn(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(userCredential) {
    let user = userCredential.user;

    if (!user.emailVerified) {
      const actionCodeSettings = {
        url: window.location.origin + `/`
      };
      return user.sendEmailVerification(actionCodeSettings).then(function() {
        window.alert('確認メールを送信しました。メール内のURLからサインインしなおしてください。');
      });
    }

    const _currentUser = {id: user.uid, email: user.email, name: user.email};
    currentUser.set(_currentUser);

    roomList(_currentUser.email);
  })
  .catch(function(error) {
    // とりあえず手抜きでalert
    window.alert('sign-in failed. ' + error.code + ':' + error.message);
  });
}

export function signUp(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(userCredential) {
    let user = userCredential.user;
    console.log(user)

    const actionCodeSettings = {
      url: window.location.origin + `/`
    };
    return user.sendEmailVerification(actionCodeSettings);
  })
  .then(function() {
    window.alert('確認メールを送信しました。メール内のURLからサインインしなおしてください。');
  })
  .catch(function(error) {
    // とりあえず手抜きでalert
    window.alert('sign-in failed. ' + error.code + ':' + error.message);
  });
}

export function signOut() {
  firebase.auth().signOut().then(function() {
    currentUser.set(null);
    rooms.set(null);
    messages.set(null);
  }).catch(function(error) {
    window.alert('sign-out failed. ' + error.code + ':' + error.message);
  });
}
