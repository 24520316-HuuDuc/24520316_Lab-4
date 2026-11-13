
import { useState, useEffect } from "react";

export function useForumMessages(channelId) {
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMessages() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/channels/${channelId}/messages`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch forum messages");
        }

        const data = await response.json();

        setMsgs(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
          setError(err.message);
          setMsgs([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchMessages();

    return () => {
      controller.abort();
    };
  }, [channelId]);

  return {
    msgs,
    loading,
    error,
  };
}
