import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

import { useList } from "@refinedev/core";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card, Grid, Radio } from "antd";
import dayjs from "dayjs";

import { Typography as Text } from "antd";

import styles from "./index.module.css";


const FullCalendarWrapper = lazy(() => import("./full-calendar"));


export const Calendar = ({
  categoryId,
  onClickEvent,
}) => {
  const [calendarView, setCalendarView] = useState("dayGridMonth");
  const calendarRef = useRef(null);
  const [title, setTitle] = useState(calendarRef.current?.getApi().view.title);
  const { md } = Grid.useBreakpoint();

  useEffect(() => {
    calendarRef.current?.getApi().changeView(calendarView);
  }, [calendarView]);

  useEffect(() => {
    if (md) {
      setCalendarView("dayGridMonth");
    } else {
      setCalendarView("listMonth");
    }
  }, [md]);

  const { data } = useList({
    pagination: {
      mode: "off",
    },
    filters: [
      {
        field: "event_types.id",
        operator: "in",
        value: categoryId?.length ? categoryId : undefined,
      },
    ],
    meta: {
      select:"*, events(*)",
    },
  });

  const events = (data?.data ?? []).map(
    ({ id, title, start, end, description }) => ({
      id: id,
      title: title,
      description: description,
      start: start,
      end: end,
      allDay: dayjs(end).utc().diff(dayjs(start).utc(), "hours") >= 23,
    }),
  );

  return (
    <Card>
      <div className={styles.calendar_header}>
        <div className={styles.actions}>
          <Button
            onClick={() => {
              calendarRef.current?.getApi().prev();
            }}
            shape="circle"
            icon={<LeftOutlined />}
          />
          <Button
            onClick={() => {
              calendarRef.current?.getApi().next();
            }}
            shape="circle"
            icon={<RightOutlined />}
          />
          <Text.Text>
            {title}
          </Text.Text>
        </div>

        <Radio.Group value={calendarView}>
          {[
            {
              label: "Месяц",
              desktopView: "dayGridMonth",
              mobileView: "listMonth",
            },
            {
              label: "Неделя",
              desktopView: "timeGridWeek",
              mobileView: "listWeek",
            },
            {
              label: "День",
              desktopView: "timeGridDay",
              mobileView: "listDay",
            },
          ].map(({ label, desktopView, mobileView }) => {
            const view = md ? desktopView : mobileView;
            return (
              <Radio.Button
                key={label}
                value={view}
                onClick={() => {
                  setCalendarView(view);
                }}
              >
                {label}
              </Radio.Button>
            );
          })}
          {md && (
            <Radio.Button
              value="listMonth"
              onClick={() => {
                setCalendarView("listMonth");
              }}
            >
               Список
            </Radio.Button>
          )}
        </Radio.Group>
      </div>
      <Suspense>
        <FullCalendarWrapper
          {...{ calendarRef, events, onClickEvent, setTitle }}
        />
      </Suspense>
    </Card>
  );
};
