import React, { useState } from "react";
import "./GroupTrip.css";

const generateId = () => Math.random().toString(36).slice(2, 8).toUpperCase();

const GroupTrip = () => {
  // ── Members ──────────────────────────────────────────────────────────────
  const [members, setMembers] = useState([
    { id: "M1", name: "You", color: "#1A56DB" },
  ]);
  const [newMember, setNewMember] = useState("");

  const memberColors = ["#1A56DB","#05A660","#E84393","#F59E0B","#7C3AED","#EF4444","#06B6D4","#FF6B00"];

  const addMember = () => {
    if (!newMember.trim()) return;
    setMembers(m => [...m, { id: generateId(), name: newMember.trim(), color: memberColors[m.length % memberColors.length] }]);
    setNewMember("");
  };
  const removeMember = (id) => setMembers(m => m.filter(x => x.id !== id));

  // ── Wishlist ─────────────────────────────────────────────────────────────
  const [wishes, setWishes] = useState([
    { id: "W1", place: "Manali", addedBy: "M1", votes: ["M1"], note: "Want to see the snow!" },
  ]);
  const [newWish, setNewWish] = useState("");
  const [newNote, setNewNote] = useState("");

  const addWish = () => {
    if (!newWish.trim()) return;
    setWishes(w => [...w, { id: generateId(), place: newWish.trim(), addedBy: members[0].id, votes: [members[0].id], note: newNote.trim() }]);
    setNewWish(""); setNewNote("");
  };
  const toggleVote = (wishId, memberId) => {
    setWishes(ws => ws.map(w => {
      if (w.id !== wishId) return w;
      const has = w.votes.includes(memberId);
      return { ...w, votes: has ? w.votes.filter(v => v !== memberId) : [...w.votes, memberId] };
    }));
  };

  // ── Expenses ─────────────────────────────────────────────────────────────
  const [expenses, setExpenses] = useState([
    { id: "E1", desc: "Hotel Booking", amount: 4000, paidBy: "M1", splitWith: ["M1"] },
  ]);
  const [expDesc, setExpDesc] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [expPaidBy, setExpPaidBy] = useState("M1");
  const [expSplit, setExpSplit] = useState(["M1"]);

  const addExpense = () => {
    if (!expDesc || !expAmount) return;
    setExpenses(e => [...e, { id: generateId(), desc: expDesc, amount: Number(expAmount), paidBy: expPaidBy, splitWith: expSplit }]);
    setExpDesc(""); setExpAmount(""); setExpSplit(["M1"]);
  };
  const toggleSplit = (id) => setExpSplit(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  // ── Settlement calculation ────────────────────────────────────────────────
  const calcSettlement = () => {
    const balances = {};
    members.forEach(m => balances[m.id] = 0);
    expenses.forEach(exp => {
      const share = exp.amount / exp.splitWith.length;
      exp.splitWith.forEach(id => { balances[id] = (balances[id] || 0) - share; });
      balances[exp.paidBy] = (balances[exp.paidBy] || 0) + exp.amount;
    });
    const settlements = [];
    const pos = members.filter(m => balances[m.id] > 0.5).sort((a, b) => balances[b.id] - balances[a.id]);
    const neg = members.filter(m => balances[m.id] < -0.5).sort((a, b) => balances[a.id] - balances[b.id]);
    let i = 0, j = 0;
    while (i < pos.length && j < neg.length) {
      const p = pos[i], n = neg[j];
      const amt = Math.min(balances[p.id], -balances[n.id]);
      if (amt > 0.5) settlements.push({ from: n, to: p, amount: Math.round(amt) });
      balances[p.id] -= amt; balances[n.id] += amt;
      if (Math.abs(balances[p.id]) < 0.5) i++;
      if (Math.abs(balances[n.id]) < 0.5) j++;
    }
    return { balances, settlements };
  };

  const { balances, settlements } = calcSettlement();
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const getMember = id => members.find(m => m.id === id);
  const topWishes = [...wishes].sort((a, b) => b.votes.length - a.votes.length);

  return (
    <div className="page-container fade-in">
      {/* Hero */}
      <div className="grp-hero">
        <div className="grp-hero-badge">👥 Group Travel</div>
        <h1 className="grp-hero-title">Group Trip Planner</h1>
        <p className="grp-hero-sub">Plan a trip with friends or family — wishlist voting and expense splitting in one place</p>
      </div>

      <div className="grp-grid">
        {/* ── Members Panel ────────────────────────────────────────────────── */}
        <section className="grp-section card">
          <div className="grp-section-title">👥 Group Members ({members.length})</div>
          <div className="members-list">
            {members.map(m => (
              <div key={m.id} className="member-chip" style={{ borderColor: m.color }}>
                <span className="member-avatar" style={{ background: m.color }}>{m.name[0]}</span>
                <span className="member-name">{m.name}</span>
                {m.id !== "M1" && (
                  <button className="member-remove" onClick={() => removeMember(m.id)}>✕</button>
                )}
              </div>
            ))}
          </div>
          <div className="grp-add-row">
            <input
              placeholder="Enter name..."
              value={newMember}
              onChange={e => setNewMember(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addMember()}
            />
            <button className="btn-primary grp-add-btn" onClick={addMember}>+ Add</button>
          </div>
        </section>

        {/* ── Wishlist / Voting ─────────────────────────────────────────────── */}
        <section className="grp-section card">
          <div className="grp-section-title">🗺️ Places to Visit (Vote)</div>
          <div className="wishes-list">
            {topWishes.map(w => {
              const adder = getMember(w.addedBy);
              return (
                <div key={w.id} className="wish-item">
                  <div className="wish-top">
                    <div className="wish-place">{w.place}</div>
                    <div className="vote-count">👍 {w.votes.length}</div>
                  </div>
                  {w.note && <div className="wish-note">"{w.note}"</div>}
                  <div className="wish-meta">
                    <span style={{ color: adder?.color }}>● {adder?.name}</span>
                    <span>·</span>
                    <div className="vote-members">
                      {members.map(m => (
                        <button
                          key={m.id}
                          className={`vote-btn ${w.votes.includes(m.id) ? "voted" : ""}`}
                          style={w.votes.includes(m.id) ? { background: m.color, borderColor: m.color } : {}}
                          onClick={() => toggleVote(w.id, m.id)}
                          title={m.name}
                        >{m.name[0]}</button>
                      ))}
                    </div>
                  </div>
                  <div className="vote-bar-track">
                    <div
                      className="vote-bar-fill"
                      style={{ width: `${(w.votes.length / members.length) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grp-add-row" style={{ flexDirection: "column", gap: 8 }}>
            <input placeholder="Place name..." value={newWish} onChange={e => setNewWish(e.target.value)} />
            <input placeholder="Note (optional)..." value={newNote} onChange={e => setNewNote(e.target.value)} />
            <button className="btn-primary grp-add-btn" onClick={addWish} style={{ width: "100%", justifyContent: "center" }}>+ Add Place</button>
          </div>
        </section>
      </div>

      {/* ── Expense Tracker ───────────────────────────────────────────────────── */}
      <section className="grp-section card" style={{ marginTop: 20 }}>
        <div className="grp-section-title">💸 Expense Tracker (Splitwise-style)</div>
        <div className="exp-summary-row">
          <div className="exp-stat">
            <div className="es-val">₹{totalExpense.toLocaleString()}</div>
            <div className="es-label">Total Spent</div>
          </div>
          <div className="exp-stat">
            <div className="es-val">{expenses.length}</div>
            <div className="es-label">Transactions</div>
          </div>
          <div className="exp-stat">
            <div className="es-val">₹{members.length ? Math.round(totalExpense / members.length).toLocaleString() : 0}</div>
            <div className="es-label">Per Person</div>
          </div>
        </div>

        <div className="exp-list">
          {expenses.map(e => {
            const payer = getMember(e.paidBy);
            return (
              <div key={e.id} className="exp-item">
                <div className="exp-desc">{e.desc}</div>
                <div className="exp-meta">
                  <span className="exp-payer" style={{ color: payer?.color }}>
                    Paid by {payer?.name}
                  </span>
                  <span className="exp-split">
                    Split {e.splitWith.length} ways
                  </span>
                </div>
                <div className="exp-amount">₹{e.amount.toLocaleString()}</div>
              </div>
            );
          })}
        </div>

        {/* Add expense form */}
        <div className="exp-add-form">
          <div className="grp-add-row">
            <input placeholder="Expense name..." value={expDesc} onChange={e => setExpDesc(e.target.value)} />
            <input type="number" placeholder="₹ Amount" value={expAmount} onChange={e => setExpAmount(e.target.value)} style={{ maxWidth: 120 }} />
          </div>
          <div className="exp-split-row">
            <label style={{ textTransform: "none", letterSpacing: 0, fontSize: 13 }}>Paid by:</label>
            <select value={expPaidBy} onChange={e => setExpPaidBy(e.target.value)}>
              {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <label style={{ textTransform: "none", letterSpacing: 0, fontSize: 13 }}>Split between:</label>
            <div className="split-members">
              {members.map(m => (
                <button
                  key={m.id}
                  className={`vote-btn ${expSplit.includes(m.id) ? "voted" : ""}`}
                  style={expSplit.includes(m.id) ? { background: m.color, borderColor: m.color } : {}}
                  onClick={() => toggleSplit(m.id)}
                >{m.name[0]}</button>
              ))}
            </div>
          </div>
          <button className="btn-primary" onClick={addExpense} style={{ width: "100%", justifyContent: "center" }}>+ Add Expense</button>
        </div>
      </section>

      {/* ── Settlement ────────────────────────────────────────────────────────── */}
      <section className="grp-section card settlement-card" style={{ marginTop: 20 }}>
        <div className="grp-section-title">✅ Who owes whom?</div>
        {settlements.length === 0 ? (
          <div className="settle-clear">🎉 All settled! No one owes anything.</div>
        ) : (
          <div className="settlement-list">
            {settlements.map((s, i) => (
              <div key={i} className="settle-item">
                <span className="settle-from" style={{ color: s.from.color }}>
                  <span className="settle-avatar" style={{ background: s.from.color }}>{s.from.name[0]}</span>
                  {s.from.name}
                </span>
                <span className="settle-arrow">→ ₹{s.amount.toLocaleString()} →</span>
                <span className="settle-to" style={{ color: s.to.color }}>
                  <span className="settle-avatar" style={{ background: s.to.color }}>{s.to.name[0]}</span>
                  {s.to.name}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="balance-grid">
          {members.map(m => (
            <div key={m.id} className={`balance-item ${balances[m.id] > 0 ? "bal-pos" : balances[m.id] < 0 ? "bal-neg" : "bal-zero"}`}>
              <span className="bal-name" style={{ color: m.color }}>{m.name}</span>
              <span className="bal-amount">
                {balances[m.id] > 0.5 ? `+₹${Math.round(balances[m.id]).toLocaleString()} to receive` :
                 balances[m.id] < -0.5 ? `-₹${Math.round(-balances[m.id]).toLocaleString()} owes` :
                 "✓ Settled"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GroupTrip;
