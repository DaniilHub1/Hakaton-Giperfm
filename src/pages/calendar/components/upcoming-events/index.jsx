import React from "react";

import { useList, useNavigation } from "@refinedev/core";

import { CalendarOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Button, Card, Skeleton as AntdSkeleton } from "antd";
import dayjs from "dayjs";


import { Typography as Text } from "antd";
import { CalendarUpcomingEvent } from "./event";
import styles from "./index.module.css";

const NoEvent = () => (
  <span
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "220px",
    }}
  >
    No Upcoming Event
  </span>
);

const Skeleton = () => {
  return (
    <div className={styles.item}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "24px",
          padding: "1px 0",
        }}
      >
        <AntdSkeleton.Button
          active
          style={{
            height: "14px",
          }}
        />
        <AntdSkeleton.Button
          active
          style={{
            width: "90%",
            marginTop: "8px",
            height: "16px",
          }}
        />
      </div>
    </div>
  );
};

export const CalendarUpcomingEvents = ({
  limit = 5,
  cardProps,
  showGoToListButton,
}) => {
  const { list } = useNavigation();

  const { data, isLoading } = useList({
    resource: "events",
    pagination: {
      pageSize: limit,
    },
    sorters: [
      {
        field: "start",
        order: "asc",
      },
    ],
    filters: [
      {
        field: "start",
        operator: "gte",
        value: dayjs().format("DD-MM-YYYY"),
      },
    ],
    meta: {
      select:"*" ,
    },
  });

  return (
    <Card
      headStyle={{ padding: "8px 16px" }}
      bodyStyle={{
        padding: "0 1rem",
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CalendarOutlined />
          <Text size="sm" style={{ marginLeft: ".7rem" }}>
            Предстоящие события
          </Text>
        </div>
      }
      extra={
        showGoToListButton && (
          <Button onClick={() => list("events")} icon={<RightCircleOutlined />}>
            Календарь
          </Button>
        )
      }
      {...cardProps}
    >
      {isLoading &&
        Array.from({ length: limit }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      {!isLoading &&
        data?.data.map((item) => (
          <CalendarUpcomingEvent key={item.id} item={item} />
        ))}
      {!isLoading && data?.data.length === 0 && <NoEvent />}
    </Card>
  );
};
