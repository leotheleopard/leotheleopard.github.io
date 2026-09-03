import { useState, useRef } from "react";
import { Trophy, Send, RotateCcw } from "lucide-react";

const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSdP1SqwT_LZkaZEC4wekmADkqsQTwuGgPCVzoh1elGLeNWS2g/formResponse";

const FIELDS = [
  { id: "goty", label: "Game Of The Year", entry: "entry.1600279626", placeholder: "Your pick for game of the year" },
  { id: "dlc", label: "DLC Of The Year", entry: "entry.222006332", placeholder: "Your pick for DLC of the year" },
  { id: "soundtrack", label: "Best Game Soundtrack", entry: "entry.405372087", placeholder: "The one still stuck in your head" },
  { id: "replayed", label: "Game You Replayed... Again.", entry: "entry.1628886905", placeholder: "The one you went back to" },
  { id: "cant-stop", label: "Game You Can't Stop Playing", entry: "entry.569795080", placeholder: "Still installed, still open" },
  { id: "upcoming", label: "Best Upcoming", entry: "entry.2120554982", placeholder: "Not out yet, already hyped" },
  { id: "multiplayer", label: "Best Multiplayer", entry: "entry.1987240120", placeholder: "Better with other people" },
  { id: "hidden-gem", label: "Best Hidden Gem", entry: "entry.1520204588", placeholder: "The one you keep recommending" },
];

export default function App() {
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | done
  const formRef = useRef(null);

  const filledCount = FIELDS.filter((f) => (answers[f.id] || "").trim()).length;

  const handleChange = (id, value) => {
    setAnswers((a) => ({ ...a, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filledCount === 0) return;
    setStatus("submitting");
    // Real browser-level POST to Google's endpoint, targeted at a hidden
    // iframe so the page never navigates away. Google's response can't be
    // read cross-origin, so we optimistically confirm after a short delay.
    formRef.current.submit();
    setTimeout(() => setStatus("done"), 900);
  };

  const startOver = () => {
    setAnswers({});
    setStatus("idle");
  };

  return (
    <div className="ccga-root">
      <style>{baseStyles}</style>
      <iframe name="hidden_iframe" title="hidden" style={{ display: "none" }} />

      <header className="hero">
        <h1 className="marquee">
          Confused Collective
          <br />
          Game Awards
        </h1>
        <p className="hero-sub">Cast your ballot. Skip anything you're not sure about.</p>
      </header>

      {status === "done" ? (
        <section className="done-panel">
          <Trophy size={30} color="var(--gold)" />
          <h2>Ballot submitted</h2>
          <p>Thanks for voting — your picks are in.</p>
          <button className="add-btn" onClick={startOver}>
            <RotateCcw size={15} />
            Submit another ballot
          </button>
        </section>
      ) : (
        <form
          ref={formRef}
          action={FORM_ACTION}
          method="POST"
          target="hidden_iframe"
          onSubmit={handleSubmit}
          className="ballot"
        >
          {FIELDS.map((f) => (
            <div className="field" key={f.id}>
              <label htmlFor={f.id}>{f.label}</label>
              <input
                id={f.id}
                name={f.entry}
                type="text"
                placeholder={f.placeholder}
                value={answers[f.id] || ""}
                onChange={(e) => handleChange(f.id, e.target.value)}
              />
            </div>
          ))}

          <div className="submit-row">
            <span className="progress">{filledCount} of {FIELDS.length} answered</span>
            <button type="submit" className="submit-btn" disabled={status === "submitting"}>
              <Send size={15} />
              {status === "submitting" ? "Submitting..." : "Submit ballot"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

const baseStyles = `
@import url('https://fonts.googleapis.com/css2?family=Bungee&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
  --bg: #14112B;
  --panel: #1E1A40;
  --panel-2: #241F49;
  --text: #F5F2FF;
  --muted: #B4ADD9;
  --magenta: #FF3EA5;
  --cyan: #45E8D6;
  --gold: #FFC93C;
  --line: rgba(245,242,255,0.12);
}

.ccga-root {
  background: var(--bg);
  color: var(--text);
  font-family: 'Space Grotesk', sans-serif;
  padding: 32px 20px 48px;
  border-radius: 16px;
  max-width: 640px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 12px 8px 24px;
}

.marquee {
  font-family: 'Bungee', system-ui, sans-serif;
  font-size: clamp(26px, 6vw, 40px);
  line-height: 1.15;
  margin: 0;
  transform: skewX(-3deg);
  background: linear-gradient(90deg, var(--cyan), var(--magenta));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-sub {
  color: var(--muted);
  margin: 14px 0 0;
  font-size: 14px;
}

.ballot {
  background: var(--panel);
  border-radius: 12px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 13.5px;
  font-weight: 600;
}

.field input {
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 10px 12px;
  color: var(--text);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
}

.field input:focus {
  outline: 2px solid var(--cyan);
  outline-offset: 1px;
}

.submit-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 6px;
  flex-wrap: wrap;
}

.progress {
  color: var(--muted);
  font-size: 12.5px;
}

.submit-btn {
  background: var(--magenta);
  color: #14112B;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.submit-btn:hover:not(:disabled) {
  filter: brightness(1.08);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.done-panel {
  background: var(--panel);
  border-radius: 12px;
  padding: 40px 22px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.done-panel h2 {
  font-family: 'Bungee', system-ui, sans-serif;
  font-size: 18px;
  margin: 6px 0 0;
  font-weight: normal;
}

.done-panel p {
  color: var(--muted);
  font-size: 14px;
  margin: 0 0 14px;
}

.add-btn {
  background: var(--cyan);
  color: #14112B;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
`;
