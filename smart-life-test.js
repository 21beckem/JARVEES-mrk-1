// const TUYACLOUDURL = "https://px1.tuyaus.com";

// const authResponse = await fetch(
//   `https://px1.tuyaus.com/homeassistant/auth.do`,
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: new URLSearchParams({
//       userName: '',
//       password: '',
//       countryCode: '1',
//       bizType: 'smart_life',
//       from: 'tuya'
//     })
//   }
// );

// const authResult = await authResponse.json();
// console.log(authResult);

const authResponse = {
  access_token: '',
  refresh_token: '',
  token_type: 'bearer',
  expires_in: 0
};

console.log("Getting devices");

const data = {
    header: {
        name: "Discovery",
        namespace: "discovery",
        payloadVersion: 1
    },
    payload: {
        accessToken: authResponse.access_token
    } 
};

const response = await fetch('https://px1.tuyaus.com/homeassistant/skill', {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
});

console.log("Got devices");

const discovery_response = await response.json();

console.log(discovery_response);


{"payload":{"devices":[{"data":{"online":true,"state":false},"name":"Plug-1","icon":"https://images.tuyaus.com/smart/icon/ay1544008322541hl9iQ/1717725460aa77b94a9ed.png","id":"ebd92842096114a06a0pgr","dev_type":"switch","ha_type":"switch"},{"data":{"online":true,"state":false},"name":"Plug-4","icon":"https://images.tuyaus.com/smart/icon/ay1544008322541hl9iQ/1717725460aa77b94a9ed.png","id":"eb599b9f0d59289bd1mx7a","dev_type":"switch","ha_type":"switch"},{"data":{"online":true,"state":false},"name":"Plug-2","icon":"https://images.tuyaus.com/smart/icon/ay1544008322541hl9iQ/1717725460aa77b94a9ed.png","id":"eb1f6295ac0e8bf9a3uc1z","dev_type":"switch","ha_type":"switch"},{"data":{"online":true,"state":false},"name":"Plug-3","icon":"https://images.tuyaus.com/smart/icon/ay1544008322541hl9iQ/1717725460aa77b94a9ed.png","id":"eb61d30c1738fa0790cb8d","dev_type":"switch","ha_type":"switch"}],"scenes":[]},"header":{"code":"SUCCESS","payloadVersion":1}}