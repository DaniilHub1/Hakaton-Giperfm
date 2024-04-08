import { useSimpleList, CreateButton } from "@refinedev/antd"
import { Flex, Card } from "antd"
import { List } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import { useCreate } from "@refinedev/core";

export const ProductsList = () => {
    const { listProps } = useSimpleList();
    const { data: account } = useGetIdentity();
    const { mutate } = useCreate();

    const hasEnoughPoints = (price) => {
        return price <= account?.userInfo?.points;
    };

    console.log(account);

    return (
        <List>
            <Flex wrap="wrap" gap="middle" justify="center">
                {listProps?.dataSource?.map((product) => {
                    return (
                        <Card
                            key={product.id}
                            style={{ width: 300, margin: 10 }}
                            cover={<img alt={product.title} src={product.image} />}
                            actions={[<CreateButton icon={false} disabled={product.quantity === 0 || !hasEnoughPoints(product.price)}
                                onClick={() => mutate({
                                    resource: "orders",
                                    values: {
                                        employee_id: account?.userInfo.id,
                                        product_id: product.id,
                                    },
                                })}
                            >Заказать</CreateButton>]}
                        >
                            <Card.Meta
                                title={product.title}
                                description={`Цена: ${product.price}`}
                            />
                        </Card>
                    );
                })}
            </Flex>
        </List>
    );
};