import { useSimpleList, CreateButton } from "@refinedev/antd"
import { Flex, Card } from "antd"
import { List } from "@refinedev/antd";
import {useGetIdentity} from "@refinedev/core";
 
export const ProductsList = () => {
    const { listProps } = useSimpleList();
    const {data: account } = useGetIdentity();

    
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