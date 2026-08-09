import { useEffect } from "react";

function TestApi() {
  const clientId = import.meta.env.VITE_API_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_API_SECRET_KEY;

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await fetch(
  //         `https://api.torn.com/v2/faction/rankedwars?offset=0&limit=20&sort=DESC`,
  //         {
  //           headers: {
  //             Authorization: `ApiKey ${apiKey}`,
  //             accept: "application/json",
  //           },
  //         },
  //       );
  //       const data = await response.json();
  //       if (data.error) {
  //         console.log("error");
  //         //setErrorMsg(data.error.error);
  //         console.log(data);
  //       } else {
  //         //successful api call
  //       }
  //     };

  //     fetchData();
  //   }, []);

  return <p>test</p>;
}

export default TestApi;
