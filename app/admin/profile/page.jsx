'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MdOutlineDriveFileRenameOutline,
  MdEmail,
  MdPerson,
  MdCake,
  MdImage,
} from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { MdClose } from 'react-icons/md';
import { updateprofile } from '../../customhook/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { setinfo } from '../../store/Adminslice';
import { FaCloudUploadAlt } from 'react-icons/fa'; // upload icon
import { ImSpinner2 } from 'react-icons/im'; // spinner icon
import { useAuthContext } from '../../context/ContextProvider';
const Adminprofile = () => {
  const admin = useSelector(state => state.Admin);
  const { MAX_SIZE } = useAuthContext();
  const dispatch = useDispatch();
  const [editmode, seteditmode] = useState(false);
  const [file, setfile] = useState(null);
  const [userDetail, setuserDetail] = useState({
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    age: '',
  });

  useEffect(() => {
    const setdata = () => {
      setuserDetail({
        id: admin.id,
        first_name: admin.first_name,
        last_name: admin.last_name,
        username: admin.username,
        email: admin.email,
        age: admin.age,
      });
    };
    setdata();
  }, [admin]);

  const onChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
    setuserDetail(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onfileChange = e => {
    const selectedfile = e.target.files[0];
    if (selectedfile.size > MAX_SIZE) {
      alert('Image must be less than 300 KB');
      return;
    }
    setfile(selectedfile);
  };

  const submituseMutation = useMutation({
    mutationFn: async formdata => {
      const response = await updateprofile(formdata);
      console.log('update mutation admin profile', response);
      return response;
    },
    onSuccess: response => {
      dispatch(setinfo(response.user));
      toast.success(response.message || 'update sucessfully');
      seteditmode(prev => !prev);
    },
    onError: error => {
      toast.error(error?.response?.data?.message || 'Profile update failed');
    },
  });
  const handleSubmit = e => {
    e.preventDefault();
    seteditmode(prev => !prev);
    console.log('Form Data:', userDetail);
    console.log('Image File:', file);
    const formdata = new FormData();
    formdata.append('first_name', userDetail.first_name);
    formdata.append('last_name', userDetail.last_name);
    formdata.append('username', userDetail.username);
    formdata.append('email', userDetail.email);
    formdata.append('age', userDetail.age);

    if (file) {
      formdata.append('file', file);
    }
    submituseMutation.mutate(formdata);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
        <h1 className="font-serif text-3xl italic">Admin Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">Admin of OnService</p>
      </div>

      {/* Main Card */}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT: Image Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed bg-gray-100 dark:border-gray-600 dark:bg-gray-900">
              {/* Image or placeholder */}
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : admin?.imageurl ? (
                <img
                  src={admin.imageurl}
                  alt="preview"
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <span className="text-sm text-gray-400">Profile Image</span>
              )}

              {/* Loading overlay */}
              {submituseMutation.isPending && (
                <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center rounded-lg bg-black">
                  <ImSpinner2 className="animate-spin text-2xl text-white" />
                </div>
              )}
            </div>

            <label
              className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${editmode ? 'bg-blue-100 text-blue-800' : 'cursor-not-allowed bg-gray-300 text-gray-600'}`}
            >
              {submituseMutation.isPending ? (
                <>
                  <ImSpinner2 className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <FaCloudUploadAlt />
                  Upload Image
                </>
              )}

              <input
                type="file"
                className="hidden"
                disabled={!editmode || submituseMutation.isPending} // disable while uploading
                onChange={onfileChange}
              />
            </label>
          </div>

          {/* RIGHT: User Detail Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Username */}
              <div
                className={`flex items-center gap-3 rounded-lg bg-gray-100 p-3 dark:bg-gray-900 ${!editmode && 'opacity-70'}`}
              >
                <MdOutlineDriveFileRenameOutline />
                <input
                  type="text"
                  name="username"
                  value={userDetail.username ?? ''}
                  onChange={onChange}
                  disabled={!editmode}
                  placeholder="Username"
                  className="w-full bg-transparent outline-none"
                />
              </div>

              {/* Email */}
              <div
                className={`flex items-center gap-3 rounded-lg bg-gray-100 p-3 dark:bg-gray-900 ${!editmode && 'opacity-70'}`}
              >
                <MdEmail />
                <input
                  type="email"
                  name="email"
                  value={userDetail.email ?? ''}
                  onChange={onChange}
                  disabled={!editmode}
                  placeholder="Email"
                  className="w-full bg-transparent outline-none"
                />
              </div>

              {/* First Name */}
              <div
                className={`flex items-center gap-3 rounded-lg bg-gray-100 p-3 dark:bg-gray-900 ${!editmode && 'opacity-70'}`}
              >
                <MdPerson />
                <input
                  type="text"
                  name="first_name"
                  value={userDetail.first_name ?? ''}
                  onChange={onChange}
                  disabled={!editmode}
                  placeholder="First Name"
                  className="w-full bg-transparent outline-none"
                />
              </div>

              {/* Last Name */}
              <div
                className={`flex items-center gap-3 rounded-lg bg-gray-100 p-3 dark:bg-gray-900 ${!editmode && 'opacity-70'}`}
              >
                <MdPerson />
                <input
                  type="text"
                  name="last_name"
                  value={userDetail.last_name ?? ''}
                  onChange={onChange}
                  disabled={!editmode}
                  placeholder="Last Name"
                  className="w-full bg-transparent outline-none"
                />
              </div>

              {/* Age */}
              <div
                className={`flex items-center gap-3 rounded-lg bg-gray-100 p-3 dark:bg-gray-900 ${!editmode && 'opacity-70'}`}
              >
                <MdCake />
                <input
                  type="number"
                  name="age"
                  value={userDetail.age ?? ''}
                  onChange={onChange}
                  disabled={!editmode}
                  placeholder="Age"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => seteditmode(prev => !prev)}
                disabled={submituseMutation.isPending} // disable during upload
                className={`flex items-center gap-2 rounded-lg px-6 py-2 font-medium transition ${
                  editmode
                    ? 'bg-red-500 text-white hover:bg-red-400'
                    : 'bg-yellow-500 text-black hover:bg-yellow-400'
                } ${submituseMutation.isPending ? 'cursor-not-allowed opacity-50' : ''}`} // visual feedback
              >
                {editmode ? <MdClose /> : <CiEdit />}
                {editmode ? 'Cancel Edit' : 'Enable Update'}
              </button>

              <button
                type="submit"
                disabled={!editmode}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {submituseMutation.isPending ? (
                  <>
                    <ImSpinner2 className="animate-spin" />
                    uploading.....
                  </>
                ) : (
                  <>
                    <FaCloudUploadAlt />
                    upload
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Adminprofile;
