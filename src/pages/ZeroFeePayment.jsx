import React, { useState } from "react";
import { upiProviders } from "../data/multiHopData.js";
import "./ZeroFeePayment.css";

const steps = [
  { id: 1, title: "Discover",    icon: "🔍", desc: "TravelEase finds best options" },
  { id: 2, title: "Compare",     icon: "⚖️",  desc: "Zero-fee side-by-side view" },
  { id: 3, title: "Direct UPI",  icon: "📲", desc: "Hands off to provider UPI" },
  { id: 4, title: "Confirmed",   icon: "✅", desc: "Provider confirms directly" },
];

const competitors = [
  { name: "MakeMyTrip",   fee: "₹149–₹499", feeType: "Convenience fee", color: "#E53935" },
  { name: "Goibibo",      fee: "₹99–₹299",  feeType: "Service charge",   color: "#1E88E5" },
  { name: "Yatra",        fee: "₹50–₹250",  feeType: "Processing fee",   color: "#43A047" },
  { name: "TravelEase ✓", fee: "₹0",        feeType: "Zero platform fee",color: "#2563EB", isUs: true },
];

export default function ZeroFeePayment() {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [amount, setAmount]                     = useState("2500");
  const [upiId, setUpiId]                       = useState("");
  const [payStep, setPayStep]                   = useState(0); // 0=idle,1=confirm,2=processing,3=done
  const [filterType, setFilterType]             = useState("all");

  const filtered = filterType === "all"
    ? upiProviders
    : upiProviders.filter(p => p.type === filterType);

  const handlePay = () => {
    if (!selectedProvider || !amount) return;
    setPayStep(1);
  };

  const confirmPay = () => {
    setPayStep(2);
    setTimeout(() => setPayStep(3), 2000);
  };

  const reset = () => {
    setPayStep(0);
    setSelectedProvider(null);
    setUpiId("");
    setAmount("2500");
  };

  return (
    <div className="page-container fade-in">
      {/* Header */}
      <div className="zf-header">
        <div className="zf-badge">✨ Feature 3</div>
        <h2 className="section-title">Zero-Fee Architecture</h2>
        <p className="section-subtitle">
          TravelEase is a pure discovery matrix — it finds your options, then hands off
          the payment directly to the provider via UPI. No middleman. No convenience fees. Ever.
        </p>
      </div>

      {/* Flow Diagram */}
      <div className="zf-flow card">
        <h3 className="zf-section-label">🏗️ How Our Architecture Works</h3>
        <div className="zf-flow-steps">
          {steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className="zf-step">
                <div className="zf-step-circle">{step.icon}</div>
                <div className="zf-step-title">{step.title}</div>
                <div className="zf-step-desc">{step.desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="zf-step-arrow">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="zf-flow-note">
          💡 After step 2, TravelEase exits the transaction chain entirely. Your money goes
          directly provider → your bank. No TravelEase servers touch your payment.
        </div>
      </div>

      {/* Comparison Table */}
      <div className="zf-comparison card">
        <h3 className="zf-section-label">⚖️ Platform Fee Comparison</h3>
        <div className="zf-comp-grid">
          {competitors.map((c, i) => (
            <div key={i} className={`zf-comp-card ${c.isUs ? "zf-comp-us" : ""}`}
              style={{ "--comp-color": c.color }}>
              {c.isUs && <div className="zf-comp-best">✓ That's Us</div>}
              <div className="zf-comp-name" style={{ color: c.color }}>{c.name}</div>
              <div className="zf-comp-fee">{c.fee}</div>
              <div className="zf-comp-type">{c.feeType}</div>
              {c.isUs && (
                <div className="zf-comp-savings">
                  Save ₹149–₹499 per booking
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Provider Selection */}
      <div className="zf-providers card">
        <h3 className="zf-section-label">📲 Direct-to-Provider UPI Endpoints</h3>
        <p className="zf-provider-sub">
          Select a provider. TravelEase shows you their direct UPI ID — you pay them, not us.
        </p>

        {/* Filter */}
        <div className="zf-filter-row">
          {[["all","All"],["train","🚂 Train"],["bus","🚌 Bus"],["flight","✈️ Flight"],["hotel","🏨 Hotel"]].map(([val,lbl]) => (
            <button key={val}
              className={`zf-filter-btn ${filterType === val ? "active" : ""}`}
              onClick={() => setFilterType(val)}>{lbl}</button>
          ))}
        </div>

        <div className="zf-providers-grid">
          {filtered.map(provider => (
            <div key={provider.id}
              className={`zf-provider-card ${selectedProvider?.id === provider.id ? "zf-provider-selected" : ""}`}
              onClick={() => { setSelectedProvider(provider); setPayStep(0); }}
              style={{ "--prov-color": provider.color }}>
              <div className="zf-prov-icon">{provider.icon}</div>
              <div className="zf-prov-info">
                <div className="zf-prov-name">{provider.name}</div>
                <div className="zf-prov-desc">{provider.desc}</div>
                <div className="zf-prov-upi">UPI: {provider.upiId}</div>
              </div>
              <div className="zf-prov-fee">
                <div className="zf-fee-zero">₹0</div>
                <div className="zf-fee-label">fee</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Simulator */}
      {selectedProvider && (
        <div className="zf-pay-sim card fade-in">
          <h3 className="zf-section-label">
            🔐 Direct UPI Payment Simulation — {selectedProvider.name}
          </h3>

          {payStep === 0 && (
            <div className="zf-pay-form">
              <div className="zf-pay-provider-info" style={{ borderColor: selectedProvider.color }}>
                <span style={{ fontSize: 32 }}>{selectedProvider.icon}</span>
                <div>
                  <div className="zf-pay-prov-name">{selectedProvider.name}</div>
                  <div className="zf-pay-prov-upi">Direct UPI ID: <strong>{selectedProvider.upiId}</strong></div>
                </div>
                <div className="zf-pay-zero-badge">₹0 Platform Fee</div>
              </div>

              <div className="zf-pay-fields">
                <div className="form-group">
                  <label>💰 Amount (₹)</label>
                  <input type="number" value={amount} min="1"
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Enter amount" />
                </div>
                <div className="form-group">
                  <label>📱 Your UPI ID</label>
                  <input type="text" value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="yourname@upi" />
                </div>
              </div>

              <div className="zf-pay-breakdown">
                <div className="zf-pb-row">
                  <span>Booking amount</span>
                  <span>₹{parseInt(amount || 0).toLocaleString()}</span>
                </div>
                <div className="zf-pb-row">
                  <span>Platform fee (TravelEase)</span>
                  <span className="zf-pb-zero">₹0</span>
                </div>
                <div className="zf-pb-row">
                  <span>Convenience charge</span>
                  <span className="zf-pb-zero">₹0</span>
                </div>
                <div className="zf-pb-row">
                  <span>GST on fee</span>
                  <span className="zf-pb-zero">₹0</span>
                </div>
                <div className="zf-pb-total">
                  <span>You Pay</span>
                  <span>₹{parseInt(amount || 0).toLocaleString()}</span>
                </div>
              </div>

              <button className="btn-primary zf-pay-btn" onClick={handlePay}
                disabled={!amount || !upiId}>
                📲 Pay ₹{parseInt(amount || 0).toLocaleString()} via UPI to {selectedProvider.name}
              </button>
              <p className="zf-pay-note">
                ⚡ This initiates a direct UPI request to <strong>{selectedProvider.upiId}</strong> —
                TravelEase is not in the payment path.
              </p>
            </div>
          )}

          {payStep === 1 && (
            <div className="zf-confirm fade-in">
              <div className="zf-confirm-box" style={{ borderColor: selectedProvider.color }}>
                <div className="zf-confirm-icon">{selectedProvider.icon}</div>
                <h4>Confirm Payment</h4>
                <div className="zf-confirm-details">
                  <div>To: <strong>{selectedProvider.name}</strong></div>
                  <div>UPI: <strong>{selectedProvider.upiId}</strong></div>
                  <div>Amount: <strong>₹{parseInt(amount).toLocaleString()}</strong></div>
                  <div>Platform Fee: <strong style={{ color: "#16A34A" }}>₹0</strong></div>
                </div>
                <div className="zf-confirm-actions">
                  <button className="btn-secondary" onClick={() => setPayStep(0)}>Cancel</button>
                  <button className="btn-primary" onClick={confirmPay}>✅ Confirm & Pay</button>
                </div>
              </div>
            </div>
          )}

          {payStep === 2 && (
            <div className="zf-processing fade-in">
              <div className="zf-proc-spinner" />
              <div className="zf-proc-title">Processing Direct UPI Payment...</div>
              <div className="zf-proc-sub">
                Connecting directly to {selectedProvider.name} ({selectedProvider.upiId})
              </div>
              <div className="zf-proc-steps">
                <div className="zf-proc-step done">✓ TravelEase discovery complete</div>
                <div className="zf-proc-step done">✓ Handed off to provider UPI endpoint</div>
                <div className="zf-proc-step active">⟳ Awaiting provider confirmation...</div>
                <div className="zf-proc-step">○ Booking confirmation</div>
              </div>
            </div>
          )}

          {payStep === 3 && (
            <div className="zf-success fade-in">
              <div className="zf-success-icon">✅</div>
              <h3>Payment Successful!</h3>
              <div className="zf-success-details">
                <div>₹{parseInt(amount).toLocaleString()} paid directly to <strong>{selectedProvider.name}</strong></div>
                <div>Transaction ID: <strong>UPI{Date.now().toString().slice(-10)}</strong></div>
                <div>Platform Fee Charged: <strong style={{ color: "#16A34A" }}>₹0</strong></div>
                <div>You saved vs MakeMyTrip: <strong style={{ color: "#16A34A" }}>~₹299</strong></div>
              </div>
              <button className="btn-primary" onClick={reset}>Pay Another</button>
            </div>
          )}
        </div>
      )}

      {/* Architecture Diagram */}
      <div className="zf-arch card">
        <h3 className="zf-section-label">📐 System Architecture (for Documentation)</h3>
        <div className="zf-arch-diagram">
          {/* User */}
          <div className="zf-arch-box user">
            <div className="zf-arch-icon">👤</div>
            <div>User</div>
          </div>
          <div className="zf-arch-arrow">→</div>
          {/* TravelEase */}
          <div className="zf-arch-box app">
            <div className="zf-arch-icon">🖥️</div>
            <div>TravelEase App</div>
            <div className="zf-arch-role">Discovery Only</div>
          </div>
          <div className="zf-arch-arrow double">→→<div className="zf-arch-arrow-note">Direct UPI handoff</div></div>
          {/* Provider */}
          <div className="zf-arch-box provider">
            <div className="zf-arch-icon">🏢</div>
            <div>Provider</div>
            <div className="zf-arch-role">IRCTC / MSRTC / Airline</div>
          </div>
          <div className="zf-arch-arrow">→</div>
          {/* Bank */}
          <div className="zf-arch-box bank">
            <div className="zf-arch-icon">🏦</div>
            <div>User's Bank</div>
            <div className="zf-arch-role">UPI Settlement</div>
          </div>
        </div>
        <div className="zf-arch-note">
          ❌ TravelEase is <strong>NOT</strong> in the money flow. Payment goes:
          User Bank → Provider Bank directly via NPCI UPI rails.
          No escrow. No holding. No fee.
        </div>
      </div>
    </div>
  );
}
