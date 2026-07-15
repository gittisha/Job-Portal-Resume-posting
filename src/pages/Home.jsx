import React, { useState, useEffect } from "react";
import { LogOut, Signal, ShieldCheck, Activity, Clock } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// AccessTerminalHome
// Post-login landing page, same visual system as Login/Register.
// Pass the logged-in username and an onLogout handler in.
// ─────────────────────────────────────────────────────────────

export default function AccessTerminalHome({ username = "operator.handle", onLogout }) {
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = clock.toLocaleTimeString("en-US", { hour12: false });
  const dateStr = clock.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });

  return (
    <div style={styles.page}>
      <style>{css}</style>

      <div className="at-noise" aria-hidden="true" />
      <div className="at-redbar" aria-hidden="true">
        <div className="at-redbar-streaks" />
      </div>
      <p className="at-tag at-tag-tl">SYS::0x44A2 &nbsp;3.0091412</p>
      <p className="at-tag at-tag-tr">ACCESS.TERMINAL // v2.31</p>

      <div style={styles.wrap}>
        {/* Nav */}
        <nav className="at-nav">
          <span className="at-nav-brand">ACCESS&nbsp;TERMINAL</span>
          <div className="at-nav-right">
            <span className="at-nav-user">
              <Signal size={13} />
              OPERATOR: <strong>{username.toUpperCase()}</strong>
            </span>
            <button className="at-logout" onClick={onLogout}>
              <LogOut size={14} />
              <span>DISCONNECT</span>
            </button>
          </div>
        </nav>

        <div className="at-hr" />

        {/* Hero */}
        <header className="at-hero">
          <p className="at-eyebrow">SESSION ACTIVE</p>
          <h1 className="at-title">WELCOME&nbsp;BACK, {username.split(/[.@]/)[0].toUpperCase()}</h1>
          <p className="at-hero-sub">Uplink stable. All systems nominal.</p>
        </header>

        {/* Status cards */}
        <div className="at-grid">
          <div className="at-card">
            <div className="at-card-icon"><ShieldCheck size={18} /></div>
            <p className="at-card-label">SESSION</p>
            <p className="at-card-value at-card-ok">AUTHENTICATED</p>
          </div>
          <div className="at-card">
            <div className="at-card-icon"><Activity size={18} /></div>
            <p className="at-card-label">UPLINK STATUS</p>
            <p className="at-card-value at-card-ok">STABLE // 214ms</p>
          </div>
          <div className="at-card">
            <div className="at-card-icon"><Clock size={18} /></div>
            <p className="at-card-label">LOCAL TIME</p>
            <p className="at-card-value">{timeStr} &nbsp;{dateStr}</p>
          </div>
        </div>

        {/* Console feed */}
        <div className="at-panel at-panel-console">
          <p className="at-panel-title">SYSTEM LOG</p>
          <div className="at-hr at-hr-thin" />
          <div className="at-console">
            <p className="at-console-line at-console-ok">&gt; AUTH TOKEN VALIDATED</p>
            <p className="at-console-line">&gt; SESSION ID ASSIGNED :: 7F91-AA02</p>
            <p className="at-console-line">&gt; PROFILE DATA SYNCED</p>
            <p className="at-console-line at-console-ok">&gt; READY</p>
          </div>
        </div>

        <div className="at-keyhints">
          <span><span className="at-key">ESC</span>Disconnect</span>
          <span><span className="at-key">TAB</span>Navigate</span>
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
  wrap: {
    position: "relative",
    zIndex: 2,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: "18px 32px 40px",
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

.at-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 46px;
}
.at-nav-brand {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 3px;
  color: #ff5a5a;
}
.at-nav-right { display: flex; align-items: center; gap: 20px; }
.at-nav-user {
  display: flex; align-items: center; gap: 6px;
  font-family: 'Chakra Petch', monospace;
  font-size: 11px; letter-spacing: 1px;
  color: rgba(255,255,255,0.55);
}
.at-nav-user strong { color: #00dceb; font-weight: 500; }
.at-logout {
  display: flex; align-items: center; gap: 6px;
  background: rgba(255,80,80,0.06);
  border: 1px solid rgba(255,90,90,0.5);
  clip-path: polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px);
  color: #ff8a8a;
  font-family: 'Chakra Petch', monospace;
  font-size: 11px; letter-spacing: 2px;
  padding: 7px 14px;
  transition: background 0.15s, box-shadow 0.15s;
}
.at-logout:hover { background: rgba(255,80,80,0.14); box-shadow: 0 0 14px rgba(255,60,60,0.25); }

.at-hr {
  margin-top: 16px;
  height: 1px;
  background: linear-gradient(90deg, rgba(0,220,235,0.7), rgba(255,60,60,0.5) 40%, transparent);
}
.at-hr-thin { margin: 14px 0 14px; opacity: 0.6; }

.at-hero { margin-top: 30px; }
.at-eyebrow {
  margin: 0 0 6px;
  font-family: 'Chakra Petch', monospace;
  font-size: 10px; letter-spacing: 3px;
  color: #ff5a5a;
}
.at-title {
  margin: 0;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #f2f2f2;
}
.at-hero-sub {
  margin: 8px 0 0;
  font-family: 'Chakra Petch', monospace;
  font-size: 12px; letter-spacing: 1px;
  color: rgba(255,255,255,0.45);
}

.at-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-top: 28px;
}
.at-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,80,80,0.25);
  clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px);
  padding: 16px 18px;
}
.at-card-icon { color: #00dceb; margin-bottom: 10px; }
.at-card-label {
  margin: 0;
  font-family: 'Chakra Petch', monospace;
  font-size: 9px; letter-spacing: 2px;
  color: rgba(255,255,255,0.4);
}
.at-card-value {
  margin: 4px 0 0;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 1px;
  color: #f2f2f2;
}
.at-card-ok { color: #6dffb0; }

.at-panel {
  margin-top: 26px;
  max-width: 640px;
}
.at-panel-title {
  margin: 0;
  font-family: 'Chakra Petch', monospace;
  font-size: 10px; letter-spacing: 3px;
  color: #ff5a5a;
}
.at-console { display: flex; flex-direction: column; gap: 4px; }
.at-console-line {
  margin: 0;
  font-family: 'Chakra Petch', monospace;
  font-size: 12px; letter-spacing: 0.5px;
  color: rgba(255,255,255,0.55);
}
.at-console-ok { color: #6dffb0; }

.at-keyhints {
  margin-top: auto;
  padding-top: 30px;
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
  .at-tag { display: none; }
  .at-nav { padding-top: 30px; flex-wrap: wrap; gap: 12px; }
}
`;
