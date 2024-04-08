import React from "react";

import { DateField, List, useModalForm, useTable } from "@refinedev/antd";
import { Form, Input, Modal, Select, Table } from "antd";

export const EventsList = () => {
  const { tableProps } = useTable();

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
  } = useModalForm<IPost>({
    action: "create",
  });

  return (
    <>
      <List
        createButtonProps={{
          onClick: () => {
            createModalShow();
          },
        }}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column dataIndex="title" title="Название" />
          <Table.Column dataIndex="description" title="Описание" />
          <table.Column
          dataIndex="start"
          title="Начало"
          render={(value) => <DateField value={value} />}
          />
          <table.Column
          dataIndex="end"
          title="Конец"
          render={(value) => <DateField value={value} />}
          />
        </Table>
      </List>
      <Modal {...createModalProps}>
        <Form {...createFormProps} layout="vertical">
          <Form.Item
            label="Title"
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
            label="Тип события"
            name="event_type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={[
                {
                  label: "Published",
                  value: "published",
                },
                {
                  label: "Draft",
                  value: "draft",
                },
                {
                  label: "Rejected",
                  value: "rejected",
                },
              ]}
            />
            <Form.Item
            label="Начало"
            name="description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Конец"
            name="description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};