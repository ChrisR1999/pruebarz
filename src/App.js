// import logo from './logo.svg';
import "./App.css";

import { ZoomMtg } from "@zoomus/websdk";
import { getSignature } from "./api/meeting";

// Uncomment this line if you are Building for Relative Paths (example: http://mywebsite.com/relativepath") and have set the "homepage" value in package.json - More info here: https://create-react-app.dev/docs/deployment/#building-for-relative-paths
// ZoomMtg.setZoomJSLib(
//   process.env.PUBLIC_URL + "/node_modules/@zoomus/websdk/dist/lib",
//   "/av"
// );

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

function App() {
  const abort = "http://192.168.1.73:3000";
  const id = "2491074726";
  const pass = "1dyfY4";

  const hostMeetConfig = {
    apiKey: "7cadI_4dRyqUlf2dy3zzrQ",
    meetingNumber: id,
    leaveUrl: abort,
    userName: "Host",
    userEmail: "PITO@GMAIL.COM",
    passWord: pass,
    role: 1,
  };

  async function hostSetMeeting(e) {
    const signature = await getSignature(hostMeetConfig);
    if (!signature.error) {
      hostMeetConfig.signature = signature.signature;
      joinMeetingAsHost();
    }
  }

  function joinMeetingAsHost() {
    const {
      signature,
      meetingNumber,
      userName,
      apiKey,
      userEmail,
      passWord,
      leaveUrl,
    } = hostMeetConfig;

    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  const attendantMeetConfig = {
    apiKey: "7cadI_4dRyqUlf2dy3zzrQ",
    meetingNumber: id,
    leaveUrl: abort,
    userName: "Attendant",
    userEmail: "prueba.react@yoursite.com",
    passWord: pass,
    role: 0,
  };

  async function attendantSetMeeting(e) {
    const signature = await getSignature(attendantMeetConfig);
    if (!signature.error) {
      attendantMeetConfig.signature = signature.signature;
      joinMeetingAsAttendant();
    }
  }

  function joinMeetingAsAttendant() {
    const {
      signature,
      meetingNumber,
      userName,
      apiKey,
      userEmail,
      passWord,
      leaveUrl,
    } = attendantMeetConfig;
    document.getElementById("zmmtg-root").style.display = "block";
    ZoomMtg.init({
      debug: true,
      leaveUrl: leaveUrl,
      showMeetingHeader: true,
      disableInvite: true,
      disableCallOut: true,
      disableRecord: true,
      disableJoinAudio: false,
      disableReport: true,
      audioPanelAlwaysOpen: true,
      showPureSharingContent: false,
      isSupportAV: true,
      isSupportChat: true,
      isSupportQA: true,
      isSupportCC: true,
      isLockBottom: true,
      screenShare: true,
      rwcBackup: "",
      videoDrag: true,
      sharingMode: "both",
      videoHeader: false,
      // optional,
      isSupportNonverbal: true, // optional,
      isShowJoiningErrorDialog: true, // optional
      meetingInfo: [],
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom WebSDK Sample React</h1>
        <button onClick={hostSetMeeting} style={{ backgroundColor: "purple" }}>
          Join Meeting as host
        </button>
        <button
          onClick={attendantSetMeeting}
          style={{ backgroundColor: "red" }}
        >
          Join Meeting as attendant
        </button>
      </main>
    </div>
  );
}

export default App;
