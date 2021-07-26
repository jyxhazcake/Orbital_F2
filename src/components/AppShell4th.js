import React from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import TopRight from "./TopRight";

import { Link } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";

import firebase from "firebase/app";
import SignOut from "./SignOut";

import logo2 from "./img/CCSGP.png";
import { useAuth } from "../contexts/Authcontext";

const navigationStu = [
  { name: "Home", link: "/", current: false },
  { name: "Opportunities", link: "/opportunities", current: false },
  { name: "My Portal", link: "/studentportal", current: false },
  { name: "About", link: "/about", current: true },
];

const navigationOrg = [
  { name: "Home", link: "/", current: false },
  { name: "Opportunities", link: "/opportunities", current: false },
  { name: "My Postings", link: "/myposts", current: false },
  { name: "About", link: "/about", current: true },
];

const navigationAdm = [
  { name: "Home", link: "/", current: false },
  { name: "Opportunities", link: "/opportunities", current: false },
  { name: "Approvals", link: "/approvals", current: false },
  { name: "About", link: "/about", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AppShell4th() {
  const firestore = firebase.firestore();
  const { currentUser } = useAuth();
  const userRef = firestore.collection("Users").doc(currentUser?.uid);
  const [user, loading] = useDocumentData(userRef);

  return (
    <>
      <div className="flex justify-between">
        <Link to="/">
          <img src={logo2} className="w-60 ml-5 mt-5" alt="NUSlogo" />
        </Link>
        {currentUser ? <SignOut /> : <TopRight />}
      </div>
      <Disclosure as="nav" className="bg-yellow-600">
        {({ open }) => (
          <>
            <div className=" mx-auto px-2 sm:px-4 lg:px-4">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex sm:space-x-2 lg:space-x-6">
                      {user?.Class === "admin"
                        ? navigationAdm.map((item) => (
                            <Link to={item.link}>
                              <div
                                key={item.name}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-200 hover:text-white",
                                  "px-3 py-2 rounded-md text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </div>
                            </Link>
                          ))
                        : user?.Class === "recruiter"
                        ? navigationOrg.map((item) => (
                            <Link to={item.link}>
                              <div
                                key={item.name}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-200 hover:text-white",
                                  "px-3 py-2 rounded-md text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </div>
                            </Link>
                          ))
                        : navigationStu.map((item) => (
                            <Link to={item.link}>
                              <div
                                key={item.name}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-200 hover:text-white",
                                  "px-3 py-2 rounded-md text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </div>
                            </Link>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {user?.Class === "admin"
                  ? navigationAdm.map((item) => (
                      <Link to={item.link}>
                        <div
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:text-white",
                            "block px-3 py-2 rounded-md text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))
                  : user?.Class === "recruiter"
                  ? navigationOrg.map((item) => (
                      <Link to={item.link}>
                        <div
                          key={item.name}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:text-white",
                            "block px-3 py-2 rounded-md text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))
                  : navigationStu.map((item) => (
                      <Link to={item.link}>
                        <div
                          key={item.name}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:text-white",
                            "block px-3 py-2 rounded-md text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default AppShell4th;

/*
failed loading:
loading
  ? navigationStu.map((item) => (
      <Link to={item.link}>
        <div
          key={item.name}
          className={classNames(
            item.current
              ? "bg-gray-900 text-white"
              : "text-gray-200 hover:text-white",
            "px-3 py-2 rounded-md text-sm font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </div>
      </Link>
    ))
  : 
*/
