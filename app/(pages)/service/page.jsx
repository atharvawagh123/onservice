'use client';
import { useAuthContext } from '../../context/ContextProvider';
import { useCallback, useEffect, useRef, useState } from 'react';
import Service from '../../component/service';
import Loading from './Loading';
import { toast } from 'react-toastify';
import { findusersearchservice } from '../../customhook/service';
import SearchBar from '../../component/SearchBar';

export default function ServicePage() {
  const { getservice } = useAuthContext();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentpage, setcurrentpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchservice, setsearchservice] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

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
      toast.warning('Search contains special characters.');
      return;
    }

    if (value.length > 20) {
      toast.error('Search is too long!');
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
      20
    );

    const data = results.data || [];
    filterCache.current[filterKey] = data; // cache

    setServices(data);
    setLoading(false);
  };

  const clearFilters = () => {
    setFilterCategory('');
    setFilterPrice('');
    setIsSearching(false);
    fetchServices();
  };

  return (
    <main className="min-h-screen bg-sky-50 px-4 py-10 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Header */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-bold text-sky-600 sm:text-4xl md:text-5xl dark:text-sky-400">
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
            className="rounded border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
          >
            <option value="">Category (All)</option>
            <option value="web">Web Development</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="cloud">Cloud</option>
            <option value="video">Video Editing</option>
          </select>

          <select
            className="rounded border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
            value={filterPrice}
            onChange={e => setFilterPrice(e.target.value)}
          >
            <option value="">Price (Any)</option>
            <option value="0-3000">Below ₹3000</option>
            <option value="3000-7000">₹3000 - ₹7000</option>
            <option value="7000-15000">₹7000 - ₹15000</option>
            <option value="15000+">₹15000+</option>
          </select>

          <button
            onClick={applyFilters}
            className="rounded bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
          >
            Apply
          </button>

          <button
            onClick={clearFilters}
            className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
          >
            Clear
          </button>
        </div>
      </section>

      <div className="flex flex-col gap-6 p-4 lg:flex-row">
        {/* Form (unchanged) */}
        <div className="hidden h-[500px] rounded-lg bg-white p-3 shadow-md lg:block lg:w-1/3 dark:bg-gray-900">
          <form className="flex flex-col gap-3">
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Enter Enquiry
            </h2>

            <input
              type="text"
              placeholder="Title"
              className="w-full rounded border px-2 py-1"
            />
            <textarea
              placeholder="Description"
              rows={3}
              className="w-full rounded border px-2 py-1"
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full rounded border px-2 py-1"
            />

            <button className="w-full rounded-md bg-blue-600 py-1.5 text-white hover:bg-blue-700">
              Submit
            </button>
          </form>
        </div>

        {/* Services Grid */}
        <div className="flex-1">
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              <Loading count={6} />
            ) : services.length === 0 ? (
              <div className="col-span-full py-10 text-center text-gray-500 dark:text-gray-400">
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
            <div className="mt-5 flex w-full items-center justify-center gap-3">
              <button
                disabled={currentpage <= 1}
                onClick={() => setcurrentpage(pre => pre - 1)}
                className="rounded bg-sky-500 px-4 py-2 text-white disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={currentpage >= totalPages}
                onClick={() => setcurrentpage(pre => pre + 1)}
                className="rounded bg-sky-500 px-4 py-2 text-white disabled:opacity-50"
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
