import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("TravelEase crash:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "#F0F4FF", padding: "24px", textAlign: "center",
          fontFamily: "system-ui, sans-serif"
        }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✈️</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1A1A2E", marginBottom: 8 }}>
            Something went wrong
          </h2>
          <p style={{ color: "#64748B", marginBottom: 24, maxWidth: 360 }}>
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.href = "/"; }}
            style={{
              background: "#1A56DB", color: "white", border: "none",
              padding: "12px 28px", borderRadius: 10, fontSize: 15,
              fontWeight: 700, cursor: "pointer"
            }}
          >
            🏠 Go to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
