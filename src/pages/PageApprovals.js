import React, { useState } from "react";
import firebase from "firebase/app";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import AppShell from "../components/AppShell3rd";
import PostAdmin from "../components/PostAdmin";
import AccApproval from "../components/AccApproval";
import { useAuth } from "../contexts/Authcontext";
import { Redirect } from "react-router";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PageApprovals() {
  const [showPost, setShowPost] = useState(true);
  const [showFlag, setShowFlag] = useState(false);
  const [showAcc, setShowAcc] = useState(false);
  const [currPost, setCurrPost] = useState(true);
  const [currFlag, setCurrFlag] = useState(false);
  const [currAcc, setCurrAcc] = useState(false);

  const clickPost = () => {
    setShowPost(true);
    setShowFlag(false);
    setShowAcc(false);

    setCurrPost(true);
    setCurrFlag(false);
    setCurrAcc(false);
  };
  const clickFlag = () => {
    setShowPost(false);
    setShowFlag(true);
    setShowAcc(false);

    setCurrPost(false);
    setCurrFlag(true);
    setCurrAcc(false);
  };
  const clickAcc = () => {
    setShowPost(false);
    setShowFlag(false);
    setShowAcc(true);

    setCurrPost(false);
    setCurrFlag(false);
    setCurrAcc(true);
  };

  const navigation = [
    { name: "Post Requests", click: clickPost, current: currPost },
    { name: "Account Requests", click: clickAcc, current: currAcc },
    { name: "Flag Requests", click: clickFlag, current: currFlag },
  ];

  const firestore = firebase.firestore();
  const { currentUser } = useAuth();
  const userRef = firestore.collection("Users").doc(currentUser?.uid);

  const [user] = useDocumentData(userRef);
  const [admin] = useCollectionData(firestore.collection("AdminApproval"), {
    idField: "id",
  });
  const [accreq] = useCollectionData(firestore.collection("AccountRequest"), {
    idField: "id",
  });

  if (user?.Class !== "admin") {
    <Redirect to="/unauthorized" />;
  }

  return (
    <>
      <AppShell />
      <Disclosure as="nav" className="bg-gray-900 shadow-md">
        {({ open }) => (
          <>
            <div className=" mx-auto px-2 sm:px-4 lg:px-4">
              <div className="relative flex items-center justify-between h-10">
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
                      {navigation.map((item) => (
                        <button
                          key={item.name}
                          onClick={item.click}
                          className={classNames(
                            item.current
                              ? "text-white"
                              : "text-gray-500 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "text-white"
                        : "text-gray-300 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {showPost &&
        admin &&
        admin.map((adm) => <PostAdmin key={adm.id} post={adm} />)}

      {showAcc &&
        accreq &&
        accreq.map((req) => <AccApproval key={req.id} post={req} />)}
      {showFlag && <div className="p-6 text-l font-bold">Flag Requests:</div>}
    </>
  );
}
