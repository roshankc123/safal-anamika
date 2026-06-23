interface Props {
  from: string;
  to: string;
}

export function SectionDivider({ from, to }: Props) {
  return (
    <div
      style={{
        height: "48px",
        background: `linear-gradient(to bottom, ${from}, ${to})`,
        position: "relative",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          height: "1px",
          width: "60px",
          background: "linear-gradient(to right, transparent, rgba(184,135,28,0.3))",
        }}
      />
      <span style={{ color: "rgba(184,135,28,0.25)", fontSize: "10px", margin: "0 12px" }}>
        ✦
      </span>
      <div
        style={{
          height: "1px",
          width: "60px",
          background: "linear-gradient(to left, transparent, rgba(184,135,28,0.3))",
        }}
      />
    </div>
  );
}
