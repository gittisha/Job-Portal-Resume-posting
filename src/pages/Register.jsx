import React, { useState, useEffect, useRef } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// AccessTerminalRegister
// Matches the edited AccessTerminalLogin styling (transparent
// panel, maroon-to-black gradient backdrop, centered red title).
// Wire handleSubmit to your Spring Boot register endpoint.
// ─────────────────────────────────────────────────────────────

const LOG_LINES = [
  "VALIDATING IDENTIFIER...",
  "GENERATING KEYPAIR...",
  "PROVISIONING NODE...",
  "ROUTING >> AUTH.GATEWAY",
];

export default function AccessTerminalRegister({ onRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle");
  const [logIndex, setLogIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    if (status !== "authenticating") return;
    setLogIndex(0);
    const id = setInterval(() => {
      setLogIndex((i) => (i < LOG_LINES.length - 1 ? i + 1 : i));
    }, 380);
    return () => clearInterval(id);
  }, [status]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !email || !password || !confirm) {
      setStatus("error");
      setErrorMsg("MISSING FIELDS");
      return;
    }
    if (password !== confirm) {
      setStatus("error");
      setErrorMsg("PASSKEYS DO NOT MATCH");
      return;
    }
    if (password.length < 8) {
      setStatus("error");
      setErrorMsg("PASSKEY TOO SHORT // MIN 8 CHARS");
      return;
    }

    setStatus("authenticating");
    setErrorMsg("");
    try {
      // ── Replace with your Spring Boot endpoint ──────────────
      // const res = await fetch("http://localhost:8080/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ username, email, password }),
      // });
      // if (!res.ok) throw new Error("Registration failed");
      // const data = await res.json();
      // onRegister?.(data);

      await new Promise((resolve) => (timerRef.current = setTimeout(resolve, 1800)));
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("REGISTRATION FAILED // TRY AGAIN");
    }
  }

  return (
    <div style={styles.page}>
      <style>{css}</style>

      <div className="at-noise" aria-hidden="true" />
      <div className="at-redbar" aria-hidden="true">
        <div className="at-redbar-streaks" />
      </div>
      <p className="at-tag at-tag-tl">SYS::0x44A2 &nbsp;3.0091412</p>
      <p className="at-tag at-tag-tr">ACCESS.TERMINAL // v2.31</p>

      <div style={styles.center}>
        <div className="at-index at-index-tl">1</div>
        <div className="at-index at-index-tr">3</div>

        <div className="at-panel">
          <header className="at-header">
            <p className="at-eyebrow">NEW NODE PROVISIONING</p>
            <h1 className="at-title">REGISTER&nbsp;NODE</h1>
            <div className="at-hr" />
          </header>

          <form onSubmit={handleSubmit} noValidate>
            <div className={`at-row ${username ? "at-row-active" : ""}`}>
              <span className="at-row-icon"><User size={15} /></span>
              <div className="at-row-body">
                <label className="at-row-label" htmlFor="at-user">IDENTIFIER</label>
                <input
                  id="at-user"
                  className="at-row-input"
                  type="text"
                  autoComplete="username"
                  placeholder="operator.handle"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={status === "authenticating"}
                />
              </div>
            </div>

            <div className={`at-row ${email ? "at-row-active" : ""}`}>
              <span className="at-row-icon"><Mail size={15} /></span>
              <div className="at-row-body">
                <label className="at-row-label" htmlFor="at-email">CONTACT NODE</label>
                <input
                  id="at-email"
                  className="at-row-input"
                  type="email"
                  autoComplete="email"
                  placeholder="operator@netwatch.net"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "authenticating"}
                />
              </div>
            </div>

            <div className={`at-row ${password ? "at-row-active" : ""}`}>
              <span className="at-row-icon"><Lock size={15} /></span>
              <div className="at-row-body">
                <label className="at-row-label" htmlFor="at-pass">PASSKEY</label>
                <input
                  id="at-pass"
                  className="at-row-input"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={status === "authenticating"}
                />
              </div>
              <button
                type="button"
                className="at-row-eye"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide passkey" : "Show passkey"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            <div className={`at-row ${confirm ? "at-row-active" : ""}`}>
              <span className="at-row-icon"><Lock size={15} /></span>
              <div className="at-row-body">
                <label className="at-row-label" htmlFor="at-confirm">CONFIRM PASSKEY</label>
                <input
                  id="at-confirm"
                  className="at-row-input"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="re-enter passkey"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  disabled={status === "authenticating"}
                />
              </div>
            </div>

            <div className="at-hr at-hr-thin" />

            <button
              type="submit"
              className={`at-connect ${status === "authenticating" ? "at-connect-busy" : ""}`}
              disabled={status === "authenticating"}
            >
              <span className="at-connect-key">↵</span>
              <span>{status === "authenticating" ? "PROVISIONING" : "CREATE NODE"}</span>
            </button>

            <div className="at-console" role="status" aria-live="polite">
              {status === "authenticating" &&
                LOG_LINES.slice(0, logIndex + 1).map((line, i) => (
                  <p key={i} className="at-console-line">{line}</p>
                ))}
              {status === "error" && (
                <p className="at-console-line at-console-error">{errorMsg}</p>
              )}
              {status === "success" && (
                <p className="at-console-line at-console-ok">NODE PROVISIONED</p>
              )}
            </div>
          </form>

          <div className="at-footer-row">
            <span>ALREADY REGISTERED?</span>
            <a href="#login" className="at-link">RETURN TO LOGIN</a>
          </div>
        </div>

        <div className="at-keyhints">
          <span><span className="at-key">TAB</span>Next field</span>
          <span><span className="at-key">↵</span>Confirm</span>
          <span><span className="at-key">ESC</span>Cancel</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(to bottom, #4a1a22 0%, #39161c 11%, #251118 22%, #150c14 33%, #0a0712 44%, #070712 50%, #080610 56%, #080710 67%, #080911 78%, #0d0c14 89%, #0c0d16 94%, #0d0d15 100%)",
    overflow: "hidden",
    fontFamily: "'Rajdhani', sans-serif",
  },
  center: {
    position: "relative",
    zIndex: 2,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Chakra+Petch:wght@400;500&display=swap');

.at-noise {
  position: absolute; inset: 0; z-index: 0;
  background: linear-gradient(to bottom, #4a1a22 0%, #39161c 11%, #251118 22%, #150c14 33%, #0a0712 44%, #070712 50%, #080610 56%, #080710 67%, #080911 78%, #0d0c14 89%, #0c0d16 94%, #0d0d15 100%);
}
.at-redbar {
  position: absolute; top: 0; left: 0; bottom: 0; width: 6px; z-index: 1;
  background: linear-gradient(180deg, rgba(255,40,40,0.7), rgba(120,10,10,0.5));
  overflow: hidden;
}
.at-redbar-streaks {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(180deg, rgba(255,255,255,0.15) 0px, transparent 2px, transparent 14px, rgba(255,255,255,0.08) 16px);
  animation: at-streak 3.5s linear infinite;
}
@keyframes at-streak { 0% { transform: translateY(-30%); } 100% { transform: translateY(30%); } }

.at-tag {
  position: absolute; z-index: 2; margin: 0;
  font-family: 'Chakra Petch', monospace;
  font-size: 10px; letter-spacing: 1px;
  color: rgba(255,90,90,0.55);
}
.at-tag-tl { top: 14px; left: 20px; }
.at-tag-tr { top: 14px; right: 20px; color: rgba(0,220,235,0.5); }

.at-index {
  position: absolute;
  width: 22px; height: 22px;
  border: 1px solid rgba(0,220,235,0.5);
  color: #00dceb;
  font-family: 'Chakra Petch', monospace;
  font-size: 12px;
  display: flex; align-items: center; justify-content: center;
  top: 8px;
}
.at-index-tl { left: 8px; }
.at-index-tr { right: 8px; }

.at-panel {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: transparent;
  border: none;
  clip-path: none;
  padding: 30px 30px 22px;
  backdrop-filter: none;
}

.at-header { margin-bottom: 18px; }
.at-eyebrow {
  margin: 0 0 6px;
  font-family: 'Chakra Petch', monospace;
  font-size: 10px; letter-spacing: 3px;
  color: #ff5a5a;
  text-align: center;
}
.at-title {
  margin: 0;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 30px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ff5a5a;
  text-align: center;
}
.at-hr {
  margin-top: 14px;
  height: 1px;
  background: linear-gradient(90deg, rgba(0,220,235,0.7), rgba(255,60,60,0.5) 40%, transparent);
}
.at-hr-thin { margin: 18px 0 16px; opacity: 0.6; }

.at-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  margin-top: 10px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,80,80,0.25);
  clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px);
  transition: border-color 0.15s, background 0.15s;
}
.at-row:focus-within, .at-row-active {
  border-color: #00dceb;
  background: rgba(0,220,235,0.05);
}
.at-row-icon { color: #ff5a5a; flex-shrink: 0; }
.at-row:focus-within .at-row-icon, .at-row-active .at-row-icon { color: #00dceb; }
.at-row-body { flex: 1; display: flex; flex-direction: column; }
.at-row-label {
  font-family: 'Chakra Petch', monospace;
  font-size: 9px; letter-spacing: 2px;
  color: rgba(255,255,255,0.4);
}
.at-row-input {
  background: transparent; border: none; outline: none;
  color: #f2f2f2;
  font-family: 'Chakra Petch', monospace;
  font-size: 14px;
  padding: 2px 0 0;
}
.at-row-input::placeholder { color: rgba(255,255,255,0.25); }
.at-row-input:disabled { opacity: 0.5; }
.at-row-eye { background: transparent; border: none; color: rgba(255,255,255,0.45); cursor: pointer; display: flex; }
.at-row-eye:hover { color: #00dceb; }

.at-connect {
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  margin-top: 4px;
  padding: 12px;
  background: rgba(0,220,235,0.08);
  border: 1px solid #00dceb;
  clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px);
  color: #d8fbff;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 3px;
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s;
}
.at-connect:hover:not(:disabled) { background: rgba(0,220,235,0.16); box-shadow: 0 0 16px rgba(0,220,235,0.25); }
.at-connect:disabled { opacity: 0.7; cursor: default; }
.at-connect-key {
  border: 1px solid rgba(216,251,255,0.6);
  width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px;
}
.at-connect-busy .at-connect-key { animation: at-pulse 0.9s ease-in-out infinite; }
@keyframes at-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

.at-console { margin-top: 12px; min-height: 16px; }
.at-console-line {
  margin: 3px 0;
  font-family: 'Chakra Petch', monospace;
  font-size: 11px; letter-spacing: 1px;
  color: #00dceb;
}
.at-console-error { color: #ff5a5a; }
.at-console-ok { color: #6dffb0; }

.at-footer-row {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid rgba(255,255,255,0.08);
  display: flex; justify-content: center; gap: 8px;
  font-family: 'Chakra Petch', monospace;
  font-size: 11px; letter-spacing: 1px;
  color: rgba(255,255,255,0.4);
}
.at-link { color: #ff5a5a; text-decoration: none; }
.at-link:hover { color: #00dceb; }

.at-keyhints {
  margin-top: 20px;
  display: flex; gap: 22px;
  font-family: 'Chakra Petch', monospace;
  font-size: 11px;
  color: rgba(255,255,255,0.35);
}
.at-keyhints .at-key {
  display: inline-block;
  border: 1px solid rgba(0,220,235,0.5);
  color: #00dceb;
  font-size: 10px;
  padding: 1px 5px;
  margin-right: 6px;
}

@media (max-width: 480px) {
  .at-tag, .at-index, .at-keyhints { display: none; }
}
`;
