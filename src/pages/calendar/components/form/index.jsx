import React from "react";

import { useSelect } from "@refinedev/antd";

import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  TimePicker,
} from "antd";
import dayjs from "dayjs";



const { RangePicker } = DatePicker;

export const CalendarForm = ({
  form,
  formProps,
  isAllDayEvent = false,
  setIsAllDayEvent,
}) => {
  const { selectProps: categorySelectProps } = useSelect({
    resource: "event_types",
    meta: {
      select: "*",
    },
  });

  const rangeDate = form.getFieldsValue().rangeDate;
  const date = form.getFieldsValue().date;

  return (
    <Form layout="vertical" form={form} {...formProps}>
      <Form.Item
        label="Название"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        rules={[]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Дата и время"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, width: 80 }}>
            <Checkbox
              checked={isAllDayEvent}
              onChange={(e) => setIsAllDayEvent(e.target.checked)}
            >
              На весь день
            </Checkbox>
          </div>

          {isAllDayEvent ? (
            <Form.Item
              name="rangeDate"
              rules={[
                {
                  required: true,
                },
              ]}
              noStyle
            >
              <RangePicker
                style={{
                  width: 416,
                }}
                format={"DD/MM/YYYY"}
                defaultValue={[dayjs(date), dayjs(date)]}
              />
            </Form.Item>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "0.5rem",
              }}
            >
              <Form.Item
                name="date"
                rules={[
                  {
                    required: true,
                  },
                ]}
                noStyle
              >
                <DatePicker
                  style={{
                    width: "160px",
                  }}
                  format={"DD/MM/YYYY"}
                  defaultValue={dayjs(rangeDate ? rangeDate[0] : undefined)}
                />
              </Form.Item>
              <Form.Item
                name="time"
                rules={[
                  {
                    required: true,
                  },
                ]}
                noStyle
              >
                <TimePicker.RangePicker
                  style={{
                    width: 240,
                  }}
                  format={"HH:mm"}
                  minuteStep={15}
                />
              </Form.Item>
            </div>
          )}
        </div>
      </Form.Item>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Form.Item
            label="Тип события"
            name={['event_types', 'id']}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...categorySelectProps} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
