import Link from "next/link";

function DevelopmentModal({ onClose }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center z-[100] items-center backdrop-blur-3xl">
        <div className="p-10 rounded-xl max-w-[500px] w-full bg-neutral-900 text-white">
          <h2 className="py-2 text-4xl font-bold text-red-700 flex justify-center">
            Notice
          </h2>
          <hr />
          <p className="pb-2 pt-4">
            &emsp;uTalkTo is currently in development. While your text/ video/
            images are protected from access outside the web application, any
            registered user can view and download all text/ video/ images
            posted.
            <br />
            <br />
            &emsp;Features like deleting images/ Talks, blocking other users and
            selective sharing are planned for future updates.
          </p>
          <p className="pb-2 text-sm">
            <b>
              If you post something that needs to be deleted immediately, please
              email{" "}
              <Link
                href={"mailto:webdev2776@gmail.com"}
                className="text-cambridge"
              >
                webdev2776@gmail.com
              </Link>
              .
            </b>
          </p>
          <br />
          <hr />
          <br />

          <button
            className="px-4 py-1 border-2 font-bold text-lg border-black rounded-2xl text-white bg-slate-900 w-full hover:text-lime-500 hover:border-white transition duration-300"
            onClick={onClose}
          >
            Understood
          </button>
        </div>
      </div>
    </>
  );
}

export default DevelopmentModal;
