import {
    List,
    useTable,
    EditButton,
    ShowButton,
    getDefaultSortOrder,
    FilterDropdown,
    useSelect,
} from "@refinedev/antd";
import { Table, Space, Select } from "antd";

export const EmployeeList = () => {
    const { tableProps, sorter } = useTable({
        resource: "Employees",
        sorters: {
            initial: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        },
        meta: {
            select: "*",
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column key="name" dataIndex="name" title="Имя " sorter />
                <Table.Column key="last_name" dataIndex="last_name" title="Фамилия " sorter />
                <Table.Column key="position" dataIndex="position" title="Должность " sorter />
                <Table.Column key="points" dataIndex="points" title="Валюта " sorter />
                <Table.Column
                    title="Действия"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <ShowButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};