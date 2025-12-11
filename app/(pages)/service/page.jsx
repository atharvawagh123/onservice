"use client";
import { useAuthContext } from "../../context/ContextProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import Service from "../../component/service";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { findusersearchservice } from "../../customhook/service";
import SearchBar from "../../component/SearchBar";

export default function ServicePage() {
  const { getservice } = useAuthContext();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentpage, setcurrentpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchservice, setsearchservice] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  const [isSearching, setIsSearching] = useState(false);
  const searchCache = useRef({});
  const filterCache = useRef({});

  // Fetch only when not searching
  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getservice(currentpage, 6);
      setServices(response.data || []);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentpage, getservice]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // ------------------ SEARCH ------------------
  const findservice = async () => {
    const value = searchservice.trim();

    if (!value) {
      // Empty search → exit mode
      setIsSearching(false);
      fetchServices();
      return;
    }

    setIsSearching(true);

    const specialCharPattern = /[^a-zA-Z0-9\s]/;
    if (specialCharPattern.test(value)) {
      toast.warning("Search contains special characters.");
      return;
    }

    if (value.length > 20) {
      toast.error("Search is too long!");
      return;
    }

    // Check Cache
    if (searchCache.current[value]) {
      setServices(searchCache.current[value]);
      return;
    }

    // API call
    setLoading(true);
    const results = await findusersearchservice(value, 1, 6);
    const data = results.data || [];

    searchCache.current[value] = data; // store in cache
    setServices(data);
    setLoading(false);
  };

  // ------------------ FILTER ------------------
  const applyFilters = async () => {
    const filterKey = `${filterCategory}-${filterPrice}`;

    // If no filters applied → show normal list
    if (!filterCategory && !filterPrice) {
      setIsSearching(false);
      fetchServices();
      return;
    }

    setIsSearching(true);

    // Check Cache
    if (filterCache.current[filterKey]) {
      setServices(filterCache.current[filterKey]);
      return;
    }

    // Use your search service for filter
    setLoading(true);

    const results = await findusersearchservice(
      `${filterCategory} ${filterPrice}`,
      1,
      20,
    );

    const data = results.data || [];
    filterCache.current[filterKey] = data; // cache

    setServices(data);
    setLoading(false);
  };

  const clearFilters = () => {
    setFilterCategory("");
    setFilterPrice("");
    setIsSearching(false);
    fetchServices();
  };

  return (
    <main className="min-h-screen bg-sky-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 px-4 py-10">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-600 dark:text-sky-400 mb-4">
          Our Services
        </h1>

        <SearchBar
          value={searchservice}
          onChange={setsearchservice}
          onSearch={findservice}
          fetchservice={fetchServices}
          debounceTime={700}
        />

        {/* ------------- FILTER UI ------------- */}
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <select
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-3 py-2 rounded"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Category (All)</option>
            <option value="web">Web Development</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="cloud">Cloud</option>
            <option value="video">Video Editing</option>
          </select>

          <select
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-3 py-2 rounded"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
          >
            <option value="">Price (Any)</option>
            <option value="0-3000">Below ₹3000</option>
            <option value="3000-7000">₹3000 - ₹7000</option>
            <option value="7000-15000">₹7000 - ₹15000</option>
            <option value="15000+">₹15000+</option>
          </select>

          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded"
          >
            Apply
          </button>

          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
          >
            Clear
          </button>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-6 p-4">
        {/* Form (unchanged) */}
        <div className="hidden h-[500px] lg:block lg:w-1/3 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-md">
          <form className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Enter Enquiry
            </h2>

            <input
              type="text"
              placeholder="Title"
              className="w-full px-2 py-1 rounded border"
            />
            <textarea
              placeholder="Description"
              rows={3}
              className="w-full px-2 py-1 rounded border"
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full px-2 py-1 rounded border"
            />

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-md">
              Submit
            </button>
          </form>
        </div>

        {/* Services Grid */}
        <div className="flex-1">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {loading ? (
              <Loading count={6} />
            ) : services.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
                No services available.
              </div>
            ) : (
              services.map((service, index) => (
                <Service service={service} key={index} />
              ))
            )}
          </section>

          {/* Pagination hidden during search/filter */}
          {!isSearching && (
            <div className="flex gap-3 mt-5 w-full items-center justify-center">
              <button
                disabled={currentpage <= 1}
                onClick={() => setcurrentpage((pre) => pre - 1)}
                className="px-4 py-2 bg-sky-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={currentpage >= totalPages}
                onClick={() => setcurrentpage((pre) => pre + 1)}
                className="px-4 py-2 bg-sky-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
