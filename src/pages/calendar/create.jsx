import React, { useState } from "react";

import { useForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";

import { Modal } from "antd";
import dayjs from "dayjs";

import { CalendarForm } from "./components";



export const CalendarCreatePage = () => {
  const [isAllDayEvent, setIsAllDayEvent] = useState(false);
  const { list } = useNavigation();

  const { formProps, saveButtonProps, form, onFinish } = useForm();

  const handleOnFinish = async (values) => {
    const { rangeDate, date, time, color, ...otherValues } = values;

    let start = dayjs();
    let end = dayjs();

    if (rangeDate) {
      start = rangeDate[0].startOf("day");
      end = rangeDate[1].endOf("day");
    } else {
      start = date
        .set("hour", time[0].hour())
        .set("minute", time[0].minute())
        .set("second", 0);

      end = date
        .set("hour", time[1].hour())
        .set("minute", time[1].minute())
        .set("second", 0);
    }

    await onFinish({
      ...otherValues,
      start: start.toISOString(),
      end: end.toISOString(),
      color: typeof color === "object" ? `#${color.toHex()}` : color,
    });
  };

  return (
    <Modal
      title="Новое событие"
      open
      onCancel={() => {
        list("events");
      }}
      okButtonProps={{
        ...saveButtonProps,
      }}
      okText="Создать"
      width={560}
    >
      <CalendarForm
        isAllDayEvent={isAllDayEvent}
        setIsAllDayEvent={setIsAllDayEvent}
        form={form}
        formProps={{
          ...formProps,
          onFinish: handleOnFinish,
        }}
      />
    </Modal>
  );
};
