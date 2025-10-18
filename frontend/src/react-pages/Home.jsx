import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Input, Spin, Card, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import { useSelector } from "react-redux";
import "./Home.scss";

const PAGE_SIZE = 8; // 4x2 grid per fetch, adjust as needed

const Home = () => {
  const isDark = useSelector((state) => state.theme.isDark);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef(null);

  // ----------------- SEARCH -----------------
  const fetchSearchResults = async (searchText) => {
    if (!searchText.trim()) {
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/projects?q=${searchText}&page=1`
      );
      setSearchResults(res.data?.projects || []);
    } catch (err) {
      console.error(err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const debouncedSearch = useMemo(() => debounce(fetchSearchResults, 500), []);
  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
    if (containerRef.current) containerRef.current.scrollTop = 0;
  };

  // ----------------- INITIAL LOAD / INFINITE SCROLL -----------------
  const fetchProjects = async (pageNum = 1) => {
    if (!hasMore && pageNum !== 1) return;
    pageNum === 1 ? setProjects([]) : setLoadingMore(true);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/projects?q=${query}&page=${pageNum}`
      );
      const fetched = res.data?.projects || [];
      if (fetched.length < PAGE_SIZE) setHasMore(false);

      setProjects((prev) => (pageNum === 1 ? fetched : [...prev, ...fetched]));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProjects(1);
    setPage(1);
    setHasMore(true);
  }, []);

  // ----------------- THROTTLED SCROLL -----------------
  const handleScroll = useCallback(
    throttle(() => {
      if (!containerRef.current || loadingMore || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setPage((prev) => {
          const nextPage = prev + 1;
          fetchProjects(nextPage);
          return nextPage;
        });
      }
    }, 500),
    [loadingMore, hasMore, query]
  );

  useEffect(() => {
    const div = containerRef.current;
    if (div) div.addEventListener("scroll", handleScroll);
    return () => div && div.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const displayProjects = query.trim() ? searchResults : projects;

  return (
    <div className={`project-container ${isDark ? "theme-dark" : "theme-light"}`}>
      <Input
        placeholder="Search projects..."
        prefix={<SearchOutlined />}
        allowClear
        value={query}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div ref={containerRef} className="cards-wrapper">
        {searchLoading ? (
          <div className="loading">
            <Spin size="large" />
          </div>
        ) : displayProjects.length > 0 ? (
          <div className="cards-grid">
            {displayProjects.map((p) => (
              <Card key={p._id} className="project-card">
                <div className="card-title">{p.title}</div>
                <div className="card-description">{p.description}</div>
                {p.techStack && (
                  <div className="card-tech">
                    {p.techStack.map((tech, i) => (
                      <span key={i} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {p.date && (
                  <div className="card-date">Created: {p.date}</div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="no-projects">
            <Empty description="No projects found" />
          </div>
        )}

        {loadingMore && (
          <div className="loading">
            <Spin />
          </div>
        )}
        {!hasMore && !query && projects.length > 0 && (
          <div className="end-message">End of project list</div>
        )}
      </div>
    </div>
  );
};

export default Home;
