import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

const TabsComponent = ({ optionOne, optionTwo, optionThree, talks }) => {
  const [selected, setSelected] = useState("photos");

  return (
    <div className="flex flex-col w-full mx-auto align-middle dark">
      <Tabs
        fullWidth
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
        variant="underlined"
      >
        <Tab key={optionOne} title={optionOne.toUpperCase()}>
          <Card>
            <CardBody>
              {/* Post Grid */}
              <div className="grid grid-cols-3 gap-2 px-4">
                {/* Repeat this div for each post thumbnail */}
                {talks?.map((talk) => (
                  <Link
                    href="#"
                    key={talk.id}
                    className="hover:border hover:rounded-md"
                  >
                    <div
                      style={{
                        backgroundImage: `url(${talk.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "100px",
                      }}
                      className="w-full h-24 p-1 text-sm rounded-md bg-neutral-700 "
                    >
                      {talk.text}
                      <video id="background-video" autoplay loop muted>
                        <source src={talk.video} type="video/mp4" />
                      </video>
                    </div>
                  </Link>
                ))}
                {/* ... */}
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key={optionTwo} title={optionTwo.toUpperCase()}>
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key={optionThree} title={optionThree.toUpperCase()}>
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsComponent;
