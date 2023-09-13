import { useQuery, useMutation } from "convex/react";

import { api } from "../convex/_generated/api";

import { useEffect, useState } from "react";

/* Faker para data */
import { faker } from "@faker-js/faker";

// For demo purposes. In a real app, you'd have real user data.
const NAME = faker.person.firstName();

export default function App() {
  const stats = useQuery(api.stats.list);
  // const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.stats.send);

  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    // Make sure scrollTo works on button click in Chrome
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [stats]);

  return (
    <main className="chat">
      <header>
        <h1>Convex Chat</h1>
        <p>
          Connected as <strong>{NAME}</strong>
        </p>
      </header>
      {stats?.map((stats) => (
        <article
          key={stats._id}
          className={stats.author === NAME ? "message-mine" : ""}
        >
          <div>{stats.author}</div>

          <p>{stats.body}</p>
        </article>
      ))}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await sendMessage({ body: newMessageText, author: NAME });
          setNewMessageText("");
        }}
      >
        <input
          value={newMessageText}
          onChange={async (e) => {
            const text = e.target.value;
            setNewMessageText(text);
          }}
          placeholder="Write a message…"
        />
        <button type="submit" disabled={!newMessageText}>
          Send
        </button>
      </form>
    </main>
  );
}
