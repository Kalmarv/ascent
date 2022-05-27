import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { lastFmData } from "../types";

const User = () => {
  const router = useRouter();
  const { user } = router.query;
  const [lastFmData, setLastFmData] = useState<null | lastFmData>();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/lastfm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
        }),
      });
      const data = await response.json();
      setLastFmData(data);
    };

    getData();
  }, [user]);

  return (
    <>
      {lastFmData ? (
        Object.keys(lastFmData).map((key, index) => {
          return (
            <div key={index}>
              <p>{lastFmData[key as keyof lastFmData]}</p>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
      <p>User: {user}</p>
    </>
  );
};

export default User;
