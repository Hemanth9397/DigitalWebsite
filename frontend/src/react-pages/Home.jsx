import React, { useState, useMemo, useEffect } from "react";
import { Input, Dropdown, Spin, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import debounce from "lodash.debounce";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DebouncedSearchWithLodash = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const fetchResults = async (searchText) => {
    if (!searchText.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/home/searchItem?q=${searchText}`,
        { withCredentials: true }
      );
      setResults(res.data?.matches || []);
      setOpen(res.data?.matches?.length > 0);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useMemo(() => debounce(fetchResults, 500), []);

  useEffect(() => {
    return () => debouncedFetch.cancel();
  }, [debouncedFetch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetch(value);
  };

  const handleMenuClick = ({ key }) => {
    setQuery(key);
    setOpen(false);
    navigate(`/${key.toLowerCase()}`, { replace: true });
  };

  const menuItems = results.map((item) => ({ key: item, label: item }));

  return (
    <div style={{ width: 350, margin: "60px auto" }}>
      <Dropdown
        open={open}
        menu={{ items: menuItems, onClick: handleMenuClick }}
        placement="bottomLeft"
        trigger={["click"]}
      >
        <span style={{ display: "block" }}>
          <Input
            placeholder="Search projects..."
            prefix={<SearchOutlined />}
            allowClear
            value={query}
            onChange={handleChange}
            onFocus={() => results.length > 0 && setOpen(true)}
            suffix={loading && <Spin size="small" />}
            style={{
              borderRadius: 8,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          />
        </span>
      </Dropdown>
    </div>
  );
};

export default DebouncedSearchWithLodash;
