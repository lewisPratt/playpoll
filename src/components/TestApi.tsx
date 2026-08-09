import { useEffect } from "react";

function TestApi() {
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://lmzsnthuaysxrqgygfwm.supabase.co/functions/v1/quick-api`,
        {
          method: "POST",
          body: JSON.stringify({
            searchTerm: "hunt showdown",
          }),
          headers: {
            Authorization: `Bearer ${publishableKey}`,
            accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      if (data.error) {
        console.log("error");
        //setErrorMsg(data.error.error);
        console.log(data);
      } else {
        //successful api call
        console.log(data);
      }
    };

    fetchData();
  }, []);

  return <p>test</p>;
}

export default TestApi;
