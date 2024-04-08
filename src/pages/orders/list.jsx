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


export const ListOrders = () => {
    const { tableProps, sorter } = useTable({
        resource: "orders",
        sorters: {
            initial: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        },
        syncWithLocation: true,
        meta: {
            select: "*, products(title, price), Employees(name, last_name)",
        },
    });
    console.log(tableProps);

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
                <Table.Column dataIndex={['products', 'price']} title="Цена" />
                <Table.Column key="title" dataIndex={['products', 'title']} title="Продукт" sorter />
                <Table.Column key="last_name" dataIndex={['Employees', 'last_name']} title="Фамилия " sorter />
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