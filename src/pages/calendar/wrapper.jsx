import React, { useState } from "react";

import { CreateButton } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";

import { Col, Row } from "antd";

import { Calendar, CalendarUpcomingEvents } from "./components";

export const CalendarPageWrapper = ({
  children,
}) => {
  const { show } = useNavigation();
  const [selectedEventCategory, setSelectedEventCategory] = useState(
    [],
  );

  return (
    <div className="page-container">
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={6}>
          <CreateButton block size="large" style={{ marginBottom: "1rem" }}>
            Новое событие
          </CreateButton>

          <CalendarUpcomingEvents
            limit={3}
            cardProps={{ style: { marginBottom: "1rem" } }}
          />
        </Col>
        <Col xs={24} xl={18}>
          <Calendar
            onClickEvent={({ id }) => {
              show("events", id);
            }}
            categoryId={selectedEventCategory}
          />
        </Col>
      </Row>
      {children}
    </div>
  );
};
