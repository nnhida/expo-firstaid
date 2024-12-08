'use client';

import { useState } from 'react';
import { addPost, deletePost, editPost } from '@/api/post';
import { toast } from 'sonner';
import { PiPlus } from 'react-icons/pi';
import { CgClose } from 'react-icons/cg';
import { postProps, userProps } from '@/types/type';
import Image from 'next/image';

interface uiProps {
  postList: postProps[] | undefined;
  userList: userProps[] | undefined;
}

export default function Ui({ postList, userList }: uiProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [typeForm, setTypeForm] = useState<string>('');

  const [postID, setpostID] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [userID, setUserID] = useState<string>('');

  function openForm(e: React.MouseEvent<HTMLButtonElement>, typeForm: string, data: postProps | null) {
    e.preventDefault();
    setTypeForm(typeForm);
    if (typeForm === 'edit') {
      setpostID(data?.postID || '');
      setTitle(data?.title || '');
      setDesc(data?.desc || '');
      setImage(data?.image || '');
      setUserID(data?.userID || '');
    } else {
      setpostID('');
      setTitle('');
      setDesc('');
      setImage('');
      setUserID('');
    }

    setOpen((prevstate) => !prevstate);
  }

  async function Submit() {
    const formData = new FormData();

    if (postID) formData.append('postID', postID);
    if (title) formData.append('title', title);
    if (desc) formData.append('desc', desc);
    if (image) formData.append('image', image);
    if (userID) formData.append('userID', userID);

    if (typeForm === 'edit') {
      const result = await editPost(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
      }
    } else if (typeForm == 'add') {
      const result = await addPost(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
      }
    }
    setOpen((prevstate) => !prevstate);
  }

  async function delPost(e: React.MouseEvent<HTMLButtonElement>, postID: string) {
    e.preventDefault();
    confirm('yakin ingin menghapus data ini?');
    const result = await deletePost(postID);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.success);
    }
  }

  const nameId = (userID: string) => {
    if (userID != null && userList) {
      const tipe = userList.find((item) => item.userID === userID);

      return tipe?.email;
    }
  };

  return (
    <div>
      <section className="flex-col space-y-5 p-10 pt-40 h-screen">
        <div className=" flex justify-between">
          <p className="text-4xl font-bold">Post List</p>
          <button
            onClick={(e) => openForm(e, 'add', null)}
            className="flex items-center space-x-2 bg-green-400 p-3 rounded-md active:scale-90 transition-all"
          >
            <PiPlus className="fill-white size-5" />
            <p className="font-semibold text-white">Add Post</p>
          </button>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-blue-500">
            <tr>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Deskripsi
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Author
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {postList !== undefined &&
              postList.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.title || 'not available'}
                  </th>
                  <td className="px-6 py-4">{item.desc}</td>
                  <td className="px-6 py-4">
                    <Image
                      src={item.image}
                      alt="image user"
                      width={128}
                      height={128}
                    />
                  </td>
                  <td className="px-6 py-4">{nameId(item.userID)}</td>
                  <td className="px-6 py-4 flex space-x-5">
                    <button
                      onClick={(e) => delPost(e, item.postID)}
                      className="font-medium py-1 px-3 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => openForm(e, 'edit', item)}
                      className="font-medium py-1 px-3 bg-blue-500 text-white rounded-md"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
      <div className={`${open ? '' : 'hidden'} flex top-0 justify-center items-center bg-gray-800 bg-opacity-50 h-screen w-full z-50 fixed`}>
        <div className="flex-col space-y-5 bg-white p-5 rounded-lg">
          <button
            onClick={() => setOpen((prevstate) => !prevstate)}
            className="p-2 rounded-full bg-red-500"
          >
            <CgClose className=" stroke-white" />
          </button>
          <form
            onSubmit={Submit}
            className=""
          >
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title*
                </label>
                <input
                  type="text"
                  id="title"
                  title="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                />
              </div>
              <div>
                <label
                  htmlFor="desc"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description*
                </label>
                <input
                  type="text"
                  id="desc"
                  name="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image*
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
