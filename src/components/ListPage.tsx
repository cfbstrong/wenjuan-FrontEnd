import { FC } from "react";
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

type PropsType = {
  //important
  total: number;
};

const ListPage: FC<PropsType> = (props) => {
  const { total } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const current = parseInt(searchParams.get("page") || "") || 1;
    const pageSize = parseInt(searchParams.get("pageSize") || "") || 10;
    setCurrent(current);
    setPageSize(pageSize);
  }, [searchParams]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    setSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
  };

  return (
    <>
      <Pagination
        total={total}
        current={current}
        pageSize={pageSize}
        onChange={handlePaginationChange}
      />
    </>
  );
};

export default ListPage;
