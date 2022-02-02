import { Input, Pagination, Spin, Table } from "antd";

import { Redirect } from "react-router-dom";
import { columns, useGetProducts } from "./config";

type Props = {
  token: string | null;
};

export const Products = ({ token }: Props) => {
  const { data, params, onPageChange, isLoading, query, onQueryChange } =
    useGetProducts(token);

  if (!token) {
    return <Redirect to="/login" />;
  }

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div>
      <Input width={200} value={query} onChange={onQueryChange} />
      <Table pagination={false} dataSource={data?.items} columns={columns} />
      <Pagination
        current={params.page}
        onChange={onPageChange}
        total={Number(data?.total_count)}
        pageSize={params.size}
      />
    </div>
  );
};
