"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { deleteSession} from "@/lib/auth";
import { userProps } from "@/types/type";


interface headerProps {
  dataLogin: userProps | undefined | null
}

export default function Ui({ dataLogin }: headerProps) {

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`${pathname.includes("login") ? "hidden" : ""
        } fixed top-0 left-0 w-full bg-white shadow-lg flex items-center justify-between p-4 z-10`}
    >
      <a href="#" className="text-3xl font-bold text-gray-800">
        <span className="text-blue-600">D</span>octors{" "}
        <span className="text-blue-600">C</span>ares.
      </a>
      <div className={``}>
        {pathname.includes('admin') ?
          <div className="flex space-x-10">
            {[{
              title: 'Home',
              link: '/admin'
            }, {
              title: 'Account',
              link: '/admin/account'
            },
            {
              title: 'Post',
              link: '/admin/post'
            },].map(
              (item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-all"
                >
                  {item.title}
                </Link>
              )
            )}
          </div>
          :
          <div className="flex space-x-10">
            {["home", "about", "service", "doctor", "blog", "contact"].map(
              (item, index) => (
                <Link
                  key={index}
                  href={`#${item}`}
                  className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-all"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        }
      </div>
      {dataLogin ? (
        <button
          onClick={async () => {
            await deleteSession()
            router.push("/login")
          }}
          className="py-2 px-4 bg-red-500 rounded-lg active:scale-90 transition-all"
        >
          <p className="font-semibold text-white">LogOut</p>
        </button>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="py-2 px-4 bg-blue-500 rounded-lg active:scale-90 transition-all"
        >
          <p className="font-semibold text-white">Login</p>
        </button>
      )}
    </div>
  );
}
