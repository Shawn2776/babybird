import Link from "next/link";

// components/DevelopmentModal.jsx
function DevelopmentModal({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2 className="py-2 text-2xl font-bold text-red-700">Notice</h2>
        <p className="pb-2">
          The app is currently in development. Note that while your text/ video/
          images are protected from access outside the web application, any
          registered user can view all text/ video/ images posted. Features like
          deleting images/ Talks, blocking other users and selective sharing are
          planned for future updates.
        </p>
        <p className="pb-2">
          <b>
            If you post something that needs to be deleted immediately, please
            email{" "}
            <Link href={"mailto:webdev2776@gmail.com"}>
              webdev2776@gmail.com
            </Link>
            .
          </b>
        </p>
        <button
          className="px-2 py-2 text-2xl font-bold border-2 border-black rounded-2xl text-oxford bg-cambridge"
          onClick={onClose}
        >
          Understood
        </button>
      </div>
    </div>
  );
}

export default DevelopmentModal;
