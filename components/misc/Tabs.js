import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";

const TabsComponent = ({ optionOne, optionTwo, optionThree }) => {
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
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
