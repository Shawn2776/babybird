import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function TabComponent({
  tabOneKey,
  cardBodyOne,
  tabTwoKey,
  cardBodyTwo,
  tabThreeKey,
  cardBodyThree,
}) {
  return (
    <div className="w-full">
      <Tabs aria-label="Options">
        <Tab key={tabOneKey.toLowerCase()} title={tabOneKey}></Tab>
        <Tab key={tabTwoKey.toLowerCase()} title={tabTwoKey}></Tab>
        {tabThreeKey && cardBodyThree && (
          <Tab key={tabThreeKey.toLowerCase()} title={tabThreeKey}>
            <Card>
              <CardBody>{cardBodyThree}</CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
