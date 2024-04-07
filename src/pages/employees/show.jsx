import { useShow, useOne} from "@refinedev/core";
import { TextField, NumberField, Show } from "@refinedev/antd";

import { Typography } from "antd";

export const ShowEmployee = () => {
    const {
        queryResult: { data, isLoading },
    } = useShow();
        
    if (isLoading){
        return <div>Loadnig...</div>;
    }    
    return (
        <Show>
            <Typography.Title level={5}>Id</Typography.Title>
            <TextField value={data?.data?.id} />

            <Typography.Title level={5}>Имя</Typography.Title>
            <TextField value={data?.data?.name} />

            <Typography.Title level={5}>Фамилия</Typography.Title>
            <TextField value={data?.data?.last_name} />

            <Typography.Title level={5}>Points</Typography.Title>
            <TextField value={data?.data?.points} />
        </Show>
    );
};
