import Link from "next/link";
import { Card, CardBody, CardHeader, Image, Skeleton } from "@nextui-org/react";
import DropDownComp from "./DropDown";
import { BiDotsHorizontal } from "react-icons/bi";

function SkeletonComp() {
  return (
    <Card
      className="w-full p-4 my-2 space-y-5 shadow-none h-60 bg-neutral-700"
      radius="lg"
    >
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="w-3/5 h-3 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="w-4/5 h-3 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="w-2/5 h-3 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}

export default SkeletonComp;
