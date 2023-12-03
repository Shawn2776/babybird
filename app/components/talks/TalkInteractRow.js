import { FaRegComments, FaChartLine } from "react-icons/fa6";
import { PiArrowsCounterClockwise } from "react-icons/pi";
import { MdSaveAlt } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";

function TalkInteractRow({
  likes,
  dislikes,
  retalks,
  backtalks,
  likeCount,
  dislikeCount,
  retalkCount,
  backtalkCount,
}) {
  return (
    <div className="flex justify-between text-sm">
      <div className="flex items-center gap-1">
        <span className="text-gray-600">{backtalkCount}</span>
        <FaRegComments className="text-gray-600" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-600">{retalkCount}</span>
        <PiArrowsCounterClockwise className="text-gray-600" />
      </div>
      <div className="flex items-center gap-1">
        <span className="">{likeCount}</span>
        <AiFillLike className="" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-600">{dislikeCount}</span>
        <AiOutlineDislike className="text-gray-600" />
      </div>

      <div className="flex items-center gap-1">
        <span className="text-gray-600">2.2k</span>
        <FaChartLine className="text-gray-600" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-600">18k</span>
        <MdSaveAlt className="text-gray-600" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-600">1.1k</span>
        <IoMdShareAlt className="text-gray-600" />
      </div>
    </div>
  );
}

export default TalkInteractRow;

