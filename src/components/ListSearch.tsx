import React, { FC } from "react";
import { Input } from "antd";
import { useState, useEffect } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

const { Search } = Input;

const ListSearch: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = (value: string) => {
    navigate({
      pathname: location.pathname,
      search: `?keyword=${value}`,
    });
  };

  useEffect(() => {
    setValue(searchParams.get("keyword") || "");
  }, [searchParams.get("keyword")]);

  return (
    <>
      <Search
        size="large"
        placeholder="input search text"
        allowClear
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
        style={{ width: 260 }}
      />
    </>
  );
};

export default ListSearch;
