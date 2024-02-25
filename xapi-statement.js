var courseSeconds = 0;
var slideSeconds = 0;

var isCourseTimerActive = false;
var isSlideTimerActive = false;

window.setInterval(() => {
  if (isCourseTimerActive === true) {
    courseSeconds += 1;
  }
  if (isSlideTimerActive === true) {
    slideSeconds += 1;
  }
}, 1000);

const manageTimer = {
  course: {
    start: () => {
      isCourseTimerActive = true;
    },
    stop: () => {
      isCourseTimerActive = false;
    },
    reset: () => {
      courseSeconds = 0;
    },
  },
  slide: {
    start: () => {
      isSlideTimerActive = true;
    },
    stop: () => {
      isSlideTimerActive = false;
    },
    reset: () => {
      slideSeconds = 0;
    },
  },
};

function sendStatement() {
  const conf = {
    endpoint: "https://lmstest.lrs.io/xapi/",
    auth: "Basic " + toBase64("sebwel:kofzuk"),
  };

  ADL.XAPIWrapper.changeConfig(conf);

  timer = "course";
  let finalDuration;
  if (timer == "course") {
    finalDuration = convertToIso(courseSeconds);
  } else if (timer == "slide") {
    finalDuration = convertToIso(slideSeconds);
  } else {
    finalDuration = null;
  }

  const statement = {
    actor: {
      name: "tharaka",
      mbox: "mailto:kasun@g.com",
    },
    verb: {
      id: "http://adlnet.gov/expapi/verbs/completed",
      display: { "en-us": "completed" },
    },
    object: {
      id: "https://devlinpeck.com/tutorials/write-xapi-statement",
      definition: {
        name: { "en-us": "write xapi Statement tutorial" },
      },
    },
    result: {
      duration: finalDuration,
    },
    // "result":{
    //     "response":"my response",
    //     "score":{
    //         "min":0,
    //         "max":2,
    //         "raw":0,
    //         "scaled":0
    //     }
    // }
  };

  const result = ADL.XAPIWrapper.sendStatement(statement);

  function convertToIso(secondsVar) {
    let seconds = secondsVar;
    if (seconds > 60) {
      if (seconds > 3600) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        seconds = (seconds % 3600) % 60;
        return `PT${hours}H${minutes}M${seconds}S`;
      } else {
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;
        return `PT${minutes}M${seconds}S`;
      }
    } else {
      return `PT${seconds}S`;
    }
  }
}

//new code without wrapper
// function sendStatement()
// {

//     const auth = "Basic " + btoa("shakila.jayarathna73@gmail.com:shakila1988$$$$")

//     const statement={
//         "actor":{
//             "name": "shakila",
//             "mbox": "mailto:shakil@g.com"
//         },
//         "verb": {
//             "id": "http://adlnet.gov/expapi/verbs/completed",
//             "display": {"en-us":"completed"}
//         },
//         "object":{
//             "id":"https://devlinpeck.com/tutorials/write-xapi-statement",
//             "definition" : {
//                 "name": {"en-us":"write xapi Statement tutorial"}
//             }
//         }

//     }

// 	fetch("https://cloud.scorm.com/lrs/PH1H24K5YY/statements", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 				"Authorization": auth,
// 				"X-Experience-API-Version": "1.0.0"
// 					 },
// 			body: JSON.stringify(statement)
// 	}).catch(error => console.error(error.message))
// }
