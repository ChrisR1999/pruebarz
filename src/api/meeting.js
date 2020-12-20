import { SIGNATURE_ENDPOINT } from "./config";

export function getSignature(meetConfig) {
  console.log("aiuda no se que esta pasando", meetConfig);
  return fetch(`${SIGNATURE_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ meetData: meetConfig }),
  })
    .then((result) => {
      console.log("result", result);
      return result.json();
    })
    .then((signature) => {
      return {
        signature: signature.signature,
        error: null,
      };
    })
    .catch((error) => {
      console.log("Error", error);
      return {
        signature: null,
        error: "Algo salio mal",
      };
    });
}
