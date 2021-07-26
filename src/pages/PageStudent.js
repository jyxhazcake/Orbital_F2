import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import AppShell from "../components/AppShell3rd";
import PostContent from "../components/PostContent";
import { useAuth } from "../contexts/Authcontext";
import PendingPosts from "../components/PendingPosts";
import CreatePost from "../components/CreatePost";
import { Link, Redirect } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const firestore = firebase.firestore();

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PageStudent() {
  const [showInterest, setShowInterest] = useState(true);
  const [currInterest, setCurrInterest] = useState(true);

  const clickInterest = () => {
    setShowInterest(true);
    setCurrInterest(true);
  };

  const navigation = [
    { name: "My Opportunities", click: clickInterest, current: currInterest },
  ];

  const { currentUser } = useAuth();

  const userRef = firestore.collection("Users");
  const postsRef = firestore.collection("posts");
  const [user] = useDocumentData(userRef.doc(currentUser?.uid));
  const [posts] = useCollectionData(postsRef, { idField: "id" });

  if (!currentUser) {
    return <Redirect to="/studentlogin" />;
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

      {showInterest && (
        <div>
          <div className="flex flex-wrap gap-x-10 pt-5 pl-10 items-center">
            {posts &&
              posts
                .filter((pst) => {
                  return user?.interestedPosts?.includes(pst.id);
                })
                .map((pdg) => <PostContent key={pdg.id} post={pdg} />)}
          </div>
        </div>
      )}
    </>
  );
}
